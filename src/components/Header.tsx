import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })
  const {pathname} = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories.drinks)
  const searchRecipes = useAppStore((state) => state.searchRecipes)

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(searchFilters).includes('')) {
      console.log('All fields are required')
      return
    }
    searchRecipes(searchFilters)
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logo"/>
          </div>
          <nav className='flex gap-4'>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
              }
            >Home
            </NavLink>

            <NavLink 
              to="/favorites"
              className={({isActive}) => 
                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
              }
            >Favorites
            </NavLink>
          </nav>
        </div>

        { isHome && (
          <form
            className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
            onSubmit={handleSubmit}
          >
            <div className='space-y-4'>
              <label
                htmlFor='ingredient'
                className='block text-white uppercase font-extrabold text-lg'
              >
                name or ingredients
              </label>
              <input
                id='ingredient'
                type='text'
                name='ingredient'
                className='p-3 w-full rounded-lg focus:outline-none'
                placeholder='Name or ingredient. E.g. Coffee, Bokda, Tequila'
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className='space-y-4'>
              <label
                htmlFor='category'
                className='block text-white uppercase font-extrabold text-lg'
              >
                Category
              </label>
              <select
                id='category'
                name='category'
                className='p-3 w-full rounded-lg focus:outline-none'
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value=''>-- Select an option --</option>
                {categories.map( category => (
                  <option 
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
             type='submit'
             value='Search for recipes'
             className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 uppercase rounded-lg'
            />
          </form>
        )}
      </div>
    </header>
  )
}
