import QuoteCard from "@/components/QuoteCard";
import { apiFetch } from "../api";
import { useEffect, useState } from "react";
import type { Quote } from "@/types/Quote";
import { Input } from "@/components/ui/input";
// TODO: Character

export default function QuotesGrid({
  quotes,
  setQuotes,
}: {
  quotes: Quote[] | null;
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes || []);

  useEffect(() => {
    setFilteredQuotes(
      quotes?.filter((quote) =>
        quote.quote.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [searchQuery, quotes]);

  return (
    <div>
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Buscar frases..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-auto md:w-1/3 lg:w-1/4"
      />
    </div>
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {filteredQuotes.map((quote) => (
        <QuoteCard key={quote.id} {...quote} />
      ))}
    </div>
    </div>
  );
}
