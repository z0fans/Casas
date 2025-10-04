import { useClashDetect } from "../hooks/useClashDetect";
import StatusBadge from "../components/common/StatusBadge";
import Card from "../components/common/Card";
import { Activity, Zap, Monitor, Clock, Server, FolderCog } from "lucide-react";

export default function Dashboard() {
  const { status } = useClashDetect(true, 10000);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          系统概览
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          实时监控系统运行状态
        </p>
      </div>

      {/* 状态卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Clash 状态 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                  Clash
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  端口 7890
                </p>
              </div>
            </div>
            <StatusBadge active={status?.clash_running || false} />
          </div>
        </Card>

        {/* Clash Verge 状态 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                  Clash Verge
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  端口 7897
                </p>
              </div>
            </div>
            <StatusBadge active={status?.verge_running || false} />
          </div>
        </Card>

        {/* 活动端口 */}
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">活动代理端口</h3>
              <p className="text-xs opacity-90">当前使用中</p>
            </div>
          </div>
          <p className="text-4xl font-bold">{status?.active_port || "--"}</p>
        </Card>

        {/* 自动刷新状态 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                自动刷新
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                状态监控
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            已启用
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            每 10 秒刷新
          </p>
        </Card>

        {/* 代理服务状态 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-3 rounded-lg ${
                status?.active_port
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-gray-100 dark:bg-gray-700/30"
              }`}
            >
              <Server
                className={`w-6 h-6 ${
                  status?.active_port
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                代理服务
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SOCKS5 状态
              </p>
            </div>
          </div>
          <p
            className={`text-2xl font-bold ${
              status?.active_port
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-500"
            }`}
          >
            {status?.active_port ? "正常运行" : "未检测到"}
          </p>
        </Card>

        {/* MultiDesk 配置 */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FolderCog className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                MultiDesk 配置
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                配置文件
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-500 dark:text-gray-500">
            待加载
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            前往 MultiDesk 页面配置
          </p>
        </Card>
      </div>
    </div>
  );
}
