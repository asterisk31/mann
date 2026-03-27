import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/themeSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white dark:text-gray-100 text-xl font-bold">Notes App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-white bg-opacity-20 text-white dark:text-gray-100'
                    : 'text-white dark:text-gray-100 hover:bg-white hover:bg-opacity-10 dark:hover:bg-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-white bg-opacity-20 text-white dark:text-gray-100'
                    : 'text-white dark:text-gray-100 hover:bg-white hover:bg-opacity-10 dark:hover:bg-gray-700'
                }`
              }
            >
              All Notes
            </NavLink>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-md text-white dark:text-gray-100 hover:bg-white hover:bg-opacity-10 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
