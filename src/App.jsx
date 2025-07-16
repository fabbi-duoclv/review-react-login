import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { RouterProvider } from 'react-router'
import router from './router'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  )
}

export default App
