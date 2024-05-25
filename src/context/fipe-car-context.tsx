'use client'

import { FormEvent, ReactNode, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";
import { toast } from "react-toastify";
import { validateFormFipeCarSchema } from "schemas/validate-schema-form";

import { Brand } from "hooks/use-brands";
import { Model } from "hooks/use-models";
import { YearCar } from "hooks/use-years-cars";


interface Car {
  brand: Brand | null;
  model: Model | null;
  year: YearCar | null;
}

export interface FipeCarContext {
  handleSelectBrand: (value: Brand | null) => void;
  handleSelectYear: (value: YearCar | null) => void;
  handleSelectModel: (value: Model | null) => void;
  fipeCar: Car;
  handleSubmitSearch: (FormEvent: FormEvent) => void; 
  errorsFields: { [key: string]: string | undefined }
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
  const [errorsFields, setErrorsFields] = useState<{ [key: string]: string | undefined }>({})

  const router = useRouter()
  
  function handleSelectBrand(value: Brand | null) {
    const setValueBrand: Car = {
      brand: value,
      model: null,
      year: null
    }

    
    setErrorsFields({})
    setFipeCar(setValueBrand)
  }

  function handleSelectYear(value: YearCar | null) {
    const setValueBrand: Car = {
      ...fipeCar,
      year: value
    }

    setFipeCar(setValueBrand)
    setErrorsFields({})
  }

  function handleSelectModel(value: Model | null) {
    const setValueBrand: Car = {
      ...fipeCar,
      year: null,
      model: value
    }

    setFipeCar(setValueBrand)
    setErrorsFields({})
  }

  function handleSubmitSearch(event: FormEvent) {
    event.preventDefault()

    try {
      const { brand, model, year } = validateFormFipeCarSchema.parse(fipeCar)
  
      router.push(`/fipe-car/${brand.codigo}/${model.codigo}/${year.codigo}`)
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((valueError) => {
          const errorField = {
            [valueError.path[0]]: valueError.message  
          }
          
          setErrorsFields(prev => {
            return {
              ...prev,
              ...errorField
            }
          })
        })

        toast.error('Parece que há um campo obrigatório faltando. Preencha todos os campos para continuar a busca.')
      }
    }
  }


  return (
    <FipeCarContext.Provider 
      value={{  
        handleSelectBrand, 
        handleSelectYear, 
        handleSelectModel, 
        fipeCar,
        handleSubmitSearch,
        errorsFields,
      }}
    >
      {children}
    </FipeCarContext.Provider>
  )
}