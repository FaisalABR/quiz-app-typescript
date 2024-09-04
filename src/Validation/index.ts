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

export const AuthValidation = z.object({
  email: z
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

export const CreateTalentValidation = z.object({
  firstName: z
    .string({
      required_error: "Field firstName wajib diisi!",
    })
    .min(3, { message: "Minimal 2 karakter" }),
  lastName: z
    .string({
      required_error: "Field lastName wajib diisi!",
    })
    .min(3, { message: "Minimal 2 karakter" }),
  tanggalLahir: z.object({}),
  domisili: z
    .string({
      required_error: "Field domisili wajib diisi!",
    })
    .min(3, { message: "Minimal 5 karakter" }),
  phone: z
    .string({
      required_error: "Field phone wajib diisi!",
    })
    .min(3, { message: "Minimal 5 karakter" }),
  email: z
    .string({
      required_error: " Field Email wajib diisi",
    })
    .email({
      message: "Format input harus email",
    }),
  divisi: z.string({
    required_error: "Field divisi wajib diisi!",
  }),
  posisi: z.string({
    required_error: "Field posisi wajib diisi!",
  }),
  kontrak: z
    .number({
      required_error: "Field kontrak wajib diisi!",
    })
    .nonnegative({ message: "minimal 1 tahun atau 1 bulan" }),
  salary: z
    .number({
      required_error: "Field salaray wajib diisi!",
    })
    .min(1000000, { message: "Minimal salary Rp1,000,000" }),
  skills: z.array(
    z.string({
      required_error: "Field skills wajib diisi!",
    })
  ),
  bahasa: z.array(
    z.string({
      required_error: "Field bahasa wajib diisi!",
    })
  ),
  github: z.string({
    required_error: "Field github profile wajib diisi!",
  }),
  linkedin: z.string({
    required_error: "Field linkedin profile wajib diisi!",
  }),
  websitePortfolio: z
    .string()
    .min(6, { message: "Minimal 6 karakter" })
    .optional(),
  status: z.string({ required_error: "Field status wajib diisi!" }),
  isAvailableWFO: z.boolean().optional(),
  cv: z.string({
    required_error: "Field cv wajib diisi!",
  }),
  tentangDiri: z.string({
    required_error: "Field Tentang Diri wajib diisi!",
  }),
});
