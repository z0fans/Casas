import { invoke } from "@tauri-apps/api/tauri";
import type { ClashStatus } from "../types/clash";

export class ClashService {
  static async detectPorts(): Promise<ClashStatus> {
    return await invoke<ClashStatus>("detect_clash_ports");
  }

  static async findInstallPath(): Promise<string[]> {
    return await invoke<string[]>("find_clash_install_path");
  }
}
