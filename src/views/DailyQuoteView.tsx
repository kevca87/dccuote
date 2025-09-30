export type DailyQuoteProps = {
  quote: string;
  author: string;
  tags: string[];
};

function DailyQuote({ quote , author, tags }: DailyQuoteProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {quote}
      </h1>
      <p className="mt-2 text-center text-lg text-muted-foreground">
        - {author}
      </p>
    </div>
  );
}

export default DailyQuote;
