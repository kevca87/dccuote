import { apiFetch } from "@/api";
import QuoteView from "./QuoteView";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Quote } from "@/types/Quote";

export default function QuoteById() {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    if (id !== "daily" && id !== "random") {
      // Fetch the quote by ID and pass it to QuoteView
      apiFetch(`/quotes/${id}`).then(setQuote);
    }
  }, []);
  return quote ? <QuoteView {...quote} /> : null;
}
