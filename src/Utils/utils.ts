import { client } from "@/Services/axios";
import { CallAPIProps } from "@/Types";
import { useMediaQuery } from "react-responsive";

export const formatCurrency = (nominal: number): string => {
  const currency = nominal?.toLocaleString("id-Id");

  return "Rp" + currency;
};

const apiCall = async (
  method: "get" | "post" | "delete" | "put",
  { endpoint, ...options }: CallAPIProps
) => {
  try {
    const res = await client[method](endpoint, options);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const callAPI = {
  get: (props: CallAPIProps) => apiCall("get", props),
  delete: (props: CallAPIProps) => apiCall("delete", props),
  post: (props: CallAPIProps) => apiCall("post", props),
  put: (props: CallAPIProps) => apiCall("put", props),
};

export const useMobileScreen = () => {
  return useMediaQuery({ query: "(max-width: 767px" });
};
