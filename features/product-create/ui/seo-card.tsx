import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProductFormValues } from "@/entities/product/model";

type Props = {
  form: ProductFormValues;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: keyof ProductFormValues, value: string) => void;
};

export function SeoCard({
  form,
  isOpen,
  onToggle,
  onChange,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Дополнительные параметры (SEO)</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggle}
        >
          {isOpen ? "Свернуть" : "Развернуть"}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="seo_title">SEO заголовок</Label>
            <Input
              id="seo_title"
              value={form.seo_title}
              onChange={(event) =>
                onChange(
                  "seo_title",
                  event.target.value,
                )
              }
              placeholder="Заголовок для поисковых систем"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo_description">
              SEO описание
            </Label>
            <Textarea
              id="seo_description"
              value={form.seo_description}
              onChange={(event) =>
                onChange(
                  "seo_description",
                  event.target.value,
                )
              }
              placeholder="Короткий продающий текст для сниппета в поиске"
              rows={4}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo_keywords">
              SEO ключевые слова
            </Label>
            <Input
              id="seo_keywords"
              value={form.seo_keywords}
              onChange={(event) =>
                onChange(
                  "seo_keywords",
                  event.target.value,
                )
              }
              placeholder="Через запятую: кофеварка, кофе, Philips"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

