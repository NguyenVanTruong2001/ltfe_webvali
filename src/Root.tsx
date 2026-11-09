import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from '../components/AppRoutes.tsx'
import {store} from '../store/index.ts'

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  )
}
