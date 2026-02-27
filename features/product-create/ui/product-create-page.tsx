"use client";

import { useState } from "react";

import {
  DEFAULT_PRODUCT_FORM,
  type ProductFormValues,
  toPayload,
} from "@/entities/product/model";
import { createNomenclatureItem } from "@/shared/api/tablecrm";
import { Button } from "@/components/ui/button";
import type { ProductFormErrors } from "@/features/product-create/types";
import { prettifyText, buildSeoFromName } from "@/features/product-create/lib";
import { BasicInfoCard } from "@/features/product-create/ui/basic-info-card";
import { PricingCategoryCard } from "@/features/product-create/ui/pricing-category-card";
import { SeoCard } from "@/features/product-create/ui/seo-card";
import { LocationCard } from "@/features/product-create/ui/location-card";

export function ProductCreatePage() {
  const [form, setForm] = useState<ProductFormValues>(DEFAULT_PRODUCT_FORM);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  const marketplacePriceNumber = Number(
    form.marketplace_price.replace(",", "."),
  );

  const handleChange = (
    field: keyof ProductFormValues,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = (values: ProductFormValues): ProductFormErrors => {
    const nextErrors: ProductFormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Заполните название товара";
    }

    if (!values.code.trim()) {
      nextErrors.code = "Укажите артикул";
    }

    if (!values.marketplace_price.trim()) {
      nextErrors.marketplace_price = "Укажите цену";
    } else if (Number(values.marketplace_price.replace(",", ".")) <= 0) {
      nextErrors.marketplace_price = "Цена должна быть больше нуля";
    }

    if (!values.category.trim()) {
      nextErrors.category = "Выберите категорию";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let values = form;

    if (!values.seo_title.trim() || !values.seo_description.trim()) {
      const generated = buildSeoFromName(values.name);
      values = {
        ...values,
        ...generated,
      };
      setForm(values);
    }

    setIsSubmitting(true);
    try {
      const payload = toPayload(values);
      await createNomenclatureItem(payload);
      setSubmitSuccess("Товар успешно создан в tablecrm.");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Не удалось создать карточку товара. Попробуйте ещё раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateSeo = () => {
    if (!form.name.trim()) return;
    const generated = buildSeoFromName(form.name);
    setForm((prev) => ({
      ...prev,
      ...generated,
    }));
  };

  const handlePrettifyDescriptions = () => {
    setForm((prev) => ({
      ...prev,
      description_short: prettifyText(prev.description_short),
      description_long: prettifyText(prev.description_long),
    }));
  };

  const handleAutoFromName = () => {
    if (!form.name.trim()) return;

    const generated = buildSeoFromName(form.name);
    const normalizedCode = form.code || form.name.replace(/\s+/g, "-").toLowerCase();

    setForm((prev) => ({
      ...prev,
      code: normalizedCode,
      ...generated,
    }));
  };

  const handleGenerateSku = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array.from({ length: 3 })
      .map(
        () =>
          letters[Math.floor(Math.random() * letters.length)],
      )
      .join("");
    const randomDigits = String(
      Math.floor(10000 + Math.random() * 90000),
    );
    const sku = `${randomLetters}-${randomDigits}`;

    setForm((prev) => ({
      ...prev,
      code: sku,
    }));
    setErrors((prev) => ({
      ...prev,
      code: undefined,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            tablecrm · тестовое задание
          </p>
          <h1 className="text-xl font-semibold">
            Создание карточки товара
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAutoFromName}
          >
            Автозаполнение по названию
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateSeo}
          >
            Сгенерировать SEO
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrettifyDescriptions}
          >
            Причесать описания
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        <form
          className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <BasicInfoCard
              form={form}
              errors={errors}
              onChange={handleChange}
              onGenerateSku={handleGenerateSku}
            />

            <PricingCategoryCard
              form={form}
              errors={errors}
              marketplacePriceNumber={marketplacePriceNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-6">
            <SeoCard
              form={form}
              isOpen={isSeoOpen}
              onToggle={() => setIsSeoOpen((prev) => !prev)}
              onChange={handleChange}
            />

            <LocationCard
              form={form}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <div />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Создаём товар..."
                    : "Создать карточку товара"}
                </Button>
              </div>

              {submitError && (
                <p className="text-xs text-destructive">
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className="text-xs text-emerald-600">
                  {submitSuccess}
                </p>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

