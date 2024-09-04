import dayjs from "dayjs";
import { z } from "zod";

export const CreateFormValidation = z.object({
  name: z
    .string({
      required_error: "Field Name wajib diisi",
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
  namaPertama: z
    .string({
      required_error: "Field Nama Pertama wajib diisi!",
    })
    .min(3, { message: "Minimal 2 karakter" }),
  namaTerakhir: z
    .string({
      required_error: "Field Nama Terakhir wajib diisi!",
    })
    .min(3, { message: "Minimal 2 karakter" }),
  tanggalLahir: z.preprocess(
    (arg) => dayjs(arg as Date).format("YYYY-MM-DD"),
    z.string({ required_error: "Tanggal wajib diisi" })
  ),
  domisili: z
    .string({
      required_error: "Field domisili wajib diisi!",
    })
    .min(3, { message: "Minimal 5 karakter" }),
  nomorTelepon: z
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
    .nonnegative({ message: "Minimal 1 tahun atau 1 bulan" }),
  gaji: z
    .number({
      required_error: "Field salaray wajib diisi!",
    })
    .min(1000000, { message: "Minimal Gaji Rp1,000,000" }),
  keahlian: z.array(
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
  bersediaWFO: z.boolean().optional(),
  cv: z.string({
    required_error: "Field cv wajib diisi!",
  }),
  tentangDiri: z.string({
    required_error: "Field Tentang Diri wajib diisi!",
  }),
});
