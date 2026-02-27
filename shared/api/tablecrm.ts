import type { ProductPayload } from "@/entities/product/model";

export type CreateNomenclatureResponse = unknown;

export async function createNomenclatureItem(
  payload: ProductPayload,
): Promise<CreateNomenclatureResponse> {
  const response = await fetch("/api/nomenclature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      message =
        (typeof data === "object" && data && "message" in data
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).message
          : JSON.stringify(data)) || message;
    } catch {
      // ignore JSON parse errors, fall back to default message
    }

    throw new Error(message);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

