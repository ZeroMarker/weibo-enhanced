# 微博 OAuth 配置指南

本文档详细说明如何配置微博 OAuth 2.0 授权登录。

## 前置条件

- 微博账号（需完成实名认证）
- 可访问的域名或 localhost

## 步骤一：创建微博应用

1. 访问 [微博开放平台](https://open.weibo.com/)
2. 使用微博账号登录
3. 点击右上角「管理中心」
4. 选择「创建应用」

### 应用信息填写

| 字段 | 填写内容 |
|------|----------|
| 应用名称 | 微博增强版（或自定义名称） |
| 应用分类 | 选择「网页应用」 |
| 应用平台 | Web |
| 应用域名 | `localhost` (开发环境) |
| 回调地址 | `http://localhost:3000/api/auth/callback` |

5. 提交审核（一般即时通过）

## 步骤二：获取应用凭证

1. 审核通过后，进入应用详情页
2. 找到「App Key」和「App Secret」
3. 记录这两个值

```
App Key = WEIBO_CLIENT_ID
App Secret = WEIBO_CLIENT_SECRET
```

## 步骤三：配置应用权限

1. 在应用详情页，点击「权限管理」
2. 申请以下权限：
   - `email` - 获取用户邮箱
   - `friendships_groups_read` - 读取好友分组
   - `statuses_to_me_read` - 读取@我的微博
   - `comments_to_me_read` - 读取评论

## 步骤四：配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
# 微博开放平台应用凭证
WEIBO_CLIENT_ID=你的App_Key
WEIBO_CLIENT_SECRET=你的App_Secret

# OAuth回调地址（必须与开放平台配置一致）
WEIBO_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Next.js配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=随机生成的密钥字符串
```

### 生成 NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 步骤五：配置回调地址

### 开发环境

```
http://localhost:3000/api/auth/callback
```

### 生产环境

```
https://你的域名/api/auth/callback
```

**注意**: 回调地址必须与微博开放平台配置完全一致，包括协议（http/https）和端口号。

## 验证配置

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问 http://localhost:3000/login

3. 点击「使用微博账号登录」

4. 授权后应自动跳转回首页

## 常见问题

### 1. redirect_uri_mismatch 错误

**原因**: 回调地址不匹配

**解决**: 检查以下三处是否一致：
- `.env.local` 中的 `WEIBO_REDIRECT_URI`
- 微博开放平台配置的回调地址
- `src/lib/weibo.ts` 中的默认值

### 2. invalid_client 错误

**原因**: App Key 或 App Secret 错误

**解决**: 
- 检查 `.env.local` 中的配置是否正确
- 确认没有多余的空格或引号

### 3. 权限不足

**原因**: 未申请相应权限

**解决**: 在微博开放平台的权限管理中申请所需权限

### 4. 回调地址无法访问

**原因**: 本地开发环境无法被微博服务器访问

**解决**: 
- 开发环境使用 `localhost` 即可
- 生产环境需要有公网可访问的域名

## 安全建议

1. **不要提交 `.env.local` 到 Git**
   - 该文件已在 `.gitignore` 中
   - 泄露凭证会导致安全风险

2. **生产环境使用强密钥**
   - `NEXTAUTH_SECRET` 应使用随机强密钥
   - 定期更换密钥

3. **限制回调地址**
   - 只配置信任的域名
   - 避免使用通配符

## 参考资料

- [微博开放平台文档](https://open.weibo.com/wiki)
- [OAuth 2.0 规范](https://datatracker.ietf.org/doc/html/rfc6749)
- [Next.js 环境变量](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
