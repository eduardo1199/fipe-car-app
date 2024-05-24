'use server'

import { api } from "lib/axios";

interface GetFipeCarParams {
  brandCode: string
  modelCode: string
  yearCode: string
}

type GetFipeCarResponse = {
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
}

export async function getFipeCar({ brandCode, modelCode, yearCode }: GetFipeCarParams) {
  const response = await api.get<GetFipeCarResponse>(`/carros/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`)

  return response.data
}