import { useState } from 'react';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { RouterProvider } from 'react-router'
import router from './router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { AuthProvider } from './Providers/Authen'

function App() {
  const queryClient = new QueryClient();
  const [ token, setToken ] = useState(null);
  return (
        <AuthContext.Provider value={{

        }}>
          <QueryClientProvider client={queryClient}>
            <div className="app">
              <Header />
                <main className="main-content">
                  <RouterProvider router={router} />
                </main>
              <Footer />
            </div>
          </QueryClientProvider>
        </AuthContext.Provider>
  )
}

export default App
