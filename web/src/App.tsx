import { Routes, Route, Link } from 'react-router-dom'
import QuotesGrid from './views/QuotesGrid'
import DailyQuote from './views/DailyQuote'
import NavBar from './components/NavBar'
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <div className="h-svh flex flex-col">
      <Toaster position="top-center"/>
      <NavBar />
      <Routes>
        <Route path="/" element={<DailyQuote />} />
        <Route path="/quotes" element={<QuotesGrid />} />
      </Routes>
    </div>
  )
}