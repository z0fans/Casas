import { invoke } from "@tauri-apps/api/tauri";
import type { MultiDeskConfig } from "../types/multidesk";

export class MultiDeskService {
  // 读取配置
  static async readConfig(path: string): Promise<MultiDeskConfig> {
    return await invoke<MultiDeskConfig>("read_multidesk_config", { path });
  }

  // 保存配置
  static async saveConfig(
    path: string,
    config: MultiDeskConfig
  ): Promise<void> {
    await invoke("write_multidesk_config", { path, config });
  }

  // 自动配置代理
  static async autoConfigureProxy(
    config: MultiDeskConfig,
    activePort: number
  ): Promise<MultiDeskConfig> {
    return await invoke<MultiDeskConfig>("auto_configure_proxy", {
      config,
      activePort,
    });
  }
}
