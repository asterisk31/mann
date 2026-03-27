import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ViewNote from './components/ViewNote';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const router=createBrowserRouter([
  {
    path:'/',
    element:
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path: "/notes",
    element: 
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <Notes/>
    </div>
  },
  {
    path: "/notes/:id",
    element:
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <ViewNote/>
    </div>
  }
])

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App
