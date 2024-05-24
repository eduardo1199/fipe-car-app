import { z } from "zod";

export const validateFormFipeCarSchema = z.object({
  brand: z.object({
    codigo: z.string(),
    nome: z.string()
  }, {
    message: 'Campo obrigatório'
  }),
  model: z.object({
    codigo: z.number(),
    nome: z.string()
  }, {
    message: 'Campo obrigatório'
  }),
  year:z.object({
    codigo: z.string(),
    nome: z.string()
  }, {
    message: 'Campo obrigatório'
  }),
})