'use client'

import { FormEvent, ReactNode, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";
import { toast } from "react-toastify";
import { validateFormFipeCarSchema } from "schemas/validate-schema-form";

import { Brand, useBrands } from "hooks/use-brands";
import { Model, useModels } from "hooks/use-models";
import { YearCar, useYearsCars } from "hooks/use-years-cars";


interface Car {
  brand: Brand | null;
  model: Model | null;
  year: YearCar | null;
}

interface FipeCarContext {
  brands: Brand[]
  models: Model[]
  yearsCars: YearCar[]
  handleSelectBrand: (value: Brand | null) => void;
  handleSelectYear: (value: YearCar | null) => void;
  handleSelectModel: (value: Model | null) => void;
  fipeCar: Car;
  handleSubmitSearch: (FormEvent: FormEvent) => void; 
  isLoadingBrands: boolean
  isLoadingModels: boolean
  isLoadingYearsCars: boolean
}

interface FipeCardContextProviderProps {
  children: ReactNode
}

export const FipeCarContext = createContext({} as FipeCarContext)

const initialStateFipeCar: Car = {
  brand: null,
  model: null,
  year: null,
}

export function FipeCarContextProvider({ children }: FipeCardContextProviderProps) {
  const [fipeCar, setFipeCar] = useState(initialStateFipeCar)

  const router = useRouter()

  const { brands, isLoadingBrands } = useBrands()
  const { models, isLoadingModels } = useModels({
    brandCode: fipeCar.brand?.codigo ?? null,
  })
  const { yearsCars, isLoadingYearsCars } = useYearsCars({
    brandCode: fipeCar.brand?.codigo ?? null,
    modelCode: fipeCar.model?.codigo ?? null,
  })
  
  function handleSelectBrand(value: Brand | null) {
    const setValueBrand: Car = {
      brand: value,
      model: null,
      year: null
    }

    setFipeCar(setValueBrand)
  }

  function handleSelectYear(value: YearCar | null) {
    const setValueBrand: Car = {
      ...fipeCar,
      year: value
    }

    setFipeCar(setValueBrand)
  }

  function handleSelectModel(value: Model | null) {
    const setValueBrand: Car = {
      ...fipeCar,
      year: null,
      model: value
    }

    setFipeCar(setValueBrand)
  }

  function handleSubmitSearch(event: FormEvent) {
    event.preventDefault()

    try {
      const { brand, model, year } = validateFormFipeCarSchema.parse(fipeCar)
  
      router.push(`/fipe-car/${brand.codigo}/${model.codigo}/${year.codigo}`)
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error('Parece que há um campo obrigatório faltando. Preencha todos os campos para continuar a busca.')
      }
    }
  }


  return (
    <FipeCarContext.Provider 
      value={{ 
        brands, 
        models, 
        yearsCars, 
        handleSelectBrand, 
        handleSelectYear, 
        handleSelectModel, 
        fipeCar,
        handleSubmitSearch,
        isLoadingBrands,
        isLoadingModels,
        isLoadingYearsCars
      }}
    >
      {children}
    </FipeCarContext.Provider>
  )
}