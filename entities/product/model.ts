export type ProductType = "product";

export type CashbackType = "lcard_cashback";

export type ProductFormValues = {
  name: string;
  code: string;
  type: ProductType;
  description_short: string;
  description_long: string;
  unit: string;
  category: string;
  cashback_type: CashbackType;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  global_category_id: string;
  marketplace_price: string;
  chatting_percent: string;
  address: string;
  latitude: string;
  longitude: string;
};

export const DEFAULT_PRODUCT_FORM: ProductFormValues = {
  name: "",
  code: "",
  type: "product",
  description_short: "",
  description_long: "",
  unit: "116",
  category: "2477",
  cashback_type: "lcard_cashback",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  global_category_id: "127",
  marketplace_price: "",
  chatting_percent: "4",
  address: "",
  latitude: "",
  longitude: "",
};

export type ProductPayload = {
  name: string;
  type: ProductType;
  description_short: string;
  description_long: string;
  code: string;
  unit: number;
  category: number;
  cashback_type: CashbackType;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  global_category_id: number;
  marketplace_price: number;
  chatting_percent: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

export function parseKeywords(input: string): string[] {
  if (!input.trim()) {
    return [];
  }

  const raw = input
    .split(/[,;\n]/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (raw.length > 0) {
    return raw;
  }

  return input
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function toPayload(values: ProductFormValues): ProductPayload {
  const toNumber = (value: string): number => {
    const num = Number(value.replace(",", "."));
    return Number.isFinite(num) ? num : 0;
  };

  const toNullableNumber = (value: string): number | null => {
    if (!value.trim()) return null;
    const num = Number(value.replace(",", "."));
    return Number.isFinite(num) ? num : null;
  };

  return {
    name: values.name.trim(),
    type: values.type,
    description_short: values.description_short.trim(),
    description_long: values.description_long.trim(),
    code: values.code.trim(),
    unit: toNumber(values.unit),
    category: toNumber(values.category),
    cashback_type: values.cashback_type,
    seo_title: values.seo_title.trim(),
    seo_description: values.seo_description.trim(),
    seo_keywords: parseKeywords(values.seo_keywords),
    global_category_id: toNumber(values.global_category_id),
    marketplace_price: toNumber(values.marketplace_price),
    chatting_percent: toNumber(values.chatting_percent),
    address: values.address.trim(),
    latitude: toNullableNumber(values.latitude),
    longitude: toNullableNumber(values.longitude),
  };
}

