/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import StoreContext from './context/StoreContext'
import { useLocalStorage } from './hooks/useLocalStorage'

type CartItem = {
  id: number
  quantity: number
}

function App() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )
  const cartQuantity = cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  )

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      <div className='h-screen bg-slate-50'>
        <Navbar />
        <section className='mx-16 my-4 font-semibold text-4xl pt-20'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/store' element={<Store />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
        </section>
      </div>
    </StoreContext.Provider>
  )
}

export default App
