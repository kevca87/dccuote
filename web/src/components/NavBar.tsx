import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import NewQuoteForm from "./NewQuoteForm";

export default function NavBar() {
  return (
    <NavigationMenu className="ml-auto">
      <NavigationMenuList className="p-4">
        <NavigationMenuItem>
          <NewQuoteForm />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/quotes" className="text-lg font-bold">
            Frases
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
