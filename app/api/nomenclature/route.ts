import { NextResponse, type NextRequest } from "next/server";

import type { ProductPayload } from "@/entities/product/model";

const TOKEN =
  "af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77";

const BASE_URL = "https://app.tablecrm.com/api/v1";

const NOMENCLATURE_URL = `${BASE_URL}/nomenclature/?token=${TOKEN}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payloads: ProductPayload[] = Array.isArray(body)
      ? body
      : [body];

    const upstreamResponse = await fetch(NOMENCLATURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloads),
      cache: "no-store",
    });

    const data = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          message: "Не удалось создать товар в tablecrm",
          detail: data,
        },
        { status: upstreamResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Внутренняя ошибка сервера при создании товара",
        detail:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

