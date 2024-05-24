import Link from 'next/link'

import { Box, Typography  } from '@mui/material'
import { Mood } from '@mui/icons-material'
 
export default function NotFound() {
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

      <Link href="/">Clique aqui</Link>
    </Box>
  )
}