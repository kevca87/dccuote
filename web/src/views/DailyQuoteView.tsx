export type Character = {
  id: string;
  name: string;
}

export type Tag = {
  id: string;
  name: string;
}

export type DailyQuoteProps = {
  id: string;
  quote: string;
  character: Character;
  source: string;
  tags: Tag[];
};

function DailyQuote({ quote , character, source, tags }: DailyQuoteProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-10">
      <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
        {quote}
      </h1>
      <p className="mt-2 text-center text-lg text-muted-foreground">
        {character.name}
      </p>
    </div>
  );
}

export default DailyQuote;
