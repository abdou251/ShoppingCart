import { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import StoreContext from '../context/StoreContext'

function Navbar() {
  const { cartItems } = useContext(StoreContext)
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <nav
      className={`bg-white text-lg shadow-lg font-semibold p-4 flex gap-4 justify-between items-center fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Hamburger Menu Button */}
      <button
        className='lg:hidden p-2'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle navigation menu'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className='hidden lg:flex w-1/4 flex justify-between ml-12'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `hover:text-blue-600 transition-colors duration-200 ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/store'
          className={({ isActive }) =>
            `hover:text-blue-600 transition-colors duration-200 ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          Store
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `hover:text-blue-600 transition-colors duration-200 ${
              isActive ? 'text-blue-600' : 'text-gray-700'
            }`
          }
        >
          About
        </NavLink>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `hover:text-blue-600 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to='/store'
            className={({ isActive }) =>
              `hover:text-blue-600 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Store
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `hover:text-blue-600 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-700'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
        </div>
      </div>

      <div className='mr-12'>
        <NavLink
          to='/cart'
          className={({ isActive }) =>
            `h-12 w-12 p-3 border rounded-full relative hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center ${
              isActive ? 'bg-gray-50' : ''
            }`
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
            fill='currentColor'
            className='text-gray-700 w-6 h-6'
          >
            <path d='M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z' />
          </svg>
          {totalQuantity > 0 && (
            <div className='w-6 h-6 bg-red-600 flex justify-center items-center absolute rounded-full text-white top-0 right-0 translate-x-4 text-sm'>
              {totalQuantity}
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
