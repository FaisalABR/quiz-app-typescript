export const formatCurrency = (nominal: number): string => {
  const currency = nominal?.toLocaleString("id-Id");

  return "Rp" + currency;
};
