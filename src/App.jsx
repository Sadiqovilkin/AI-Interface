import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routers/Router';
const routes = createBrowserRouter(ROUTES);
const App = () => {
  return (
    <div className="app-root">
     <RouterProvider router={routes} />
    </div>
  )
}

export default App