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
};

export function BasicInfoCard({
  form,
  errors,
  onChange,
  onGenerateSku,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Основная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Название товара *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(event) =>
              onChange("name", event.target.value)
            }
            placeholder="Например, Кофеварка Philips HD7767"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="code">Артикул / код товара *</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                className="flex-1"
                value={form.code}
                onChange={(event) =>
                  onChange("code", event.target.value)
                }
                placeholder="Уникальный код для учёта"
                aria-invalid={Boolean(errors.code)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onGenerateSku}
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
          <Label htmlFor="description_long">
            Полное описание
          </Label>
          <Textarea
            id="description_long"
            value={form.description_long}
            onChange={(event) =>
              onChange(
                "description_long",
                event.target.value,
              )
            }
            placeholder="Расскажите о характеристиках, сценариях использования и преимуществах"
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}

