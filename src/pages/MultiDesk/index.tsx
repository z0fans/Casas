import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { useMultiDesk } from "../../hooks/useMultiDesk";
import { useClashDetect } from "../../hooks/useClashDetect";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import {
  FolderOpen,
  Save,
  RefreshCw,
  Zap,
  Users,
  Server,
  CheckCircle2,
} from "lucide-react";
import type { Group, Server as ServerType } from "../../types/multidesk";

export default function MultiDeskPage() {
  const [configPath, setConfigPath] = useState<string>("");
  const { config, loading, error, loadConfig, saveConfig, autoConfigProxy } =
    useMultiDesk();
  const { status } = useClashDetect(true, 10000);

  const handleOpenFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: "XML",
            extensions: ["xml"],
          },
        ],
      });

      if (selected && typeof selected === "string") {
        setConfigPath(selected);
        await loadConfig(selected);
      }
    } catch (err) {
      console.error("打开文件失败:", err);
    }
  };

  const handleSave = async () => {
    if (configPath) {
      await saveConfig(configPath);
    }
  };

  const handleAutoConfig = async () => {
    if (status?.active_port) {
      await autoConfigProxy(status.active_port);
    }
  };

  const getServerList = (group: Group): ServerType[] => {
    const serverData = group.Server || group.servers;
    if (Array.isArray(serverData)) {
      return serverData;
    } else if (serverData) {
      return [serverData];
    }
    return [];
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          MultiDesk 配置管理
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          管理远程桌面分组和代理配置
        </p>
      </div>

      {/* 操作栏 */}
      <div className="mb-6">
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={handleOpenFile}
              className="flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              打开配置文件
            </Button>

            {config && (
              <>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "保存中..." : "保存配置"}
                </Button>

                <Button
                  onClick={handleAutoConfig}
                  disabled={!status?.active_port || loading}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  同步代理配置
                </Button>
              </>
            )}

            {configPath && (
              <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                <span className="font-mono">{configPath}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">
                ❌ {error}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* 代理状态提示 */}
      {config && (
        <div className="mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                    当前代理端口
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    检测到的活动端口
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {status?.active_port || "--"}
                </p>
                {status?.active_port ? (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ✓ 可同步配置
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    未检测到代理
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 配置内容 */}
      {config ? (
        <div className="space-y-6">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    分组数量
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {config.Servers.Group.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    服务器总数
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {config.Servers.Group.reduce(
                      (total, group) => total + getServerList(group).length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    代理配置
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {
                      config.Servers.Group.filter(
                        (g) => g.Properties.ProxyType === 1
                      ).length
                    }
                    /{config.Servers.Group.length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 分组列表 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              服务器分组
            </h3>
            <div className="space-y-4">
              {config.Servers.Group.map((group, index) => {
                const servers = getServerList(group);
                const proxyEnabled = group.Properties.ProxyType === 1;

                return (
                  <Card key={index}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {group.Properties.Name}
                          </h4>
                          <StatusBadge active={proxyEnabled} />
                        </div>

                        {proxyEnabled && (
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>
                              代理:{" "}
                              <span className="font-mono text-blue-600 dark:text-blue-400">
                                {group.Properties.SocksHostname}:
                                {group.Properties.SocksPort}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          服务器数量
                        </p>
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                          {servers.length}
                        </p>
                      </div>
                    </div>

                    {/* 服务器列表 */}
                    <div className="space-y-2">
                      {servers.map((server, serverIndex) => (
                        <div
                          key={serverIndex}
                          className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Server className="w-4 h-4 text-gray-500" />
                              <span className="font-medium text-gray-800 dark:text-gray-200">
                                {server.Name}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-mono text-gray-600 dark:text-gray-400">
                                {server.Server}
                              </span>
                              {server.InheritProxy === 1 ? (
                                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                                  继承代理
                                </span>
                              ) : server.ProxyType === 1 ? (
                                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded font-mono">
                                  {server.SocksPort}
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                                  无代理
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              未加载配置文件
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              点击"打开配置文件"选择 MultiDesk 的 XML 配置文件
            </p>
            <Button onClick={handleOpenFile} className="flex items-center gap-2 mx-auto">
              <FolderOpen className="w-4 h-4" />
              打开配置文件
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
