'use client'

import { Box, Autocomplete, TextField, Grid, Typography } from '@mui/material'
import { StyledButton } from './car-form-style'
import { useContext } from 'react'
import { FipeCarContext } from '../context/fipe-car-context'

export function CarForm() {
  const { 
    brands, 
    models, 
    yearsCars, 
    handleSelectBrand,
    handleSelectModel,
    handleSelectYear, 
    fipeCar,
    handleSubmitSearch,
    isLoadingBrands,
    isLoadingModels,
    isLoadingYearsCars
  } = useContext(FipeCarContext)

  const isVisibilityInputYear = !!fipeCar.model && !!fipeCar.brand

  const isDisabledSubmittedButton = !fipeCar.year || !fipeCar.brand

  return (
    <Box 
      width="100%" 
      borderRadius={1} 
      bgcolor="#fff" 
      maxWidth="400px" 
      padding="2rem 3rem" 
      boxShadow="1px 1px 2px #949494"
    >
    <form onSubmit={handleSubmitSearch}>
      <Grid container item direction="column" gap={2}>
        <Grid item xs>
          <Autocomplete 
            options={brands}
            noOptionsText={'Sem opções de marcas.'}
            getOptionLabel={(option) => option.nome}
            onChange={(_, value) => handleSelectBrand(value)}
            renderInput={(params) => <TextField {...params} label="Marca" />}
            value={fipeCar.brand}
            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            loading={isLoadingBrands}
            loadingText={'Carregando marcas...'}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <Autocomplete 
            options={models}
            noOptionsText={'Selecione uma marca.'}
            getOptionLabel={(option) => option.nome}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
            onChange={(_, value) => handleSelectModel(value)}
            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            value={fipeCar.model}
            loading={isLoadingModels}
            loadingText={'Carregando modelos...'}
            fullWidth
          />
        </Grid>

        {isVisibilityInputYear && (
          <Grid item xs>
              <Autocomplete 
                options={yearsCars}
                getOptionLabel={(option) => option.codigo}
                renderInput={(params) => <TextField {...params} label="Ano" />}
                onChange={(_, value) => handleSelectYear(value)}
                isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                value={fipeCar.year}
                loading={isLoadingYearsCars}
                loadingText={'Carregando anos dos do modelo...'}
                fullWidth
              />
            </Grid>
        )}
      
        <Grid container item alignItems="center" justifyContent="center" marginTop={2}>
          <Grid item>
            <StyledButton 
              variant='contained' 
              disabled={isDisabledSubmittedButton}
              type="submit"
            >
              <Typography>Consultar preço</Typography>
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
     </form>
    </Box>
  )
}