import { useState } from "react";
import { useClashDetect } from "../hooks/useClashDetect";
import StatusBadge from "../components/common/StatusBadge";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { RefreshCw, FolderOpen, Settings } from "lucide-react";

export default function ClashConfig() {
  const { status, loading, refresh } = useClashDetect(false, 0);
  const [installPaths, setInstallPaths] = useState<string[]>([]);
  const [searchingPaths, setSearchingPaths] = useState(false);

  const searchInstallPaths = async () => {
    setSearchingPaths(true);
    try {
      const { invoke } = await import("@tauri-apps/api/tauri");
      const paths = await invoke<string[]>("find_clash_install_path");
      setInstallPaths(paths);
    } catch (error) {
      console.error("搜索失败:", error);
    } finally {
      setSearchingPaths(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Clash 配置管理
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          管理 Clash 和 Clash Verge 代理配置
        </p>
      </div>

      {/* 端口状态检测 */}
      <div className="mb-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              端口状态检测
            </h3>
            <Button
              onClick={refresh}
              disabled={loading}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              {loading ? "检测中..." : "手动检测"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clash (7890)
                </p>
              </div>
              <StatusBadge active={status?.clash_running || false} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clash Verge (7897)
                </p>
              </div>
              <StatusBadge active={status?.verge_running || false} />
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  活动端口
                </p>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {status?.active_port || "--"}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 安装路径检测 */}
      <div className="mb-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              安装路径检测
            </h3>
            <Button
              onClick={searchInstallPaths}
              disabled={searchingPaths}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FolderOpen
                className={`w-4 h-4 ${searchingPaths ? "animate-pulse" : ""}`}
              />
              {searchingPaths ? "搜索中..." : "搜索路径"}
            </Button>
          </div>

          {installPaths.length > 0 ? (
            <div className="space-y-2">
              {installPaths.map((path, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                    {path}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>点击"搜索路径"查找 Clash 安装位置</p>
            </div>
          )}
        </Card>
      </div>

      {/* 代理配置 */}
      <div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              代理设置
            </h3>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                SOCKS5 代理
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    主机:
                  </span>
                  <span className="ml-2 font-mono text-gray-800 dark:text-gray-200">
                    127.0.0.1
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    端口:
                  </span>
                  <span className="ml-2 font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {status?.active_port || "未检测"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                💡 <strong>提示:</strong> 检测到活动端口后,可在 MultiDesk
                页面一键同步代理配置
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
