import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { useEffect, useState } from "react";

import { Combobox } from "./ui/combobox";
import type { ComboboxOptions } from "./ui/combobox";
import { apiFetch, apiPost } from "@/api";

const characters: ComboboxOptions[] = [
  {
    value: "Bodoque",
    label: "Bodoque",
  },
  {
    value: "Tulio Triviño",
    label: "Tulio Triviño",
  },
  {
    value: "Juanin Juan Harry",
    label: "Juanin Juan Harry",
  },
];

function fetchCharacters() {
  // return Promise.resolve(characters);
  return apiFetch("/characters");
}

function mapToComboboxOptions(characters: any[]): ComboboxOptions[] {
  return characters.map((char) => ({
    value: char.id,
    label: char.name,
  }));
}

export default function NewQuoteForm() {
  const [characters, setCharacters] = useState<ComboboxOptions[]>([]);

  const [selectedCharacter, setSelectedCharacter] = useState<ComboboxOptions>();
  const [quote, setQuote] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState("");

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // All values are in state:
    // quote, selectedCharacter, source, tags
    const plainTags = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
    const formData = { quote, character: selectedCharacter?.label, source, tags: plainTags }
    console.log(formData);
    apiPost("/quotes/add", formData)
      .then((response) => {
        console.log("Quote added successfully:", response);
        // Optionally reset the form or close the dialog here
      })
      .catch((error) => {
        console.error("Failed to add quote:", error);
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nueva frase</Button>
      </DialogTrigger>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva frase</DialogTitle>
            <DialogDescription>
              Añade una nueva frase a la colección. No olvides buscarla bien
              antes de crear una nueva.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="No soy un pesimista Tulio, solo soy un optimista bien informado."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="character">Personaje</Label>
              <Combobox
                options={characters}
                placeholder="Selecciona o crea un personaje"
                selected={selectedCharacter?.value ?? ""}
                onChange={handleSelect}
                onCreate={handleAppendGroup}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fuente">Fuente</Label>
              <Input
                id="fuente"
                name="fuente"
                placeholder="31 Minutos"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Etiquetas</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="chile, humor, tv"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
