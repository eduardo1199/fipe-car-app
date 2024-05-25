import { it, vi, describe, expect, afterEach  } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CarForm } from "./car-form";
import { FipeCarContext } from "context/fipe-car-context";
import { userEvent } from '@testing-library/user-event'

const handleSubmitSearch = vi.fn().mockImplementation(e => e.preventDefault()); 

vi.mock('hooks/use-brands', () => ({
  useBrands: vi.fn().mockReturnValue({
    brands: [],
  }),
}))

vi.mock('hooks/use-models', () => ({
  useModels: vi.fn().mockReturnValue({
    models: [],
  }),
}))

vi.mock('hooks/use-years-cars', () => ({
  useYearsCars: vi.fn().mockReturnValue({
    yearsCars: [],
  }),
}))

const valuesContext: FipeCarContext = {
  handleSelectBrand: vi.fn(),
  handleSelectYear: vi.fn(),
  handleSelectModel: vi.fn(),
  fipeCar: {
    brand: null, 
    model: null, 
    year: null, 
  },
  handleSubmitSearch,
  errorsFields: {}
}

const customRender = ({ providerProps }: { providerProps: FipeCarContext }) => {
  return render(
    <FipeCarContext.Provider value={providerProps}>
      <CarForm />
    </FipeCarContext.Provider>
  )
}

describe('Unit Test CarForm', () => {
  afterEach(() => {
    cleanup();
    handleSubmitSearch.mockClear()
  });

  it("should be able visibility selects brands and models", () => {
    customRender({ providerProps: valuesContext })
  
    const inputBrand = screen.getByLabelText('Marca')
    const inputModel = screen.getByLabelText('Modelo')
  
    expect(inputBrand).toBeInTheDocument()
    expect(inputModel).toBeInTheDocument()
  });
  
  it('should be not able visibility select ', () => {
    customRender({ providerProps: valuesContext })
  
    const inputBrand = screen.queryByLabelText('Ano')
  
    expect(inputBrand).not.toBeInTheDocument()
  })
  
  it('should be able visibility select year when selected model and brand', () => {
    const fipeCar = {
      brand: {
        codigo: '1',
        nome: 'Chevrolet'
      }, 
      model: {
        codigo: 1,
        nome: 'Cruze'
      }, 
      year: null, 
    }
  
    customRender({ providerProps: { ...valuesContext, fipeCar } })
  
    const inputBrand = screen.getByLabelText('Ano')
  
    expect(inputBrand).toBeInTheDocument()
  })
  
  it('should be able disabled button search when not value brand and model', () => {
    const fipeCar = {
      brand: {
        codigo: '1',
        nome: 'Chevrolet'
      }, 
      model: {
        codigo: 1,
        nome: 'Cruze'
      }, 
      year: null, 
    }
  
    customRender({ providerProps: { ...valuesContext, fipeCar } })
  
    const buttonSubmitted = screen.getByRole('button', {
      name: 'Consultar preço'
    })
  
    expect(buttonSubmitted).toBeDisabled();
  })

  it('should be able not disabled button search when has value brand, model and year', async () => {
    const user = userEvent.setup()
    const fipeCar = {
      brand: {
        codigo: '1',
        nome: 'Chevrolet'
      }, 
      model: {
        codigo: 1,
        nome: 'Cruze'
      }, 
      year: { 
        codigo: '2022-2',
        nome: '2022'
      }, 
    }
  
    customRender({ providerProps: { ...valuesContext, fipeCar } })
  
    const buttonSubmitted = screen.getByRole('button', {
      name: 'Consultar preço'
    })

    await user.click(buttonSubmitted)
  
    expect(buttonSubmitted).not.toBeDisabled();
    expect(handleSubmitSearch).toHaveBeenCalled()
  })
})
