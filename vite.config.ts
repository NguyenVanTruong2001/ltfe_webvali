import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        productList: resolve(import.meta.dirname, 'ui/productList.html'),
        productDetail: resolve(import.meta.dirname, 'ui/productDetail.html'),
        cart: resolve(import.meta.dirname, 'ui/cart.html'),
        checkout: resolve(import.meta.dirname, 'ui/checkout.html'),
        orderSuccess: resolve(import.meta.dirname, 'ui/orderSuccess.html'),
        orderHistory: resolve(import.meta.dirname, 'ui/orderHistory.html'),
        orderDetail: resolve(import.meta.dirname, 'ui/orderDetail.html'),
        orderTracking: resolve(import.meta.dirname, 'ui/orderTracking.html'),
      },
    },
  },
})
