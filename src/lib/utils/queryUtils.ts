export function objectToSearchParams(input: Record<string, string | number | undefined | null>) {
  const params = new URLSearchParams();

  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  return params.toString();
}
