interface StatusBadgeProps {
  active: boolean;
}

export default function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        active
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
      }`}
    >
      {active ? "运行中" : "未运行"}
    </span>
  );
}
