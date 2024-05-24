'use server'

import { Brand } from "context/fipe-car-context";
import { api } from "lib/axios";

export async function getBrands() {
    const response = await api.get<Brand[]>('/carros/marcas')

    return response.data  
}