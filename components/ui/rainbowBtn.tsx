import { cn } from "@/lib/utils";
import { CustomButtonProps } from "@/types/types";

export function RainbowButton({
  className,
  content,
  onClick,
}: CustomButtonProps) {
  return (
    <div className="p-[1px] bg-gradient-to-br from-pink-600 via-orange-600 to-cyan-400 rounded-[10px]">
      <button
        onClick={onClick}
        className={cn(
          "px-4 py-2 bg-neutral-100 dark:bg-gray-900 hover:bg-white transition duration-300 rounded-[9px]",
          className,
        )}
      >
        {content}
      </button>
    </div>
  );
}
