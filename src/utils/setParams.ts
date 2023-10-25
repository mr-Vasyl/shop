interface Params {
  [key: string]: string | number | null;
}

export const setParams = (params: Params) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  }
  return searchParams;
};
