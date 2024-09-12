export function Shortcut({ isMac, func, shortcut }: any) {
  return (
    <div className="flex justify-between items-center mt-4 text-gray-600 dark:text-gray-400">
      <p>{func}</p>
      <p className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-md">
        {isMac ? `⌘ ${shortcut}` : `Win ${shortcut}`}
      </p>
    </div>
  );
}
