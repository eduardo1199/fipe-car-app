'use client'

import { Box, Typography } from '@mui/material'

import { SentimentVeryDissatisfied } from '@mui/icons-material'
 
import { useRouter } from 'next/navigation'
import { ButtonNavigate } from 'components/button-navigate'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
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
        <Typography variant='h5' fontWeight="bold" color="#white">Parece que algo deu errado na sua busca</Typography>
        <SentimentVeryDissatisfied fontSize="large" color='inherit' />
      </Box>

      <ButtonNavigate onClick={reset} variant='contained'>
        <Typography>Tente novamente</Typography>
      </ButtonNavigate>

      <Typography variant='caption' color="#7B7B7B">Algum erro interno do servidor ou busca não encontrada! Tente novamente com outros valores</Typography>
    </Box>
  )
}