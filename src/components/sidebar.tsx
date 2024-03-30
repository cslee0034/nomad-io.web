import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="hidden md:flex">
          <Button asChild variant="outline" className="mx-1">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="mx-1">
            <Link href="/login">Sign up</Link>
          </Button>
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Places
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Feeds
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <div />
            {isLoggedIn ? (
              <>
                <Button asChild className="bg-black">
                  <Link href="/login">My Account</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="mx-1">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-black mx-1">
                  <Link href="/login">Sign up</Link>
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
