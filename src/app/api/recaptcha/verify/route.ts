import { NextRequest, NextResponse } from "next/server";

interface GoogleRecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
}

const VERIFY_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return req.ip ?? undefined;
}

export async function POST(req: NextRequest) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return NextResponse.json({ success: false, error: "recaptcha_not_configured" }, { status: 503 });
  }

  let body: { token?: string; action?: string } = {};

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_payload" }, { status: 400 });
  }

  if (!body.token) {
    return NextResponse.json({ success: false, error: "missing_token" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", body.token);

  const remoteIp = getClientIp(req);

  if (remoteIp) {
    params.append("remoteip", remoteIp);
  }

  let googleResponse: Response;

  try {
    googleResponse = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ success: false, error: "verification_unreachable" }, { status: 502 });
  }

  const result = (await googleResponse.json()) as GoogleRecaptchaVerifyResponse;

  const isActionValid = !body.action || !result.action || result.action === body.action;
  const success = Boolean(result.success && isActionValid);
  const score = typeof result.score === "number" ? result.score : null;

  const response = NextResponse.json(
    {
      success,
      score,
      errors: result["error-codes"] ?? null,
    },
    { status: success ? 200 : 400 },
  );

  if (success) {
    response.cookies.set("recaptcha_score", score?.toString() ?? "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60,
      path: "/",
    });
  }

  return response;
}
