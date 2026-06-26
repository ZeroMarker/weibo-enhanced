# 微博增强版 (Weibo Enhanced)

第三方微博网页应用，提供更好的用户体验和UI增强。

## 功能特性

- 🎨 现代化UI设计
- 🌙 深色模式支持
- 📱 响应式布局
- ⚡ 更快的加载速度
- 🔍 增强的搜索功能
- 📊 数据统计可视化

## 技术栈

- **前端框架**: Next.js 14
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks
- **数据获取**: SWR

## 功能特性

- 🔐 微博OAuth授权登录
- 👤 用户个人主页
- 📝 微博动态浏览
- ❤️ 点赞、评论、转发
- 🔍 增强的搜索功能

## 快速开始

### 配置微博OAuth

1. 访问 [微博开放平台](https://open.weibo.com/) 创建应用
2. 获取 Client ID 和 Client Secret
3. 复制 `.env.local.example` 为 `.env.local`
4. 填入你的微博应用配置：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`:
```
WEIBO_CLIENT_ID=你的Client_ID
WEIBO_CLIENT_SECRET=你的Client_SECRET
WEIBO_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm run start
```

## 项目结构

```
weibo/
├── src/
│   ├── app/
│   │   ├── api/auth/    # OAuth API路由
│   │   ├── login/       # 登录页面
│   │   └── profile/     # 个人主页
│   ├── components/      # React组件
│   ├── lib/
│   │   ├── weibo.ts     # 微博OAuth工具
│   │   ├── session.ts   # 会话管理
│   │   └── auth.ts      # 认证工具
│   └── types/           # TypeScript类型定义
├── public/              # 静态资源
├── .env.local.example   # 环境变量示例
├── package.json
└── README.md
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
