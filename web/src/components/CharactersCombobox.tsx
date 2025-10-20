import { useEffect, useState } from "react";

import { Combobox } from "./ui/combobox";
import type { ComboboxOptions } from "./ui/combobox";
import { apiFetch, apiPost } from "@/api";

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
      setCharacters(mapToComboboxOptions(chars));
    });
  }, []);

  function handleSelect(option: ComboboxOptions) {
    setSelectedCharacter(option);
  }

  function handleAppendGroup(label: ComboboxOptions["label"]) {
    const newCharacter = {
      value: label,
      label,
    };
    characters.push(newCharacter);
    handleSelect(newCharacter);
  }

  return (
              <Combobox
                options={characters}
                placeholder="Selecciona o crea un personaje"
                selected={selectedCharacter?.value ?? ""}
                onChange={handleSelect}
                className={className}
                // onCreate={handleAppendGroup}
              />
  );
}
