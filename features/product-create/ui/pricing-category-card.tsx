import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFormValues } from "@/entities/product/model";
import { CATEGORY_OPTIONS, GLOBAL_CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/features/product-create/config";
import type { ProductFormErrors } from "@/features/product-create/types";

type Props = {
  form: ProductFormValues;
  errors: ProductFormErrors;
  marketplacePriceNumber: number;
  onChange: (field: keyof ProductFormValues, value: string) => void;
};

export function PricingCategoryCard({
  form,
  errors,
  marketplacePriceNumber,
  onChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Цены и категория</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="marketplace_price">
              Цена на маркетплейсе, ₽ *
            </Label>
            <Input
              id="marketplace_price"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={form.marketplace_price}
              onChange={(event) =>
                onChange(
                  "marketplace_price",
                  event.target.value,
                )
              }
              placeholder="Например, 4990"
              aria-invalid={Boolean(errors.marketplace_price)}
            />
            {errors.marketplace_price && (
              <p className="text-xs text-destructive">
                {errors.marketplace_price}
              </p>
            )}
            {Number.isFinite(marketplacePriceNumber) &&
              marketplacePriceNumber > 0 && (
                <p className="text-xs text-muted-foreground">
                  Покупатель увидит:{" "}
                  {new Intl.NumberFormat("ru-RU").format(
                    marketplacePriceNumber,
                  )}{" "}
                  ₽
                </p>
              )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="chatting_percent">
              Процент за переписку, %
            </Label>
            <Input
              id="chatting_percent"
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step="0.1"
              value={form.chatting_percent}
              onChange={(event) =>
                onChange(
                  "chatting_percent",
                  event.target.value,
                )
              }
              placeholder="Например, 4"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cashback_type">
              Тип кэшбэка
            </Label>
            <Select
              value={form.cashback_type}
              onValueChange={(value) =>
                onChange("cashback_type", value)
              }
            >
              <SelectTrigger
                id="cashback_type"
                className="w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lcard_cashback">
                  Lcard кэшбэк
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="category">Категория *</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                onChange("category", value)
              }
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="global_category_id">
              Глобальная категория
            </Label>
            <Select
              value={form.global_category_id}
              onValueChange={(value) =>
                onChange("global_category_id", value)
              }
            >
              <SelectTrigger
                id="global_category_id"
                className="w-full"
              >
                <SelectValue placeholder="Выберите глобальную категорию" />
              </SelectTrigger>
              <SelectContent>
                {GLOBAL_CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="unit">
              Единица измерения
            </Label>
            <Select
              value={form.unit}
              onValueChange={(value) =>
                onChange("unit", value)
              }
            >
              <SelectTrigger id="unit" className="w-full">
                <SelectValue placeholder="Выберите единицу" />
              </SelectTrigger>
              <SelectContent>
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

