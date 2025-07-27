import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { RouterProvider } from 'react-router'
import router from './router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppProvider } from './Providers/AppProvider'
import { LoadingComponent } from './components/loading'
// import PositionedSnackbar from './components/snackbar'

function App() {
  const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
            <div className="app">
              {/* <LoadingComponent isLoading={true} /> */}
              {/* <PositionedSnackbar /> */}
              <Header />
                <main className="main-content">
                  <RouterProvider router={router} />
                </main>
              <Footer />
            </div>
        </AppProvider>
      </QueryClientProvider>
  )
}

export default App
