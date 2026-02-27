export function prettifyText(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const withUpper =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

  if (/[.!?]$/.test(withUpper)) {
    return withUpper;
  }

  return `${withUpper}.`;
}

export function buildSeoFromName(name: string): {
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
} {
  const base = name.trim();
  if (!base) {
    return {
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
    };
  }

  const normalized = base.replace(/\s+/g, " ");
  const keywords = Array.from(
    new Set(
      normalized
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 2),
    ),
  );

  return {
    seo_title: normalized,
    seo_description: `Купить ${normalized} по выгодной цене. Характеристики, описание и условия покупки в маркетплейсе.`,
    seo_keywords: keywords.join(", "),
  };
}

