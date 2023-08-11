import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { DefaultLayout } from './layout/DefaultLayout'
import { RegisterProduct } from './pages/Products/Register'
import { RegistredInstructions } from './pages/Instructions/Registred'
import { ValidateInstructions } from './pages/Instructions/Validation'
import { HistoryInstructions } from './pages/Instructions/History'
import { RegistredProduct } from './pages/Products/Registred'
import { ValidationProduct } from './pages/Products/Validation'
import { RegisterUser } from './pages/Users/Register'
import { RegistredUser } from './pages/Users/Registred'
import { History } from './pages/History'
import { HistoryProducts } from './pages/Products/History'
import { RegisterInstructions } from './pages/Instructions/Register'
import { Login } from './pages/Login'
import { AuthComponent } from './components/AuthComponent'
import { VisualizerProduct } from './components/Visualizer'
import { CopyProducts } from './pages/Products/Copy'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="product/:idProduct" element={<VisualizerProduct />} />
      <Route path="/" element={<AuthComponent />}>
        <Route path="/products">
          <Route path="validation/:idProduct" element={<VisualizerProduct />} />
        </Route>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products">
            <Route path="register" element={<RegisterProduct />} />
            <Route path="registred" element={<RegistredProduct />} />
            <Route path="validation" element={<ValidationProduct />} />
            <Route path="history" element={<HistoryProducts />} />
            <Route path="copy/:idProduct" element={<CopyProducts />} />
          </Route>
          <Route path="/instructions">
            <Route
              path="register/:page/:idProduct"
              element={<RegisterInstructions />}
            />
            <Route path="registred" element={<RegistredInstructions />} />
            <Route path="validation" element={<ValidateInstructions />} />
            <Route path="history" element={<HistoryInstructions />} />
          </Route>
          <Route path="/history">
            <Route path="" element={<History />} />
          </Route>
          <Route path="/users">
            <Route path="register" element={<RegisterUser />} />
            <Route path="registred" element={<RegistredUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
