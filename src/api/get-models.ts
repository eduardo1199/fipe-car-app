'use server'

import { Model } from "hooks/use-models";
import { api } from "lib/axios";

interface GetModelsParams {
  brand: string
}

type GetModelResponse = {
  modelos: Model[]
}

export async function getModels({ brand }: GetModelsParams) {
  const response = await api.get<GetModelResponse>(`/carros/marcas/${brand}/modelos`)

  return response.data.modelos
}