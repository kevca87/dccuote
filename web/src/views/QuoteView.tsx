import type { Tag, Quote } from "@/types/Quote";
import TagBubble from "@/components/TagBubble";
import { CirclePlus } from "lucide-react";
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
import { useEffect, useState } from "react";
import { apiPost } from "@/api";
import { toast } from "sonner";

function AddTagDialog({quoteId, setSubmitResult}: { quoteId: string; setSubmitResult: any }) {
  const [tags, setTags] = useState("");
  const [open, setOpen] = useState(false);
  function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    const plainTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const formData = {
      tags: plainTags,
    };
    console.log("Adding tags:", formData);
    apiPost(`/quotes/${quoteId}/tags`, formData)
      .then((response) => {
        setSubmitResult({ success: true, data: response });
        toast.success("Etiquetas añadidas exitosamente", {
          description: "Las nuevas etiquetas se han agregado a la frase.",
        });
        setOpen(false);
        setTags("");
        // TODO: Check if works with API fix 
      })
      .catch((error) => {
        setSubmitResult({
          success: false,
          error: error?.message ?? "Error desconocido",
        });
        console.error("Failed to add tags:", error);
      });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Add Tag">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevas etiquetas para la frase</DialogTitle>
          <DialogDescription>
            Por favor, ingresa la(s) etiqueta(s).
          </DialogDescription>
          <form>
            <Input
              id="tags"
              name="tags"
              placeholder="chile, humor, tv"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </form>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleAddTag}>Agregar etiquetas</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuoteView({ id, quote, character, source, tags }: Quote) {
  const [addTagSubmitResult, setAddTagSubmitResult] = useState<
    | { success: true; data: Tag[] }
    | { success: false; error: string }
    | null
  >(null);
  const [showedTags, setShowedTags] = useState<Tag[]>(tags);
  useEffect(() => {
    if (addTagSubmitResult && addTagSubmitResult.success) {
      console.log("Tags added:", addTagSubmitResult.data);
      setShowedTags([...showedTags, ...addTagSubmitResult.data]);
    }
  }, [addTagSubmitResult]);
  return (
    <div className="flex flex-col gap-4 items-center justify-center grow">
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
        {quote}
      </h1>
      <p className="text-center text-xl text-muted-foreground">
        - {character.name} {source === character.name ? null : `(${source})`}
      </p>
      <div className="mt-4">
        {showedTags.map((tag) => (
          <TagBubble key={tag.id} id={tag.id} name={tag.name} />
        ))}
        <AddTagDialog quoteId={id} setSubmitResult={setAddTagSubmitResult} />
      </div>
    </div>
  );
}

export default QuoteView;
