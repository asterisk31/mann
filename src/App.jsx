import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ViewNote from './components/ViewNote';

const router=createBrowserRouter([
  {
    path:'/',
    element:
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path: "/notes",
    element: 
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Notes/>
    </div>
  },
  {
    path: "/notes/:id",
    element:
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <ViewNote/>
    </div>
  }
])

function App() {

  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App
