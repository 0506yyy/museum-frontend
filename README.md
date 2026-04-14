## 在线预览

[https://museum-frontend-iwfb.vercel.app](https://museum-frontend-iwfb.vercel.app)

# 华夏文明博物院前端项目

## 配套后端

后端项目：[museum-backend](https://github.com/0506yyy/museum-backend)

技术栈：Java Servlet + MySQL + Tomcat

## 项目简介

本项目是为华夏文明博物院开发的前端应用，基于 Vue 3 + TypeScript 技术栈，提供在线预约参观和新闻资讯服务。通过现代化的前端技术，为用户提供便捷的博物馆参观预约体验和及时的博物院新闻资讯。

## 功能特性

### 核心功能

- **在线预约参观**：用户可选择日期、时间和人数进行参观预约，支持多种票型选择
- **新闻资讯**：浏览博物院最新动态、展览信息和活动公告，支持搜索和分页
- **管理员后台**：管理预约信息和新闻内容
- **响应式设计**：适配不同设备屏幕尺寸，提供良好的移动端体验

### 技术特点

- **TypeScript 支持**：提供类型安全，减少运行时错误
- **Pinia 状态管理**：高效的状态管理方案
- **Vue Router**：灵活的路由配置和权限控制
- **Axios**：可靠的 API 调用
- **Vite**：快速的构建工具
- **现代化 UI**：美观、直观的用户界面

## 技术栈

| 技术       | 版本    | 用途         |
| ---------- | ------- | ------------ |
| Vue        | ^3.5.30 | 前端框架     |
| TypeScript | ~5.9.3  | 类型系统     |
| Pinia      | ^3.0.4  | 状态管理     |
| Vue Router | ^5.0.3  | 路由管理     |
| Axios      | ^1.13.6 | API 调用     |
| Vite       | ^7.3.1  | 构建工具     |
| ESLint     | ^10.0.3 | 代码质量检查 |
| Prettier   | 3.8.1   | 代码格式化   |

## 系统要求

- Node.js: ^20.19.0 或 >=22.12.0
- npm: ^10.0.0

## 安装与部署

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建结果

```bash
npm run preview
```

### 代码质量检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 项目结构

```
museum-frontend/
├── public/                # 静态资源
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码
│   ├── api/               # API 接口
│   │   ├── news.ts        # 新闻相关 API
│   │   ├── request.ts     # 请求配置
│   │   └── reservation.ts # 预约相关 API
│   ├── assets/            # 资源文件
│   │   ├── images/        # 图片资源
│   │   └── main.css       # 全局样式
│   ├── components/        # 组件
│   │   ├── common/        # 通用组件
│   │   └── layout/        # 布局组件
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── stores/            # 状态管理
│   │   ├── news.ts        # 新闻状态
│   │   └── reservation.ts # 预约状态
│   ├── types/             # TypeScript 类型定义
│   │   ├── news.ts        # 新闻类型
│   │   └── reservation.ts # 预约类型
│   ├── utils/             # 工具函数
│   │   └── validator.ts   # 表单验证
│   ├── views/             # 页面组件
│   │   ├── admin/         # 管理员页面
│   │   ├── HomeView.vue   # 首页
│   │   ├── NewsDetailView.vue # 新闻详情页
│   │   ├── NewsView.vue   # 新闻列表页
│   │   └── ReservationView.vue # 预约页面
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── .env.development       # 开发环境配置
├── .env.production        # 生产环境配置
├── index.html             # HTML 模板
├── package.json           # 项目配置和依赖
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 页面功能说明

| 页面       | 路径         | 功能                                                   |
| ---------- | ------------ | ------------------------------------------------------ |
| 首页       | /            | 展示博物院简介、特色和开放时间                         |
| 预约页面   | /reservation | 三步式预约流程，支持票型选择、人数调整、参观者信息填写 |
| 新闻列表   | /news        | 新闻资讯列表，支持搜索、分页和热门新闻标记             |
| 新闻详情   | /news/:id    | 查看新闻详细内容                                       |
| 管理员登录 | /admin/login | 管理员身份验证                                         |
| 管理员后台 | /admin       | 管理预约和新闻内容                                     |

## 核心功能详解

### 在线预约系统

- **三步式预约流程**：填写预约信息 → 填写参观者信息 → 确认提交
- **票型选择**：成人票、学生票、老年票、免费票
- **智能表单**：实时计算总金额，支持从第一位参观者复制联系人信息
- **预约须知**：提供详细的预约规则和注意事项
- **成功反馈**：预约成功后显示预约编号和详细信息

### 新闻资讯系统

- **新闻列表**：展示新闻标题、摘要、发布日期和热门标记
- **搜索功能**：支持按关键词搜索新闻
- **分页导航**：每页显示7条新闻，支持上一页/下一页导航
- **响应式设计**：在移动设备上自动调整布局

### 管理员系统

- **身份验证**：基于 token 的登录系统
- **路由守卫**：保护管理员后台页面
- **内容管理**：管理预约信息和新闻内容

### API 接口

> 具体 API 路径请参考后端项目 [museum-backend](https://github.com/0506yyy/museum-backend)

- 预约相关：`/reservation`
- 新闻相关：`/api/admin/news`
- 管理员相关：`/login.do`

## 开发指南

### 代码规范

- 使用 TypeScript 类型定义
- 遵循 ESLint 和 Prettier 配置
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case
- 样式使用 scoped CSS

### 环境变量

开发环境配置 (`.env.development`)：

```
VITE_API_BASE_URL=http://localhost:8080/henan1
```

生产环境配置 (`.env.production`)：

```
VITE_API_BASE_URL=https://your-domain.com/henan1
```

### 路由守卫

系统实现了基于 Session 的路由守卫，保护管理员后台页面：

- 访问 `/admin` 需要验证 `adminToken`
- 未登录用户将被重定向到 `/admin/login`

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Edge (最新版)
- Safari (最新版)

## 推荐开发工具

- **IDE**: VS Code + Volar 插件
- **浏览器工具**: Vue.js devtools

## 项目维护

### 版本控制

使用 Git 进行版本控制，遵循以下分支规范：

- `main` - 生产环境分支
- `develop` - 开发分支
- `feature/*` - 功能开发分支
- `bugfix/*` - bug 修复分支

### 发布流程

1. 从 `develop` 分支创建发布分支
2. 进行测试和修复
3. 合并到 `main` 分支
4. 执行构建和部署

## 联系方式

- 项目地址：https://github.com/0506yyy/museum-frontend

---

**华夏文明博物院** - 传承中原文明，展示历史瑰宝
