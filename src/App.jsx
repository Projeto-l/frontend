import './App.css'
import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { Navbar } from './pages/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-6">
          <Router />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
