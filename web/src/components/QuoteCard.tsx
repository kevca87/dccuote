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

type QuoteCardProps = {
  quote: Quote;
  deleteMode: boolean;
};

export default function QuoteCard({
  quote,
  deleteMode = false,
}: QuoteCardProps) {
  let { id, quote: quoteText, character, source, tags } = quote;
  console.log("Rendering QuoteCard for quote ID:", quote.id);
  const navigate = useNavigate();
  function goToQuoteView(quoteId: string = "daily") {
    // Navigate to the quote view page
    navigate(`/quotes/${quoteId}`);
  }
  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    // Handle delete click
    console.log("Delete clicked for quote ID:", id);
  }
  return (
    <Card
      className="w-96 gap-2 cursor-pointer"
      onClick={() => goToQuoteView(id)}
    >
      <CardHeader className="m-1">
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
          <Button variant="destructive" className="mx-6 mb-0" onClick={handleDeleteClick}>
            <Trash />
          </Button>
        ) : null}
    </Card>
  );
}
