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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";

import { Combobox } from "@/components/ui/combobox";
import type { ComboboxOptions } from "@/components/ui/combobox";

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
    return Promise.resolve(characters);
}


export default function NewQuoteForm() {
  const [selectedCharacter, setSelectedCharacter] = useState<ComboboxOptions>();
  const [characters, setCharacters] = useState<ComboboxOptions[]>([]);

  useEffect(() => {
    fetchCharacters().then((chars) => setCharacters(chars));
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
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
              <Textarea placeholder="No soy un pesimista Tulio, solo soy un optimista bien informado." />
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
              <Input id="fuente" name="fuente" placeholder="31 Minutos" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Etiquetas</Label>
              <Input id="tags" name="tags" placeholder="chile, humor, tv" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
