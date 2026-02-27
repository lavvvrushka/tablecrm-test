import type { Metadata } from "next";

import { ProductCreatePage } from "@/features/product-create/ui/product-create-page";

export const metadata: Metadata = {
  title: "Создание карточки товара · tablecrm",
  description:
    "Форма создания карточки товара для тестового задания tablecrm.",
};

export default function Page() {
  return <ProductCreatePage />;
}