import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import type { Quote } from "@/types/Quote";

import TagBubble from "./TagBubble";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

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
import { apiPost } from "@/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
// TODO: Character

import { apiDelete } from "@/api";

function DeleteConfirmationDialog({quoteId, quoteText, setIsDeleted}: { quoteId: string; quoteText: string; setIsDeleted: any }) {
  const [open, setOpen] = useState(false);
  function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    console.log("Deleting quote ID:", quoteId);
    apiDelete(`/quotes/delete/${quoteId}`).then(() => {
      setIsDeleted(true);
      setOpen(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="mx-6 mt-auto">
            <Trash />
          </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Deseas eliminar la frase?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          La frase "{quoteText}" será eliminada permanentemente.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDelete} variant="destructive">Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


type QuoteCardProps = {
  quote: Quote;
  deleteMode: boolean;
  setQuotes: any;
};

export default function QuoteCard({
  quote,
  deleteMode = false,
  setQuotes,
}: QuoteCardProps) {
  let { id, quote: quoteText, character, source, tags } = quote;
  console.log("Rendering QuoteCard for quote ID:", quote.id);
  const navigate = useNavigate();
  function goToQuoteView(quoteId: string = "daily") {
    // Navigate to the quote view page
    navigate(`/quotes/${quoteId}`);
  }
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (isDeleted) {
      setQuotes((prevQuotes: Quote[]) =>
        prevQuotes.filter((q) => q.id !== quote.id)
      );
    }
  }, [isDeleted]);
  return isDeleted ? null : (
    <Card
      className="w-96 gap-2 cursor-pointer"
    >
      <CardHeader className="m-1" onClick={() => goToQuoteView(id)}>
        <CardTitle>{quoteText}</CardTitle>
        <CardDescription className="font-medium">
          <div>- {character.name}</div>
          <div>{character.name === source ? "" : `${source}`}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="overflow-x-auto">
        {tags.map((tag) => (
          <TagBubble key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </CardFooter>
      {deleteMode ? (
          <DeleteConfirmationDialog quoteId={id} quoteText={quoteText} setIsDeleted={setIsDeleted} />
        ) : null}
    </Card>
  );
}
