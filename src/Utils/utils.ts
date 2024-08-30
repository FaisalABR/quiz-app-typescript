import axios, { AxiosRequestConfig } from "axios";

export const formatCurrency = (nominal: number): string => {
  const currency = nominal?.toLocaleString("id-Id");

  return "Rp" + currency;
};

export const callAPI = async ({
  url,
  method,
  data,
  params,
}: AxiosRequestConfig) => {
  try {
    const res = await axios({
      url,
      method,
      data,
      params,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
