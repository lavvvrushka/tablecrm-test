import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { ProductFormValues } from "@/entities/product/model";

type Props = {
  form: ProductFormValues;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onGenerateSeo: () => void;
};

export function SeoCard({
  form,
  isOpen,
  onToggle,
  onChange,
  onGenerateSeo,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2">
        <CardTitle className="min-w-0">Дополнительные параметры (SEO)</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="shrink-0"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onGenerateSeo}
            className="w-full"
          >
            Сгенерировать SEO
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

