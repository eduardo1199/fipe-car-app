'use server'

import { api } from "lib/axios";

interface GetYearsCarsParams {
  brand: string
  model: number
}

type GetYearsCarsResponse = {
  codigo: string
  nome: string
}[]

export async function getYearsCars({ brand, model }: GetYearsCarsParams) {
  const response = await api.get<GetYearsCarsResponse>(`/carros/marcas/${Number(brand)}/modelos/${model}/anos`)

  return response.data
}