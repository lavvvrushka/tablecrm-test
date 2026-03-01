import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProductFormValues } from "@/entities/product/model";
import type { ProductFormErrors } from "@/features/product-create/types";

type Props = {
  form: ProductFormValues;
  errors: ProductFormErrors;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onGenerateSku: () => void;
  onAutoFromName: () => void;
  onPrettifyDescriptions: () => void;
};

export function BasicInfoCard({
  form,
  errors,
  onChange,
  onGenerateSku,
  onAutoFromName,
  onPrettifyDescriptions,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Основная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Название товара *</Label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <Input
              id="name"
              value={form.name}
              onChange={(event) =>
                onChange("name", event.target.value)
              }
              placeholder="Например, Кофеварка Philips HD7767"
              aria-invalid={Boolean(errors.name)}
              className="min-w-0 flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onAutoFromName}
              className="w-full shrink-0 sm:w-auto"
            >
              Автозаполнить
            </Button>
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="space-y-1.5 min-w-0">
            <Label htmlFor="code">Артикул / код товара *</Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <Input
                id="code"
                className="min-w-0 flex-1"
                value={form.code}
                onChange={(event) =>
                  onChange("code", event.target.value)
                }
                placeholder="Уникальный код для учёта"
                aria-invalid={Boolean(errors.code)}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onGenerateSku}
                className="w-full shrink-0 sm:w-auto"
              >
                Сгенерировать
              </Button>
            </div>
            {errors.code && (
              <p className="text-xs text-destructive">
                {errors.code}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description_short">
            Краткое описание
          </Label>
          <Textarea
            id="description_short"
            className="min-h-[80px]"
            value={form.description_short}
            onChange={(event) =>
              onChange(
                "description_short",
                event.target.value,
              )
            }
            placeholder="2–3 предложения, которые увидит клиент в листинге"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Label htmlFor="description_long" className="sm:min-w-0">
              Полное описание
            </Label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onPrettifyDescriptions}
              className="w-full shrink-0 sm:w-auto"
            >
              Отформатировать
            </Button>
          </div>
          <Textarea
            id="description_long"
            className="min-h-[120px]"
            value={form.description_long}
            onChange={(event) =>
              onChange(
                "description_long",
                event.target.value,
              )
            }
            placeholder="Расскажите о характеристиках, сценариях использования и преимуществах"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}

