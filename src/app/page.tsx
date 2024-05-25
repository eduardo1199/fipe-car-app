import { Box, Typography } from '@mui/material'
import { CarForm } from 'components/car-form/car-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Fipe - search",
};

export default function FipeCarSearch() {
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"  
      bgcolor="#f2f2f2"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h4" fontWeight="bold">Tabela Fipe</Typography>
      <Typography variant="body1" fontWeight="bold">
        Consulte o valor de um veículo de forma gratuita
      </Typography>
      
      <CarForm />
      <ToastContainer />
    </Box>
  );
}

