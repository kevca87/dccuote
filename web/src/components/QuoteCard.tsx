import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { Quote } from "@/types/Quote"

export default function QuoteCard({ quote, character, source, tags }: Quote) {
  return (
    <Card className="w-96 gap-2">
      <CardHeader className="m-1">
        <CardTitle>{quote}</CardTitle>
        <CardDescription className="font-medium">- {character.name}</CardDescription>
      </CardHeader>
      <CardFooter className="overflow-x-auto">
        {tags.map((tag) => (
          <div key={tag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 overflow-ellipsis">
            {tag.name}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}