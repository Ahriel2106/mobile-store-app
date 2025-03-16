import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import PhoneList from './pages/PhoneList';
import Cart from './pages/Cart';
import PhoneDetails from './pages/PhoneDetails'; // Importa el componente de detalle del teléfono

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <PhoneList />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
  {
    path: "/details/:id", // Ruta dinámica para los detalles del teléfono
    element: (
      <>
        <Navbar />
        <PhoneDetails /> {/* Componente de detalle del teléfono */}
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
