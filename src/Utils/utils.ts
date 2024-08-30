import { client } from "@/Services/axios";
import { CallAPIProps } from "@/Types";

export const formatCurrency = (nominal: number): string => {
  const currency = nominal?.toLocaleString("id-Id");

  return "Rp" + currency;
};

export const callAPI = {
  get: async ({ endpoint, params }: CallAPIProps) => {
    try {
      const res = await client.get(endpoint, { params });
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  post: async ({ endpoint, data }: CallAPIProps) => {
    try {
      const res = await client.post(endpoint, data);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  delete: async ({ endpoint }: CallAPIProps) => {
    try {
      const res = await client.delete(endpoint);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  put: async ({ endpoint, data }: CallAPIProps) => {
    try {
      const res = await client.put(endpoint, data);
      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
