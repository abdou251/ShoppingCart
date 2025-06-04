import React, { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import { formatCurrency } from '../utilities/formatCurrency'
import storeItems from '../data/items.json'

function Cart() {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useContext(StoreContext)

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-gray-500 text-xl'>Your cart is empty</p>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item) => {
            const storeItem = storeItems.find(
              (storeItem) => storeItem.id === item.id
            )
            return (
              <div
                key={item.id}
                className='flex items-center justify-between border-b pb-4'
              >
                <div className='flex items-center gap-4 flex-1'>
                  <img
                    src={storeItem?.imgUrl}
                    alt={storeItem?.name}
                    className='w-24 h-24 object-cover rounded-md'
                  />
                  <div>
                    <h2 className='text-xl font-semibold'>{storeItem?.name}</h2>
                    <div className='flex items-center gap-4 mt-2'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => decreaseCartQuantity(item.id)}
                          className='bg-blue-600 w-8 h-8 rounded-md text-white font-medium flex justify-center items-center hover:bg-blue-800'
                        >
                          -
                        </button>
                        <span className='text-lg'>{item.quantity}</span>
                        <button
                          onClick={() => increaseCartQuantity(item.id)}
                          className='bg-blue-600 w-8 h-8 rounded-md text-white font-medium flex justify-center items-center hover:bg-blue-800'
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-red-500 hover:text-red-700 font-medium'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-medium'>
                    {formatCurrency(item.quantity * (storeItem?.price || 0))}
                  </p>
                </div>
              </div>
            )
          })}
          <div className='mt-8 flex flex-col items-end gap-4'>
            <p className='text-2xl font-bold'>
              Total:{' '}
              {formatCurrency(
                cartItems.reduce((total, item) => {
                  const storeItem = storeItems.find(
                    (storeItem) => storeItem.id === item.id
                  )
                  return total + item.quantity * (storeItem?.price || 0)
                }, 0)
              )}
            </p>
            <button
              className='bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-800 transition-colors duration-200'
              onClick={() => alert('Checkout functionality coming soon!')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
