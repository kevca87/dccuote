import QuoteCard from "@/components/QuoteCard";
import { apiFetch } from "../api";
import { useEffect, useState } from "react";
import type { Quote } from "@/types/Quote";
import { Input } from "@/components/ui/input";
import CharactersCombobox from "@/components/CharactersCombobox";
import type { ComboboxOptions } from "@/components/ui/combobox";
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
  const [selectedCharacter, setSelectedCharacter] = useState<
    ComboboxOptions | undefined
  >();

  // TODO: Add a way to undo filtering by character, select "All" or similar

  useEffect(() => {
    setFilteredQuotes(quotes || []);
  }, [quotes]);

  useEffect(() => {
    setFilteredQuotes(
      quotes?.filter((quote) =>
        quote.quote.toLowerCase().includes(searchQuery.toLowerCase()) && (!selectedCharacter || quote.character.name === selectedCharacter.label)
      ) || []
    );
  }, [searchQuery, quotes]);

  useEffect(() => {
    if (selectedCharacter) {
      setFilteredQuotes(
        quotes?.filter(
          (quote) => quote.character.name === selectedCharacter.label
        ) || []
      );
    }
  }, [selectedCharacter, quotes]);

  return (
    <div>
      <div className="flex flex-row gap-2 justify-center">
        <Input
          type="text"
          placeholder="Buscar frases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-auto md:w-1/3 lg:w-1/4"
        />
        <CharactersCombobox
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
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
