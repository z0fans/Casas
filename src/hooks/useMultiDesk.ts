import { useState } from "react";
import { MultiDeskService } from "../services/multidesk";
import type { MultiDeskConfig } from "../types/multidesk";

export function useMultiDesk() {
  const [config, setConfig] = useState<MultiDeskConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const cfg = await MultiDeskService.readConfig(path);
      setConfig(cfg);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (path: string) => {
    if (!config) return;

    setLoading(true);
    setError(null);
    try {
      await MultiDeskService.saveConfig(path, config);
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setLoading(false);
    }
  };

  const autoConfigProxy = async (activePort: number) => {
    if (!config) return;

    try {
      const newConfig = await MultiDeskService.autoConfigureProxy(
        config,
        activePort
      );
      setConfig(newConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : "配置失败");
    }
  };

  return {
    config,
    setConfig,
    loading,
    error,
    loadConfig,
    saveConfig,
    autoConfigProxy,
  };
}
