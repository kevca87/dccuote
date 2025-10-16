import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import NewQuoteForm from "./NewQuoteForm";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <NavigationMenu className="ml-auto flex-none">
      <NavigationMenuList className="p-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/quotes">Todas las frases</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Frase diaria</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NewQuoteForm />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
