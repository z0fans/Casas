<div align="center">

# 🚀 ClashDesk Manager

**可扩展的远程桌面配置管理器**

[![Tauri](https://img.shields.io/badge/Tauri-1.5-blue?logo=tauri)](https://tauri.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Rust](https://img.shields.io/badge/Rust-1.75-orange?logo=rust)](https://www.rust-lang.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 简介

ClashDesk Manager 是一款基于 Tauri 构建的跨平台桌面应用,专注于远程桌面配置的自动化管理。核心功能包括:

- 🔍 **智能检测** - 自动识别 Clash/Clash Verge 代理端口
- ⚙️ **配置管理** - 可视化编辑 MultiDesk XML 配置
- 🔄 **自动同步** - 一键同步代理配置到所有服务器
- 🧩 **插件系统** - 支持扩展其他远程桌面工具

---

## ✨ 功能特性

### 已实现
- ✅ Clash/Clash Verge 端口检测(7890/7897)
- ✅ MultiDesk XML 配置文件读写
- ✅ 服务器分组与代理配置管理
- ✅ 自动代理端口配置同步

### 计划中
- 🔲 密码加解密功能
- 🔲 配置文件备份与恢复
- 🔲 批量服务器导入
- 🔲 XShell/Putty 配置支持(插件)

---

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图标**: Lucide React
- **构建工具**: Vite

### 后端
- **框架**: Tauri 1.5
- **语言**: Rust 1.75+
- **XML 解析**: quick-xml
- **异步运行时**: Tokio

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- Rust >= 1.75
- npm 或 pnpm

### 安装依赖
```bash
# 克隆仓库
git clone https://github.com/yourusername/clashdesk-manager.git
cd clashdesk-manager

# 安装前端依赖
npm install
```

### 开发模式
```bash
npm run tauri dev
```

### 构建生产版本
```bash
npm run tauri build
```

---

## 📐 整体架构

```
ClashDesk Manager
├── 前端层 (React)
│   ├── UI 组件库
│   ├── 状态管理
│   └── API 服务层
│
├── 后端层 (Rust/Tauri)
│   ├── 命令处理器
│   ├── 业务逻辑服务
│   └── 系统交互模块
│
└── 插件系统 (规划中)
    ├── MultiDesk 插件
    ├── XShell 插件
    └── Putty 插件
```

---

## 🗂️ 项目结构

```
clashdesk-manager/
├── src/                           # 前端代码 (React)
│   ├── App.tsx                    # 主入口
│   ├── main.tsx
│   ├── index.css                  # Tailwind 入口
│   │
│   ├── components/                # UI 组件
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # 侧边栏导航
│   │   │   ├── Header.tsx         # 顶部栏
│   │   │   └── Layout.tsx         # 整体布局
│   │   │
│   │   ├── common/                # 通用组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Switch.tsx
│   │   │   └── StatusBadge.tsx    # 状态标签
│   │   │
│   │   └── features/              # 功能组件
│   │       ├── ClashDetector.tsx  # Clash检测面板
│   │       ├── ServerList.tsx     # 服务器列表
│   │       ├── ServerEditor.tsx   # 服务器编辑器
│   │       └── GroupManager.tsx   # 分组管理
│   │
│   ├── pages/                     # 页面
│   │   ├── Dashboard.tsx          # 仪表盘
│   │   ├── MultiDesk/
│   │   │   ├── index.tsx          # MultiDesk主页
│   │   │   ├── GroupConfig.tsx    # 分组配置
│   │   │   └── ServerConfig.tsx   # 服务器配置
│   │   ├── ClashConfig.tsx        # Clash配置页
│   │   ├── Settings.tsx           # 应用设置
│   │   └── PluginMarket.tsx       # 插件市场(未来)
│   │
│   ├── hooks/                     # 自定义 Hooks
│   │   ├── useClashDetect.ts      # Clash检测逻辑
│   │   ├── useMultiDesk.ts        # MultiDesk操作
│   │   └── useConfig.ts           # 配置文件管理
│   │
│   ├── services/                  # API调用封装
│   │   ├── tauri.ts               # Tauri命令封装
│   │   ├── multidesk.ts           # MultiDesk服务
│   │   └── clash.ts               # Clash服务
│   │
│   ├── types/                     # TypeScript 类型定义
│   │   ├── multidesk.ts           # MultiDesk类型
│   │   ├── clash.ts               # Clash类型
│   │   └── common.ts              # 通用类型
│   │
│   ├── utils/                     # 工具函数
│   │   ├── xml-parser.ts          # XML解析
│   │   ├── password-crypto.ts     # 密码加解密
│   │   └── validator.ts           # 数据验证
│   │
│   └── store/                     # 状态管理 (Zustand)
│       ├── appStore.ts            # 应用全局状态
│       ├── multideskStore.ts      # MultiDesk状态
│       └── clashStore.ts          # Clash状态
│
├── src-tauri/                     # 后端代码 (Rust)
│   ├── src/
│   │   ├── main.rs                # 主入口
│   │   │
│   │   ├── commands/              # Tauri 命令
│   │   │   ├── mod.rs
│   │   │   ├── clash.rs           # Clash检测命令
│   │   │   ├── multidesk.rs       # MultiDesk操作命令
│   │   │   ├── file.rs            # 文件操作命令
│   │   │   └── system.rs          # 系统信息命令
│   │   │
│   │   ├── services/              # 业务逻辑
│   │   │   ├── mod.rs
│   │   │   ├── port_detector.rs   # 端口检测
│   │   │   ├── process_finder.rs  # 进程查找
│   │   │   ├── xml_handler.rs     # XML处理
│   │   │   └── crypto.rs          # 加解密服务
│   │   │
│   │   ├── models/                # 数据模型
│   │   │   ├── mod.rs
│   │   │   ├── multidesk.rs       # MultiDesk数据结构
│   │   │   └── clash.rs           # Clash数据结构
│   │   │
│   │   └── utils/                 # 工具函数
│   │       ├── mod.rs
│   │       └── disk_scanner.rs    # 磁盘扫描工具
│   │
│   ├── Cargo.toml                 # Rust依赖
│   └── tauri.conf.json            # Tauri配置
│
├── public/                        # 静态资源
│   └── icons/                     # 应用图标
│
├── tailwind.config.js             # Tailwind配置
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts                 # Vite配置
├── package.json
└── README.md
```

<details>
<summary>📂 详细目录说明</summary>

### 前端模块
- `components/` - React 组件
  - `layout/` - 布局组件(Sidebar, Header)
  - `common/` - 通用组件(Button, Card, Input)
  - `features/` - 功能组件(ClashDetector, ServerList)
- `pages/` - 页面级组件
- `hooks/` - 自定义 React Hooks
- `services/` - API 调用封装
- `types/` - TypeScript 类型定义
- `store/` - Zustand 状态管理

### 后端模块
- `commands/` - Tauri 命令处理器
- `services/` - 业务逻辑层
- `models/` - 数据结构定义
- `utils/` - 工具函数

</details>

---

## 🎨 核心数据模型

### MultiDesk 配置结构

```typescript
interface MultiDeskConfig {
  Servers: {
    Group: Group[];  // 服务器分组
  };
  Settings: any;     // 全局设置
  ExternalTools?: {
    ExternalTool: ExternalTool[];
  };
}

interface Group {
  Properties: GroupProperties;  // 分组属性
  Server: Server | Server[];    // 单个或多个服务器
}

interface GroupProperties {
  Name: string;
  ProxyType: number;        // 0=无, 1=SOCKS5
  SocksHostname: string;    // 代理主机
  SocksPort: number;        // 代理端口
  SocksUserName: string;
  SocksPassword: string;    // 加密密码
  // ... RDP 配置
}
```

<details>
<summary>查看完整类型定义</summary>

```typescript
interface Server {
  Name: string;
  Server: string;           // IP 地址
  InheritProxy: number;     // 是否继承分组代理
  ProxyType: number;
  SocksPort: number;
  UserName: string;
  Password: string;
  RDPPort: number;
  // ... 更多属性
}
```

</details>

---

## 🔧 核心功能实现

### 1️⃣ Clash 端口检测

**Rust 后端**
```rust
// src-tauri/src/commands/clash.rs
#[tauri::command]
pub fn detect_clash_ports() -> Result<ClashStatus, String> {
    let clash_running = is_port_in_use(7890);
    let verge_running = is_port_in_use(7897);

    let active_port = if verge_running {
        Some(7897)
    } else if clash_running {
        Some(7890)
    } else {
        None
    };

    Ok(ClashStatus {
        clash_running,
        verge_running,
        active_port,
    })
}
```

**TypeScript 前端**
```typescript
// src/hooks/useClashDetect.ts
export function useClashDetect(autoRefresh = false, interval = 5000) {
  const [status, setStatus] = useState<ClashStatus | null>(null);

  const detect = async () => {
    const result = await ClashService.detectPorts();
    setStatus(result);
  };

  useEffect(() => {
    detect();
    if (autoRefresh) {
      const timer = setInterval(detect, interval);
      return () => clearInterval(timer);
    }
  }, [autoRefresh, interval]);

  return { status, loading, error, refresh: detect };
}
```

---

### 2️⃣ MultiDesk 配置管理

**读取配置**
```rust
#[tauri::command]
pub fn read_multidesk_config(path: String) -> Result<MultiDeskConfig, String> {
    let xml_content = fs::read_to_string(&path)?;
    let config: MultiDeskConfig = quick_xml::de::from_str(&xml_content)?;
    Ok(config)
}
```

**自动配置代理**
```rust
#[tauri::command]
pub fn auto_configure_proxy(
    config: MultiDeskConfig,
    active_port: u16,
) -> Result<MultiDeskConfig, String> {
    let mut new_config = config.clone();

    for group in &mut new_config.servers.groups {
        if group.properties.proxy_type == 1 {
            group.properties.socks_port = active_port;
        }
    }

    Ok(new_config)
}
```

---

## 🎨 UI 界面预览

### 仪表盘
- 实时显示 Clash/Clash Verge 运行状态
- 展示当前活动代理端口
- 一键刷新检测

### MultiDesk 配置页
- 分组管理(增删改查)
- 服务器列表编辑
- 批量代理配置同步

---

## 📦 依赖清单

### Rust (Cargo.toml)
```toml
[dependencies]
tauri = { version = "1.5", features = ["shell-open"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
quick-xml = { version = "0.31", features = ["serialize"] }
tokio = { version = "1", features = ["full"] }
```

### TypeScript (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "zustand": "^4.4.0",
    "@tauri-apps/api": "^1.5.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}
```

---

## 🔌 插件系统(规划中)

```typescript
interface Plugin {
  id: string;
  name: string;

  // 生命周期钩子
  onLoad?: () => void;
  onUnload?: () => void;

  // 功能接口
  detectConfig?: () => Promise<boolean>;
  readConfig?: (path: string) => Promise<any>;
  writeConfig?: (path: string, config: any) => Promise<void>;

  // UI 组件
  configPage?: React.ComponentType;
}
```

**支持的插件**
- ✅ MultiDesk Plugin
- 🔲 XShell Plugin
- 🔲 Putty Plugin
- 🔲 RDP Manager Plugin

---

## 🛣️ 开发路线图

### v1.0 (MVP)
- [x] Clash 端口检测
- [x] MultiDesk 配置读写
- [ ] 密码加解密
- [ ] 配置备份功能

### v1.1
- [ ] 批量服务器导入
- [ ] 配置文件校验
- [ ] 暗黑主题支持

### v2.0
- [ ] 插件系统实现
- [ ] XShell 配置支持
- [ ] 配置云同步

---

## 🤝 贡献指南

欢迎贡献代码!请遵循以下步骤:

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范
- 遵循 ESLint/Prettier 代码格式
- 遵循 SOLID 原则编写 Rust 代码
- 所有 PR 需通过 CI 测试

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 📧 联系方式

- Issues: [GitHub Issues](https://github.com/yourusername/clashdesk-manager/issues)
- Email: your.email@example.com

---

<div align="center">

**⭐ 如果这个项目对你有帮助,请给一个 Star!**

Made with ❤️ by ClashDesk Team

</div>
