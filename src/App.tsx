import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/default'
import { GlobalStyle } from './global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ProductsContextProvider } from './context/ProductContext'
import { InstructionsContextProvider } from './context/InstructionsContext'
import { UsersContextProvider } from './context/UsersConstext'
import { HistorysContextProvider } from './context/HistoryContext'
import { AuthProvider } from './context/AuthProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <HistorysContextProvider>
          <UsersContextProvider>
            <ProductsContextProvider>
              <InstructionsContextProvider>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </InstructionsContextProvider>
            </ProductsContextProvider>
          </UsersContextProvider>
        </HistorysContextProvider>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
