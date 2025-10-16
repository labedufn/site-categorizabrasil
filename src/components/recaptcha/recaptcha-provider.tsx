"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type RecaptchaStatus = "idle" | "loading" | "verified" | "error";

interface RecaptchaContextValue {
  status: RecaptchaStatus;
  score: number | null;
  lastVerifiedAt: number | null;
  refresh: () => Promise<void>;
}

const RecaptchaContext = createContext<RecaptchaContextValue | null>(null);

interface RecaptchaProviderProps {
  siteKey?: string | null;
  action?: string;
  refreshIntervalMs?: number;
  children: React.ReactNode;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export function RecaptchaProvider({
  siteKey,
  action = "page_view",
  refreshIntervalMs = 2 * 60 * 1000,
  children,
}: RecaptchaProviderProps) {
  const [status, setStatus] = useState<RecaptchaStatus>(siteKey ? "loading" : "idle");
  const [score, setScore] = useState<number | null>(null);
  const [lastVerifiedAt, setLastVerifiedAt] = useState<number | null>(null);
  const isMountedRef = useRef(true);

  const waitForRecaptcha = useCallback(async () => {
    if (!siteKey) return;

    if (window.grecaptcha?.execute) return;

    await new Promise<void>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50;
      const interval = window.setInterval(() => {
        if (window.grecaptcha?.execute) {
          window.clearInterval(interval);
          resolve();
          return;
        }

        attempts += 1;

        if (attempts >= maxAttempts) {
          window.clearInterval(interval);
          reject(new Error("reCAPTCHA script not available"));
        }
      }, 100);
    });
  }, [siteKey]);

  const verify = useCallback(async () => {
    if (!siteKey) return;

    setStatus((current) => (current === "verified" ? current : "loading"));

    try {
      await waitForRecaptcha();

      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA global not ready");
      }

      const token = await window.grecaptcha.execute(siteKey, { action });

      const response = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token, action }),
      });

      const payload: { success?: boolean; score?: number | null } = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error("reCAPTCHA verification failed");
      }

      if (!isMountedRef.current) return;

      setStatus("verified");
      setScore(typeof payload.score === "number" ? payload.score : null);
      setLastVerifiedAt(Date.now());
    } catch (error) {
      if (!isMountedRef.current) return;

      console.error("[recaptcha] verification error", error);
      setStatus("error");
    }
  }, [action, siteKey, waitForRecaptcha]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!siteKey) {
      setStatus("idle");
      return () => {
        isMountedRef.current = false;
      };
    }

    let intervalId: number | undefined;
    let cancelled = false;

    const initialize = async () => {
      try {
        await waitForRecaptcha();

        if (cancelled) return;

        await verify();

        intervalId = window.setInterval(() => {
          verify().catch((error) => {
            console.error("[recaptcha] scheduled verification failed", error);
          });
        }, refreshIntervalMs);
      } catch (error) {
        console.error("[recaptcha] initialization failed", error);
        setStatus("error");
      }
    };

    initialize().catch((error) => {
      console.error("[recaptcha] failed to initialize", error);
      setStatus("error");
    });

    return () => {
      cancelled = true;
      isMountedRef.current = false;
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [refreshIntervalMs, siteKey, verify, waitForRecaptcha]);

  const contextValue = useMemo(
    () => ({
      status,
      score,
      lastVerifiedAt,
      refresh: verify,
    }),
    [lastVerifiedAt, score, status, verify],
  );

  return <RecaptchaContext.Provider value={contextValue}>{children}</RecaptchaContext.Provider>;
}

export function useRecaptcha() {
  const context = useContext(RecaptchaContext);

  if (!context) {
    throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  }

  return context;
}
