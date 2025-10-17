import { Routes, Route } from "react-router-dom";
import QuotesGrid from "./views/QuotesGrid";
import DailyQuote from "./views/DailyQuote";
import NavBar from "./components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import QuoteById from "./views/QuoteById";
import { useState, useEffect, use } from "react";
import { apiFetch } from "./api";
import type { Quote } from "@/types/Quote";

export default function App() {
  const [newQuoteSubmitResult, setNewQuoteSubmitResult] = useState<
    { success: true; data: any } | { success: false; error: string } | null
  >(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await apiFetch("/quotes");
      setQuotes(data);
    };
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (newQuoteSubmitResult && newQuoteSubmitResult.success) {
      console.log("New quote added:", newQuoteSubmitResult.data);
      setQuotes((prevQuotes) => [...prevQuotes, newQuoteSubmitResult.data]);
    }
  }, [newQuoteSubmitResult]);
  return (
    <div className="h-svh flex flex-col">
      <Toaster position="top-center" />
      <NavBar
        newQuoteSubmitResult={newQuoteSubmitResult}
        setNewQuoteSubmitResult={setNewQuoteSubmitResult}
      />
      <Routes>
        <Route path="/" element={<DailyQuote />} />
        <Route path="/quotes" element={<QuotesGrid quotes={quotes} setQuotes={setQuotes}/>} />
        <Route path="/quotes/:id" element={<QuoteById />} />
      </Routes>
    </div>
  );
}
