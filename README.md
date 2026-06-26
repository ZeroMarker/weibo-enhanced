# 微博增强版 (Weibo Enhanced)

第三方微博网页应用，提供更好的用户体验和UI增强。

## 功能特性

- 🔐 **微博OAuth授权登录** - 安全便捷的登录方式
- 👤 **用户个人主页** - 展示用户信息和统计数据
- 📝 **微博动态浏览** - 查看微博时间线
- ❤️ **互动功能** - 点赞、评论、转发
- 🔍 **增强搜索** - 更强大的搜索和过滤
- 🎨 **现代化UI** - 基于Tailwind CSS的精美界面
- 📱 **响应式设计** - 完美适配各种设备

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks
- **认证**: 微博 OAuth 2.0
- **语言**: TypeScript

## 快速开始

### 1. 配置微博OAuth

> 📖 详细配置说明请参考 [微博OAuth配置指南](./docs/weibo-oauth-setup.md)

**快速配置**:

1. 访问 [微博开放平台](https://open.weibo.com/) 创建应用
2. 获取 App Key 和 App Secret
3. 复制并编辑环境变量：

```bash
cp .env.local.example .env.local
```

```env
WEIBO_CLIENT_ID=你的App_Key
WEIBO_CLIENT_SECRET=你的App_Secret
WEIBO_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

4. 在微博开放平台设置回调地址：`http://localhost:3000/api/auth/callback`

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:3000 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
weibo/
├── src/
│   ├── app/
│   │   ├── api/auth/
│   │   │   ├── callback/    # OAuth回调处理
│   │   │   ├── login/       # 登录API
│   │   │   ├── logout/      # 登出API
│   │   │   └── user/        # 用户信息API
│   │   ├── login/           # 登录页面
│   │   └── profile/         # 个人主页
│   ├── components/
│   │   ├── Feed.tsx         # 微博动态组件
│   │   ├── Header.tsx       # 顶部导航栏
│   │   ├── ProfileCard.tsx  # 用户资料卡片
│   │   └── Sidebar.tsx      # 侧边栏
│   ├── lib/
│   │   ├── auth.ts          # 认证工具函数
│   │   ├── session.ts       # 会话管理
│   │   └── weibo.ts         # 微博API工具
│   └── types/
│       └── index.ts         # TypeScript类型定义
├── public/                  # 静态资源
├── .env.local.example       # 环境变量示例
├── package.json
├── tailwind.config.ts       # Tailwind配置
├── tsconfig.json            # TypeScript配置
└── README.md
```

## 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页 - 微博动态流 |
| `/login` | 登录页面 |
| `/profile` | 个人主页 (需登录) |
| `/trending` | 热门微博 |
| `/bookmarks` | 收藏夹 |
| `/friends` | 好友列表 |
| `/settings` | 设置页面 |

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/auth/login` | GET | 发起OAuth登录 |
| `/api/auth/callback` | GET | OAuth回调处理 |
| `/api/auth/user` | GET | 获取当前用户信息 |
| `/api/auth/user` | DELETE | 退出登录 |
| `/api/auth/logout` | GET | 退出登录并跳转 |

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/your-feature`
3. 提交更改: `git commit -m 'Add some feature'`
4. 推送分支: `git push origin feature/your-feature`
5. 提交 Pull Request

## 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 相关链接

- [微博开放平台](https://open.weibo.com/)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
