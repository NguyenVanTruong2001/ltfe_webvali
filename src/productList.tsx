import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import ProductListRoutes from '../components/product-list/ProductListRoutes.tsx'
import {store} from '../store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProductListRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
