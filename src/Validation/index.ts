import { z } from "zod";

export const CreateFormValidation = z.object({
  name: z
    .string({
      required_error: "Filed Name wajib diisi",
    })
    .min(3, {
      message: "Minimal 3 karakter",
    }),
  quantity: z.number().min(3, {
    message: "Minimal kuantitas 3 product",
  }),
  price: z.number().min(100000, {
    message: "Minimal harga yang dimasukkan Rp100.000,00",
  }),
});

export const AuthValidaiton = z.object({
  name: z
    .string({
      required_error: " Field Email wajib diisi",
    })
    .email({
      message: "Format input harus email",
    }),
  password: z.string({
    required_error: "Field Password wajib diisi",
  }),
});
