import { Button } from '@mui/material'

import { styled } from '@mui/material/styles';

export const ButtonNavigate = styled(Button)({
  padding: '0.5rem 2rem',
  backgroundColor: '#5822AB',
  '&:hover': {
    backgroundColor: '#6728C8 ',
    borderColor: '#6728C8',
    boxShadow: 'none',
  },
  textTransform: 'none',
  fontFamily: '"Roboto"'
});