// Clash 状态接口
export interface ClashStatus {
  clash_running: boolean;
  verge_running: boolean;
  active_port: number | null;
}
