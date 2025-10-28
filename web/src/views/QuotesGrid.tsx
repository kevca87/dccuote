import QuoteCard from "@/components/QuoteCard";
import { apiFetch } from "../api";
import { useEffect, useState } from "react";
import type { Quote } from "@/types/Quote";
import { Input } from "@/components/ui/input";
import CharactersCombobox from "@/components/CharactersCombobox";
import type { ComboboxOptions } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
      quotes?.filter(
        (quote) =>
          quote.quote.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!selectedCharacter ||
            quote.character.name === selectedCharacter.label)
      ) || []
    );
  }, [searchQuery, quotes]);

  useEffect(() => {
    if (selectedCharacter && selectedCharacter.label !== "Todos") {
      setFilteredQuotes(
        quotes?.filter(
          (quote) => quote.character.name === selectedCharacter.label
        ) || []
      );
    }
    if (selectedCharacter?.label === "Todos") {
      setFilteredQuotes(quotes || []);
    }
  }, [selectedCharacter, quotes]);
  const [deleteMode, setDeleteMode] = useState(false);
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
        <div className="flex items-center space-x-2">
          <Switch id="delete-mode" checked={deleteMode} onCheckedChange={setDeleteMode} />
          <Label htmlFor="psicokiller-mode">Psycho Killer Mode</Label>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {filteredQuotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} deleteMode={deleteMode} setQuotes={setQuotes} />
        ))}
      </div>
    </div>
  );
}
