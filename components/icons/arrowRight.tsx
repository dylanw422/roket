import { cn } from "@/lib/utils";
import { IconProps } from "../customDock";

export function ArrowRight({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right w-12 p-1 text-white ml-2 rounded-lg bg-violet-500 h-full",
        className,
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
}
