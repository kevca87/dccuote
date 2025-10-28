import { useEffect, useState } from "react";

import { Combobox } from "./ui/combobox";
import type { ComboboxOptions } from "./ui/combobox";
import { apiFetch } from "@/api";

function fetchCharacters() {
  return apiFetch("/characters");
}

function mapToComboboxOptions(characters: any[]): ComboboxOptions[] {
  return characters.map((char) => ({
    value: char.id,
    label: char.name,
  }));
}

export default function CharactersCombobox({selectedCharacter, setSelectedCharacter, className = "w-70"}: { selectedCharacter: ComboboxOptions | undefined, setSelectedCharacter: React.Dispatch<React.SetStateAction<ComboboxOptions | undefined>>, className?: string}) {

  const [characters, setCharacters] = useState<ComboboxOptions[]>([]);

  useEffect(() => {
    fetchCharacters().then((chars) => {
      setCharacters([{value: "Todos", label: "Todos"}, ...mapToComboboxOptions(chars)]);
    });
  }, []);

  function handleSelect(option: ComboboxOptions) {
    setSelectedCharacter(option);
  }

  return (
              <Combobox
                options={characters}
                placeholder="Selecciona un personaje"
                selected={selectedCharacter?.value ?? ""}
                onChange={handleSelect}
                className={className}
                // onCreate={handleAppendGroup}
              />
  );
}
