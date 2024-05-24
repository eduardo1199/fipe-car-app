import { getFipeCar } from 'api/get-fipe-car';

import { Box, Typography } from '@mui/material'

export const metadata = {
  title: "Fipe - resultado",
};

interface FipeCarPageParams {
  params: {
    brandCode: string
    modelCode: string
    yearCode: string
  }
}

export default async function FipeCarPage({ params }: FipeCarPageParams) {
  const { brandCode, modelCode, yearCode } = params;

  const { AnoModelo, Marca, Modelo, Valor } = await getFipeCar({
    brandCode,
    modelCode,
    yearCode
  })
  
  return (
    <Box 
      width="100vw"
      height="100vh" 
      bgcolor="#C8FCF6" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={3}
    >
      <Box padding="0 2rem">
        <Typography variant="h3" fontWeight="bold">Tabela Fipe {Marca} {Modelo} {AnoModelo}</Typography>
      </Box>
      <Box padding="1rem 2rem" bgcolor="#42B48E" color="white" borderRadius={'50px'}>
        <Typography variant='h5' fontWeight="bold">{Valor}</Typography>
      </Box>

      <Typography variant='caption' color="#7B7B7B">Este é o preço de compra do veículo</Typography>
    </Box>
  );
}
