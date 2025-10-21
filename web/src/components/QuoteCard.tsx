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

import Tag from "./Tag";

export default function QuoteCard({
  id,
  quote,
  character,
  source,
  tags,
}: Quote) {
  const navigate = useNavigate();
  function goToQuoteView(quoteId: string = "daily") {
    // Navigate to the quote view page
    navigate(`/quotes/${quoteId}`);
  }
  return (
    <Card className="w-96 gap-2 cursor-pointer" onClick={() => goToQuoteView(id)}>
      <CardHeader className="m-1">
        <CardTitle>{quote}</CardTitle>
        <CardDescription className="font-medium">
          <div>- {character.name}</div>
          <div>{character.name === source ? "" : `${source}`}</div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="overflow-x-auto">
        {tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </CardFooter>
    </Card>
  );
}
