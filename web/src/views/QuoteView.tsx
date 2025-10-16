import type{ Quote } from "@/types/Quote";
function QuoteView({ quote , character, source, tags }: Quote) {
  return (
    <div className="flex flex-col items-center justify-center grow">
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
      {quote}
      </h1>
      <p className="mt-2 text-center text-lg text-muted-foreground">
      {character.name}
      </p>
    </div>
  );
}

export default QuoteView;
