export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();
}

export function getUniqueValues(values: string[]) {
  const uniqueValues = new Map<string, string>();

  values.forEach((value) => {
    const normalizedValue = normalizeText(value);

    if (!uniqueValues.has(normalizedValue)) {
      uniqueValues.set(normalizedValue, value.trim());
    }
  });

  return Array.from(uniqueValues.values()).sort((firstValue, secondValue) =>
    firstValue.localeCompare(secondValue, "fr", {
      sensitivity: "base",
    }),
  );
}