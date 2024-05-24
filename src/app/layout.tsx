import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme';

import styled from './layout.module.css'
import { FipeCarContextProvider } from '../context/fipe-car-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styled.container}>
        <AppRouterCacheProvider>
          <FipeCarContextProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </FipeCarContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
