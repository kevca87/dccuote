import { Routes, Route } from 'react-router-dom'
import QuotesGrid from './views/QuotesGrid'
import DailyQuote from './views/DailyQuote'
import NavBar from './components/NavBar'
import { Toaster } from "@/components/ui/sonner"
import QuoteById from './views/QuoteById'

export default function App() {
  return (
    <div className="h-svh flex flex-col">
      <Toaster position="top-center"/>
      <NavBar />
      <Routes>
        <Route path="/" element={<DailyQuote />} />
        <Route path="/quotes" element={<QuotesGrid />} />
        <Route path="/quotes/:id" element={<QuoteById />} />
      </Routes>
    </div>
  )
}