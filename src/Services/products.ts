import { QueryFunctionContext } from "@tanstack/react-query";
import { CreateProductTypes, UpdateProductTypes } from "../Types";
import { client } from "./axios";

export const fetchProducts = async () => {
  try {
    const res = await client.get("/");

    return res.data;
  } catch (e) {
    return e;
  }
};

export const fetchProduct = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  try {
    const id = queryKey[1];
    const res = await client.get(`/${id}`);

    return res.data;
  } catch (e) {
    return e;
  }
};

export const addProduct = async (data: CreateProductTypes) => {
  try {
    const res = await client.post("/", {
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    });

    return res.data;
  } catch (e) {
    return e;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await client.delete(`/${id}`);
  } catch (e) {
    return e;
  }
};

export const updateProduct = async (data: UpdateProductTypes) => {
  try {
    const res = await client.put(`/${data.id}`, {
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    });

    return res.data;
  } catch (e) {
    return e;
  }
};
