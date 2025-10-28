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
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { apiFetch, apiPost } from "@/api";
import { AlertCircleIcon } from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function fetchCharacters() {
  return apiFetch("/characters");
}

function mapToComboboxOptions(characters: any[]): ComboboxOptions[] {
  return characters.map((char) => ({
    value: char.id,
    label: char.name,
  }));
}

export default function NewQuoteForm(
  {submitResult, setSubmitResult}: { submitResult: any; setSubmitResult: any }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState<ComboboxOptions[]>([]);

  const [quote, setQuote] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<ComboboxOptions>();
  const [source, setSource] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetchCharacters().then((chars) => {
      setCharacters(mapToComboboxOptions(chars));
    });
  }, []);

  useEffect(() => {
    if (open) {
      setSubmitResult(null);
      resetFields();
    }
  }, [open]);

  function resetFields() {
    setQuote("");
    setSelectedCharacter(undefined);
    setSource("");
    setTags("");
  }

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
    setSubmitResult(null);
    const plainTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const formData = {
      quote,
      character: selectedCharacter?.label,
      source,
      tags: plainTags,
    };
    apiPost("/quotes/add", formData)
      .then((response) => {
        setSubmitResult({ success: true, data: response });
        toast.success("Frase añadida exitosamente", {
          description: "¿Deseas ver la nueva frase?",
          action: {
            label: "Ver",
            onClick: () => {
              navigate(`/quotes/${response.id}`);
            },
          },
        });
        setOpen(false);
        resetFields();
      })
      .catch((error) => {
        setSubmitResult({
          success: false,
          error: error?.message ?? "Error desconocido",
        });
        console.error("Failed to add quote:", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" id="new-quote" name="new-quote">Nueva frase</Button>
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
              <Label htmlFor="quote">Frase</Label>
              <Textarea
                id="quote"
                name="quote"
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
            {submitResult?.success === false && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error al añadir la frase.</AlertTitle>
                <AlertDescription>
                  <p>{submitResult.error}.</p>
                </AlertDescription>
              </Alert>
            )}
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
