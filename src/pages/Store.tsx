import storeItems from '../data/items.json'
import StoreItem from '../components/StoreItem'

function Store() {
  return (
    <>
      <div>Store</div>
      <div className='w-full h-full flex flex-col justify-center gap-8 items-center flex-wrap sm:flex-row'>
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
