import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import MultiDeskPage from "./pages/MultiDesk";
import ClashConfig from "./pages/ClashConfig";
import Settings from "./pages/Settings";

type Page = "dashboard" | "multidesk" | "clash" | "settings";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "multidesk":
        return <MultiDeskPage />;
      case "clash":
        return <ClashConfig />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}

export default App;
