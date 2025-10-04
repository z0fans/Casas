// MultiDesk 配置接口
export interface MultiDeskConfig {
  Servers: {
    Group: Group[];
  };
  Settings?: any;
  ExternalTools?: {
    ExternalTool: ExternalTool[];
  };
}

export interface Group {
  Properties: GroupProperties;
  Server: Server | Server[]; // 修改为简单的联合类型
  servers?: Server | Server[]; // 添加小写版本以兼容
}

export interface GroupProperties {
  Name: string;
  Description?: string;
  InheritGeneral: number;
  InheritProxy: number;
  ProxyType: number; // 0=None, 1=SOCKS5
  SocksHostname: string;
  SocksPort: number;
  SocksUserName: string;
  SocksPassword: string;
  UserName: string;
  Domain?: string;
  Password: string;
  RDPPort: number;
  DesktopWidth: number;
  DesktopHeight: number;
  ColorDepth: number;
  FullScreen: number;
  SmartSizing: number;
}

export interface Server {
  Name: string;
  Description?: string;
  Server: string; // IP地址
  MacAddress?: string;
  InheritGeneral: number;
  InheritProxy: number;
  InheritDisplay: number;
  // Proxy配置
  ProxyType: number;
  SocksHostname: string;
  SocksPort: number;
  SocksUserName: string;
  SocksPassword: string;
  // RDP配置
  UserName: string;
  Domain?: string;
  Password: string;
  RDPPort: number;
  // 显示配置
  RedirectPrinters: number;
  RedirectClipboard: number;
  RedirectDrives: number;
  AudioRedirectionMode: number;
}

export interface ExternalTool {
  Title: string;
  Command: string;
  Arguments: string;
  StartPath: string;
}
