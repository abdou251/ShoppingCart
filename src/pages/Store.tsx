import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'

function Store() {
  return (
    <>
      <div className='text-gray-900 dark:text-white'>Store</div>
      <div className='w-full h-full flex flex-col justify-center gap-6 items-center flex-wrap sm:flex-row'>
        {storeItems.map((item) => (
          <div key={item.id}>
            <StoreItem {...item} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Store
