'use client'

import Link from 'next/link'

import { Box, Typography  } from '@mui/material'
import { Mood } from '@mui/icons-material'
import { ButtonNavigate } from 'components/button-navigate'
import { useRouter } from 'next/navigation'
 
export default function NotFound() {
  const router = useRouter()

  function reset() {
    router.push('/')
  }

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
      <Box padding="1rem 2rem" bgcolor="#42B48E" color="white" borderRadius={'50px'} display="flex" gap={2}>
        <Typography variant='h5' fontWeight="bold" color="#white">Opa! Essa rota não existe, vamos levá-lo para rota correta!</Typography>
        <Mood fontSize="large" color='inherit' />
      </Box>

   
      <ButtonNavigate onClick={reset} variant="contained">
        <Typography>Clique Aqui</Typography>
      </ButtonNavigate>
    </Box>
  )
}