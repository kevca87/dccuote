import type { DailyQuoteProps } from "@/views/DailyQuoteView"
import DailyQuote from "@/views/DailyQuoteView"

function App() {
  const quote: DailyQuoteProps = {
    quote: "¿Final? No este no es el final de la jornada, la muerte solo es otro camino que todos recorren. La cortina de lluvia gris del mundo se abre y se transforma en plata y cristal, despues lo ves. Blancas costas y mas alla un pais lejano y verde, a la luz de un amanecer.",
    author: "Gandalf",
    tags: ["movies", "fantasy", "inspiration", "lotr"]
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <DailyQuote {...quote} />
    </div>
  )
}

export default App