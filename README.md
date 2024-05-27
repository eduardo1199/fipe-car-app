# Fipe Car App

## About

Projeto  `fipe car app` é voltado para pesquisa da valor fipe de veículos pesquisados em um dashboard. Basta selecionar a marca do carro, modelo e ano e clicar em consultar, para o obter o valor fipe do carro buscado.

## Install dependencies and exec app

Necessário node version.

<aside>
💡 node version v20.9.0

</aside>

Exec:

<aside>
💡 npm install && npm run dev

</aside>

## Pages

O sistema possui duas páginas, uma para formulário que se encontra em:

`src/app/pages.tsx`

E uma página parametrizada utilizando nextjs params.

`src/app/fipe-car/[brandCode]/[modelCode]/[yearCode]`

O sistema possui duas páginas auxiliares, caso o usuário digite uma rota que não existe:

`src/not-found.tsx`

Caso a busca do carro não foi feita corretamente:

`src/fipe-car/error.tsx`

## Components

### Car form

componente car form contém 3 autocompletes e um botão de busca, utilizando os componentes do material designer do MaterialUI v5

### Button retry error

Componente estilizado para uso de nova tentativa de busca

## Api

### get-brands

request para busca das marcas

```
'use server'

import { Brand } from "hooks/use-brands";

import { api } from "lib/axios";

export async function getBrands() {
    const response = await api.get<Brand[]>('/carros/marcas')

    return response.data  
}
```

### get-fipe-car

request para busca das informações do carro, como valor fipe, nome, marca, modelo, etc.

```
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
```

### get-models

request para busca dos modelos de acordo com a marca selecionada

```
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
```

### get-years-cars

request para busca dos anos dos carros disponíves de acordo com modelo e marca

```
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
```

## Hooks

### use-brands

use-brands é um hook que utiliza o request get-brands para armazenar os valores das marcas retornados pela API, retornando as marcas e o estado de loading de carregamento.

```
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
```

### use-models

use-models é um hook que utiliza o request get-models para armazenar os valores dos modelos de acordo com a marca, retornando os modelos e o estado de loading de carregamento

```
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
  }
}
```

### use-years-cars

o hook use-years-cars utiliza o request get-years-cars para buscar os valores dos anos disponíveis de acordo com modelo e marca do veículo, retornando os anos dos veículos e o estado de loading.

```
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
    isLoadingYearsCars
  }
}
```

## Context

O contexto criado usando useContext do React, chamado de FipeCarContext, agrega os valores selecionados pelo usuário, como marca, modelo e ano. Inicialmente os valores são nullos.

```
const initialStateFipeCar: Car = {
  brand: null,
  model: null,
  year: null,
}
```

O contexto possui 3 funções para modificar o valor selecionado pelo usuário e salvando no estado.

```
 handleSelectBrand: (value: Brand | null) => void;
 handleSelectYear: (value: YearCar | null) => void;
 handleSelectModel: (value: Model | null) => void;
```

O contexto apresenta mais uma função de submit do formulário, validando os dados passados pelo usuário. O schema de validação foi feito usando a biblioteca zod.

```
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
```

## Unit Test

Foi feito testes unitários em dois arquivos unsando Vitest, na página principal verificando os texto do designer:

`src/app/page.test.tsx`

E mais um teste para o formulário de cadastro do usuário, que se encontra em:

`src/components/car-form/car-fom.spec.tsx`

Validando os cenários possíveis da aplicação e uso durante o cadastro.

Para verificar os testes unitários, execute:

<aside>
💡 npm run test:unit

</aside>

## e2e Test

Foi feito apenas um único teste de integração, e2e, que faz a cobertura de toda aplicação, verificando desde o cadastro até a página de consulta. O teste foi desenvolvido em Cypress.

Para iniciar o teste cypress, execute:

<aside>
💡 npm run test:e2e

</aside>

## Environment variable

Crie um arquivo `.env.local` , seguindo exemplo do arquivo .env.exempla, adicione o valor da URL base api.

## Packages

```
"dependencies": {
    "@emotion/cache": "^11.11.0",
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/icons-material": "^5.15.18",
    "@mui/material-nextjs": "^5.15.11",
    "axios": "^1.7.2",
    "next": "latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-toastify": "^10.0.5",
    "server-only": "^0.0.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.5",
    "@testing-library/react": "14.1.2",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "20.10.4",
    "@types/react": "18.2.45",
    "@vitejs/plugin-react": "^4.2.1",
    "cypress": "^13.10.0",
    "jsdom": "^23.0.1",
    "typescript": "5.3.3",
    "vite-tsconfig-paths": "^4.3.2",
    "vitest": "1.0.4"
  }
```