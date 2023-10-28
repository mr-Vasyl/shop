export const setParams = (params: Record<string, string | number | null>) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  }
  return searchParams;
};
