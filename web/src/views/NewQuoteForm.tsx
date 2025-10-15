import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export default function NewQuoteForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        {
            /* 
            Quote 
            Character
            Source
            Tags
            */
        }
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva frase</DialogTitle>
            <DialogDescription>
              Añade una nueva frase a la colección. No olvides buscarla bien antes de crear una nueva.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Textarea placeholder="No soy un pesimista Tulio, solo soy un optimista bien informado." />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="character">Personaje</Label>
              <Input id="character" name="character" placeholder="Bodoque" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fuente">Fuente</Label>
              <Input id="fuente" name="fuente" placeholder="31 Minutos" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Etiquetas</Label>
              <Input id="tags" name="tags" placeholder="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
