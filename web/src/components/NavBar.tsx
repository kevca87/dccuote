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
import { useState } from "react";

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
