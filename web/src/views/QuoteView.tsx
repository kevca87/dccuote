import type { Quote } from "@/types/Quote";
import Tag from "@/components/Tag";

function QuoteView({ quote, character, source, tags }: Quote) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center grow">
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
        {quote}
      </h1>
      <p className="text-center text-xl text-muted-foreground">
        - {character.name} {source === character.name ? null : `(${source})`}
      </p>
      <div className="mt-4">
        {tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} />
        ))}
      </div>
    </div>
  );
}

export default QuoteView;
