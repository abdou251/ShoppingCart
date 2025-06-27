/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext, useState } from 'react'
import { formatCurrency } from '../utilities/formatCurrency'
import StoreContext from '../context/StoreContext'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const { cartItems, increaseCartQuantity, removeFromCart } =
    useContext(StoreContext)
  const quantity = cartItems.find((item) => item.id === id)?.quantity || 0
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (quantity === 0) {
      setIsAdded(true)
      increaseCartQuantity(id)
      setTimeout(() => {
        setIsAdded(false)
      }, 1000)
    } else {
      removeFromCart(id)
    }
  }

  return (
    <>
      <div
        key={id}
        className='flex flex-col items-center border dark:border-gray-700 my-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'
      >
        <img
          className='object-cover h-80 mb-5 w-80 rounded-t-lg'
          src={imgUrl}
          alt='product Image'
        />
        <div className='text-3xl w-full flex justify-between px-2'>
          <span className='font-medium text-gray-900 dark:text-white'>
            {name}
          </span>
          <span className='font-extralight text-gray-700 dark:text-gray-300'>
            {formatCurrency(price)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-2/3 h-10 rounded-md text-white text-2xl font-normal flex justify-center items-center mb-10 mt-10 transition-colors duration-300 ${
            isAdded
              ? 'bg-green-600'
              : quantity > 0
              ? 'bg-red-600 hover:bg-red-800'
              : 'bg-blue-600 hover:bg-blue-800'
          }`}
        >
          {isAdded ? 'Added!' : quantity > 0 ? 'Remove' : '+Add to Cart'}
        </button>
      </div>
    </>
  )
}

export default StoreItem
