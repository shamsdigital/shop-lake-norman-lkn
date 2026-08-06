import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-[#082e6e] hover:text-white",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 hover:text-white focus-visible:ring-destructive/30",
        outline:
          "border border-border bg-white text-primary hover:border-primary hover:bg-[#f3f6fa] hover:text-primary",
        secondary:
          "bg-secondary text-primary hover:bg-[#dce4ee] hover:text-primary",
        ghost: "text-primary hover:bg-muted hover:text-primary",
        link: "h-auto p-0 text-primary underline-offset-4 hover:text-[#082e6e] hover:underline",
        chip:
          "rounded-full border border-border bg-white font-medium text-[#4a5c70] hover:border-primary hover:bg-white hover:text-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "size-10",
        chip: "h-auto px-2.5 py-1 text-[11px] leading-tight",
        letter: "h-6 min-w-6 px-1 text-[10px] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
