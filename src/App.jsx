import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { RouterProvider } from 'react-router'
import router from './router'
import { AuthProvider } from './Providers/Authen'

function App() {
  return (
    <div className="app">
      <Header />
      <AuthProvider>
        <main className="main-content">
          <RouterProvider router={router} />
        </main>
      </AuthProvider>
      <Footer />
    </div>
  )
}

export default App
