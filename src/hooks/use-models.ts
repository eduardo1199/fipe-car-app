import { useEffect, useState } from "react";
import { getBrands } from "api/get-brands";
import { getModels } from "api/get-models";
import { toast } from "react-toastify";

export type UseModelsParams  = {
  brandCode: string | null;
}

export type Model = {
  codigo: number;
  nome: string;
}

export function useModels({ brandCode }: UseModelsParams) {
  const [models, setModels] = useState<Model[]>([])
  const [isLoadingModels, setIsLoadingModels] = useState(false)
  
  useEffect(() => {
    async function getModelsRequest() {
      if(!brandCode) {
        return null
      }

      setIsLoadingModels(true)

      try {
        const data = await getModels({
          brand: brandCode
        })

        setModels(data)
        setIsLoadingModels(false)

      } catch {
        toast.error('Error ao carregar modelos, tente novamente.')
        setIsLoadingModels(false)
        setModels([])
      }
    }

    getModelsRequest()
  }, [brandCode])

  return {
    models,
    isLoadingModels,
    setModels
  }
}