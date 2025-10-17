import QuoteCard from "@/components/QuoteCard";
import { apiFetch } from "../api";
import { useEffect, useState } from "react";
import type { Quote } from "@/types/Quote";

export default function QuotesGrid({quotes}: {quotes: Quote[] | null}) {
    return (
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {quotes?.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </div>
    );
}