import type { Quote } from "@/types/Quote";
import QuoteView from "@/views/QuoteView";
import { useEffect, useState } from "react";
import { apiFetch } from "@/api";


// TODO: Add fields validation

async function fetchDailyQuote(): Promise<Quote> {
  return apiFetch(`/quotes/daily`);
  // return mockFetchDailyQuote();
}

function DailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchDailyQuote()
      .then(setQuote)
      .catch((error) => {
        console.error("Failed to fetch daily quote:", error);
      });
  }, []);
  if (!quote) {
    return null;
  }
  return (
      <QuoteView {...quote} />
  );
}

export default DailyQuote;
