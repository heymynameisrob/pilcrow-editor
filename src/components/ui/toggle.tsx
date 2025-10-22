import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-gray-2 hover:text-gray-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-12 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-2 data-[state=on]:text-gray-10",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-gray-3 bg-transparent hover:bg-gray-2 hover:text-gray-10",
        black:
          "bg-gray-10 text-white hover:bg-white/10 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white",
      },
      size: {
        default: "h-10 px-3",
        icon: "size-8 p-1",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
