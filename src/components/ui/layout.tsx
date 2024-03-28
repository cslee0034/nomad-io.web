import * as React from "react";
import { cn } from "@/lib/utils";

const Main = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      "flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10",
      className
    )}
    {...props}
  >
    {children}
  </main>
));

Main.displayName = "Main";

export { Main };
