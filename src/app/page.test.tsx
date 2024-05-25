import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FipeCarSearch from "./page";
import { FipeCarContext } from "context/fipe-car-context";

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

const valuesContext = {
  handleSelectBrand: vi.fn(),
  handleSelectYear: vi.fn(),
  handleSelectModel: vi.fn(),
  fipeCar: {
    brand: null, 
    model: null, 
    year: null, 
  },
  handleSubmitSearch: vi.fn(),
  errorsFields: {}
}

describe("Unit test FipeCarSearch", () => {
  it('should be able to visibility page info', () => {
    render(<FipeCarSearch />, {
      wrapper: ({ children }) => {
        return (
          <FipeCarContext.Provider value={valuesContext}>
            {children}
          </FipeCarContext.Provider>
        )
      }
    });
  
    expect(
      screen.getByText("Tabela Fipe"),
    ).toBeDefined();
    expect(
      screen.getByText("Consulte o valor de um veículo de forma gratuita"),
    ).toBeDefined();
  })
});
