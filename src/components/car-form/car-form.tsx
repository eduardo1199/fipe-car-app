'use client'

import { Box, Autocomplete, TextField, Grid, Typography } from '@mui/material'
import { StyledButton } from './car-form-style'
import { useContext } from 'react'
import { FipeCarContext } from 'context/fipe-car-context'
import { useBrands } from 'hooks/use-brands'
import { useModels } from 'hooks/use-models'
import { useYearsCars } from 'hooks/use-years-cars'

export function CarForm() {
  const {  
    handleSelectBrand,
    handleSelectModel,
    handleSelectYear, 
    fipeCar,
    handleSubmitSearch,
    errorsFields
  } = useContext(FipeCarContext)

  const { brands, isLoadingBrands } = useBrands()
  const { models, isLoadingModels } = useModels({
    brandCode: fipeCar.brand?.codigo ?? null,
  })
  const { yearsCars, isLoadingYearsCars } = useYearsCars({
    brandCode: fipeCar.brand?.codigo ?? null,
    modelCode: fipeCar.model?.codigo ?? null,
  })

  const isEnabledInputYearsCars = !!fipeCar.model && !!fipeCar.brand
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
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="Marca" 
                error={!!errorsFields['brand']}
                helperText={errorsFields['brand']} 
              />
            }
            value={fipeCar.brand}
            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            loading={isLoadingBrands}
            loadingText={'Carregando marcas...'}
            fullWidth
            data-cy="brands"
          />
        </Grid>
        <Grid item xs>
          <Autocomplete 
            options={models}
            noOptionsText={'Selecione uma marca.'}
            getOptionLabel={(option) => option.nome}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="Modelo"
                error={!!errorsFields['model']}
                helperText={errorsFields['model']} 
              />
            }
            onChange={(_, value) => handleSelectModel(value)}
            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            value={fipeCar.model}
            loading={isLoadingModels}
            loadingText={'Carregando modelos...'}
            fullWidth
            data-cy="models"
          />
        </Grid>

        {isEnabledInputYearsCars && (
          <Grid item xs>
            <Autocomplete 
              options={yearsCars}
              getOptionLabel={(option) => option.codigo}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  label="Ano"
                  error={!!errorsFields['year']}
                  helperText={errorsFields['year']}
                />
              }
              onChange={(_, value) => handleSelectYear(value)}
              isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
              value={fipeCar.year}
              loading={isLoadingYearsCars}
              loadingText={'Carregando anos do modelo...'}
              fullWidth
              data-cy="yearsCars"
            />
          </Grid>
        )}
      
        <Grid container item alignItems="center" justifyContent="center" marginTop={2}>
          <Grid item>
            <StyledButton 
              variant='contained' 
              disabled={isDisabledSubmittedButton}
              type="submit"
              data-testid="button-handle-submit"
              data-cy="button-submit"
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