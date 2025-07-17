import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { RouterProvider } from 'react-router'
import router from './router'
// import { AuthProvider } from './Providers/Authen'

function App() {
  
  return (
      // <AuthProvider>
      <AuthContext value={{}}>
        <div className="app">
          <Header />
            <main className="main-content">
              <RouterProvider router={router} />
            </main>
          <Footer />
        </div>
      </AuthContext>
      // </AuthProvider>
  )
}

export default App
