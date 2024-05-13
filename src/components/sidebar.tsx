import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "../stores/useUserStore";

export default function Sidebar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const userIfo = useUserStore((state) => state.userInfo);

  return (
    <div>
      {isLoggedIn ? (
        <div className="hidden md:flex align-middle">
          <p className="flex items-center justify-center mx-2">
            {userIfo?.firstName}
          </p>
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
            <Link href="/sign-up">Sign up</Link>
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
            <SheetClose asChild>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Places
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Feeds
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </SheetClose>
            <div />
            {isLoggedIn ? (
              <>
                <SheetClose asChild>
                  <Button asChild className="bg-black">
                    <Link href="/my-account">My Account</Link>
                  </Button>
                </SheetClose>
                <Button asChild variant="outline">
                  <Link href="/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="mx-1">
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="bg-black mx-1">
                    <Link href="/sign-up">Sign up</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
