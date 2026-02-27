import type { ProductFormValues } from "@/entities/product/model";

export type ProductFormErrors = Partial<
  Record<keyof ProductFormValues, string>
>;

