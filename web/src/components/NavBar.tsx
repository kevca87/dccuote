import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import NewQuoteForm from "./NewQuoteForm";
import { Link } from "react-router-dom";

export default function NavBar({newQuoteSubmitResult, setNewQuoteSubmitResult}:
  { newQuoteSubmitResult: any; setNewQuoteSubmitResult: any }) {
  return (
    <NavigationMenu className="ml-auto flex-none">
      <NavigationMenuList className="p-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/quotes">Frases</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/characters">Personajes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/tags">Etiquetas</Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Frase diaria</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NewQuoteForm submitResult={newQuoteSubmitResult} setSubmitResult={setNewQuoteSubmitResult} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
