import { useEffect, useState } from "react";
import { getYearsCars } from "api/get-years-cars";
import { toast } from "react-toastify";

export type YearCar = {
  codigo: string;
  nome: string;
}

interface UseYearsCarsParams {
  brandCode: string | null;
  modelCode: number | null;
}

export function useYearsCars({ brandCode, modelCode }: UseYearsCarsParams) {
  const [yearsCars, setYearsCars] = useState<YearCar[]>([])
  const [isLoadingYearsCars, setIsLoadingYearsCars] = useState(false)

  useEffect(() => {
    async function fetchYearsCar() {
      if(!brandCode || !modelCode) {
        return null
      }

      setIsLoadingYearsCars(true)

      try {
        const data = await getYearsCars({
          brand: brandCode,
          model: modelCode
        })

        setYearsCars(data)
        setIsLoadingYearsCars(false)
      } catch {
        toast.error('Error ao carregar anos dos veículos, tente novamente.')
        setIsLoadingYearsCars(false)
        setYearsCars([])
      }
    }
      
    fetchYearsCar()
  }, [brandCode, modelCode])

  return {
    yearsCars,
    setYearsCars,
    isLoadingYearsCars
  }
}