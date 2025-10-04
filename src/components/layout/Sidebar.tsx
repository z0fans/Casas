import { Home, Monitor, Zap, Settings } from "lucide-react";

type Page = "dashboard" | "multidesk" | "clash" | "settings";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as Page, label: "仪表盘", icon: Home },
    { id: "multidesk" as Page, label: "MultiDesk", icon: Monitor },
    { id: "clash" as Page, label: "Clash配置", icon: Zap },
    { id: "settings" as Page, label: "设置", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          🚀 ClashDesk
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          配置管理器
        </p>
      </div>

      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition ${
                currentPage === item.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <Icon className="mr-3 w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
