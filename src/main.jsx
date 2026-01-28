import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"; 
import { router } from './Router/Router';
import Aos from 'aos';
import AuthProvider from './CONTEXT/AuthContext/AuthProvider';
import { Toaster } from 'react-hot-toast';


Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-auto mx-auto'>
      <AuthProvider>
       
        <Toaster 
          position="top-right" 
          reverseOrder={false} 
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
)