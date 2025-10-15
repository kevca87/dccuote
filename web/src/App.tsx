import type { DailyQuoteProps } from "@/views/DailyQuoteView";
import DailyQuote from "@/views/DailyQuoteView";
import { useEffect, useState } from "react";
import { apiFetch } from "./api";

function mockFetchDailyQuote(): Promise<any> {
//   const json = `{
//   "id": "1",
//   "quote": "Debo mantenerme sereno para no caer en la locura.",
//   "character": { "id": "1", "name": "Gato con botas" },
//   "source": "Shrek 2",
//   "tags": [
//     { "id": "1", "name": "movies" }
//   ]
// }`;
  const json = `{
  "id": "3",
  "quote": "No soy un pesimista Tulio, solo soy un optimista bien informado.",
  "character": { "id": "3", "name": "Bodoque" },
  "source": "31 Minutos",
  "tags": [
    { "id": "3", "name": "tv" },
    { "id": "4", "name": "comedy" },
    { "id": "5", "name": "kids" },
    { "id": "6", "name": "chile" }
  ]
}`;
  const quote: DailyQuoteProps = JSON.parse(json) as DailyQuoteProps;
  return Promise.resolve(quote);
}

async function fetchDailyQuote(quoteId: string): Promise<DailyQuoteProps> {
  // return apiFetch(`/quotes/${quoteId}`);
  return mockFetchDailyQuote();
}

function App() {
  const [quote, setQuote] = useState<DailyQuoteProps | null>(null);

  useEffect(() => {
    fetchDailyQuote("3")
      .then(setQuote)
      .catch((error) => {
        console.error("Failed to fetch daily quote:", error);
      });
  }, []);
  if (!quote) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <DailyQuote {...quote} />
    </div>
  );
}

export default App;
