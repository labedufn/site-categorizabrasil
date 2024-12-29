import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export async function apiGet<T>(endpoint: string): Promise<T> {
  try {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Erro ao fazer GET na URL: ${endpoint}. Mensagem original: ${error?.message || "Erro desconhecido"}`,
    );
  }
}
