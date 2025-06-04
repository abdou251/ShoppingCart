/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext } from 'react'
import { formatCurrency } from '../utilities/formatCurrency'
import StoreContext from '../context/StoreContext'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(StoreContext)
  const quantity = cartItems.find((item) => item.id === id)?.quantity || 0

  return (
    <>
      <div key={id} className='flex flex-col items-center border my-4'>
        <img
          className='object-cover h-80  mb-5 w-80'
          src={imgUrl}
          alt='product Image'
        />
        <div className='text-3xl w-full flex justify-between px-2'>
          <span className='font-medium'>{name}</span>
          <span className='font-extralight'>{formatCurrency(price)}</span>
        </div>
        {quantity === 0 ? (
          <button
            onClick={() => increaseCartQuantity(id)}
            className='bg-blue-600 w-2/3 h-10 rounded-md  text-white text-2xl font-normal flex justify-center items-center hover:bg-blue-800 mb-10 mt-10'
          >
            +Add to Cart
          </button>
        ) : (
          <div className='flex flex-col items-center gap-3  h-10 mb-10 mt-10 text-xl w-3/5'>
            <div className='flex justify-between items-center w-full'>
              <button
                onClick={() => decreaseCartQuantity(id)}
                className='bg-blue-600 w-8 h-8  rounded-md  text-white font-medium flex justify-center items-center text-start hover:bg-blue-800 '
              >
                -
              </button>
              <span className='font-normal'>{quantity} in cart</span>
              <button
                onClick={() => increaseCartQuantity(id)}
                className='bg-blue-600 w-8 h-8 rounded-md  text-white font-medium flex justify-center items-center hover:bg-blue-800 '
              >
                +
              </button>
            </div>{' '}
            <button
              onClick={() => removeFromCart(id)}
              className='bg-red-500 text-white w-20  rounded-md font-light flex justify-center  p-0.5'
            >
              remove
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default StoreItem
