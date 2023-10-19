export const setParams = (params) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    value !== null && value !== "" && searchParams.append(key, value);
  }
  return searchParams;
};
