import { createContext } from 'react'

type CartItem = {
  id: number
  quantity: number
}

type StoreContextType = {
  cartItems: CartItem[]
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
}

export const StoreContext = createContext<StoreContextType>({
  cartItems: [],
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  removeFromCart: () => {},
})

export default StoreContext
