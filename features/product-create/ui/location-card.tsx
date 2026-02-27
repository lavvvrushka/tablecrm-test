import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProductFormValues } from "@/entities/product/model";

type Props = {
  form: ProductFormValues;
  onChange: (field: keyof ProductFormValues, value: string) => void;
};

export function LocationCard({ form, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Локация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="address">Адрес склада / магазина</Label>
          <Textarea
            id="address"
            value={form.address}
            onChange={(event) =>
              onChange(
                "address",
                event.target.value,
              )
            }
            placeholder="Например, улица Зайцева 8, Казань"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

