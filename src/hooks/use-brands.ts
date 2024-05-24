import { useEffect, useState } from "react";
import { getBrands } from "api/get-brands";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export type Brand  = {
  codigo: string;
  nome: string
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoadingBrands, setIsLoadingBrands] = useState(false)

  useEffect(() => {
    async function getBrandsRequest() {
      try {
        const data = await getBrands()

        setBrands(data)
        setIsLoadingBrands(false)
      } catch {
        toast.error('Error ao carregar marcas, tente novamente.')
        setIsLoadingBrands(false)
        setBrands([])
      }
    }

    getBrandsRequest()
  }, [])

  return {
    brands,
    isLoadingBrands
  }
}