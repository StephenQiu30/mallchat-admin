---
layer: Plan
doc_no: "PL-001"
audience:
  - PM
  - Dev
  - QA
  - Ops
feature_area: admin-antd-pro-optimization
purpose: "编排 MallChat 管理后台按 Ant Design Pro 规范优化、OpenAPI 生成服务同步和分 feature Issue 消费顺序。"
canonical_path: "docs/plans/PL-001-admin-antd-pro-optimization-plan.md"
status: review
version: "0.1.0"
owner: "StephenQiu30"
inputs:
  - "AGENTS.md"
  - "config/config.ts"
  - "config/routes.ts"
  - "src/services/*"
  - "src/pages/Admin/*"
outputs:
  - "admin feature Issue 编排"
  - "Ant Design Pro 页面治理边界"
  - "OpenAPI 生成服务使用规则"
triggers:
  - "优化 mallchat-admin 管理后台"
  - "新增或调整管理后台页面"
  - "后端接口 DTO/VO 更新后同步前端请求代码"
downstream:
  - "GitHub Issues / PRs"
  - "src/pages/Admin/*"
  - "src/services/*"
---

# 管理后台 Ant Design Pro 优化计划

## 1. 背景

`mallchat-admin` 已使用 Umi Max、Ant Design Pro、ProComponents 和 OpenAPI 生成服务，当前已有用户、通知、聊天室、好友申请、AI 对话、群组、统计和日志页面。现状已经可运行，但存在以下可优化点：

1. 页面实现风格不完全统一，部分列表缺少 `PageContainer`、`cardBordered`、`columnsState`、详情抽屉或统一工具栏。
2. `src/services/post`、`src/services/search` 是疑似历史生成目录，不在当前 `config/config.ts` 的 OpenAPI projectName 中。
3. 部分页面使用本地筛选或占位提示，例如聊天室详情“开发中”、统计页在线人数/消息数占位。
4. 后端接口仍以多个微服务 OpenAPI 暴露，管理后台应继续通过 `npm run openapi` 生成请求代码，避免手写或手改生成服务。

## 2. 目标

1. 完全遵循 Ant Design Pro 现有项目形态：`PageContainer + ProTable + ProDescriptions/Drawer + ModalForm`。
2. 按后端 OpenAPI 生成 `src/services/{user,file,notification,log,ai,chat}` 请求代码，不手改生成目录。
3. 按 feature 拆分 Issue，避免一次性重做整个后台。
4. 只完善管理后台基本可用能力，不引入复杂运营驾驶舱、BI 平台、独立设计系统或新状态库。
5. 每个 feature PR 至少通过 `pnpm run tsc`，涉及页面逻辑时补充可执行验证说明。

## 3. 非目标

1. 不重写 Ant Design Pro 模板、ProLayout 或 Umi Max 架构。
2. 不引入新的图表库、低代码平台、独立权限系统或前端状态框架。
3. 不凭空实现后端没有提供的统计、审核或检索能力；缺失接口只做边界提示或拆后端任务。
4. 不手动编辑 OpenAPI 生成的 `src/services/**` 文件；需要更新时改后端接口或 OpenAPI 配置后重新生成。
5. 不在同一个 PR 中混合多个 feature 的大范围 UI 重构。

## 4. Ant Design Pro 页面规范

1. 管理页根容器优先使用 `PageContainer`，标题和说明交给路由、表格 `headerTitle` 或页面元信息，不写营销化说明。
2. 列表页优先使用 `ProTable`，请求函数返回 `{ data, success, total }`。
3. `rowKey` 使用稳定业务 ID，表格列使用 `valueType`、`valueEnum`、`copyable`、`ellipsis` 和 `hideInSearch` 控制可读性。
4. 常规详情使用 `Drawer + ProDescriptions`，新增/编辑使用 `ModalForm` 或 `DrawerForm`。
5. 批量操作使用 `FooterToolbar`，危险操作使用 `Popconfirm`，成功/失败反馈使用 `message`。
6. 页面只做管理后台必要操作：查询、查看详情、基础编辑、删除/禁用、审核/标记，不堆叠复杂配置。

## 5. OpenAPI 生成规则

1. `config/config.ts` 中保留当前多服务配置：`user`、`file`、`notification`、`log`、`ai`、`chat`。
2. 后端接口启动后运行：

```bash
pnpm run openapi
```

3. 生成后只允许检查和引用 `src/services/{user,file,notification,log,ai,chat}`。
4. `src/services/post`、`src/services/search` 如确认未被引用，应作为历史生成目录清理。
5. 如果 OpenAPI 生成导致类型或函数名变化，应以生成结果为准修改页面调用，不手写兼容层。

## 6. Feature Issue 拆分

| Issue | Feature | 范围 | 不做事项 | 验收 |
| --- | --- | --- | --- | --- |
| [#2](https://github.com/StephenQiu30/mallchat-admin/issues/2) | 计划与 OpenAPI 基线 | 计划文档、OpenAPI 配置审查、生成目录清理策略、Issue 编排 | 不改页面业务 | `pnpm run tsc` 通过，Issue 创建完成 |
| [#3](https://github.com/StephenQiu30/mallchat-admin/issues/3) | 后台壳层与导航体验 | 路由分组、菜单命名、权限跳转、统计页基础数据态 | 不做复杂 BI 图表 | 页面结构符合 Ant Design Pro，统计页无误导性占位 |
| [#4](https://github.com/StephenQiu30/mallchat-admin/issues/4) | 用户与关系治理 | 用户列表、用户详情/编辑/封禁、好友申请审核 | 不新增后端没有的复杂风控 | ProTable 查询与操作闭环可用 |
| [#5](https://github.com/StephenQiu30/mallchat-admin/issues/5) | 群聊与消息治理 | 聊天室、群组、成员抽屉、消息记录抽屉 | 不实现客户端聊天窗口 | 详情不再是“开发中”，群/消息基础治理可用 |
| [#6](https://github.com/StephenQiu30/mallchat-admin/issues/6) | 通知、日志与 AI 审计 | 通知管理、日志列表、AI 对话记录详情 | 不做全文检索平台 | 统一 ProTable/ProDescriptions 风格 |
| [#7](https://github.com/StephenQiu30/mallchat-admin/issues/7) | 质量门禁与交付 | `pnpm run openapi`、`pnpm run tsc`、必要 lint、PR 模板证据 | 不新增高噪声 CI | 验证命令清晰，工作区干净 |

## 7. 执行顺序

1. A0：先完成计划审查和 Issue 创建，确认 OpenAPI 生成目录事实。
2. A1：先收敛布局、路由和统计页，给后续 feature 提供一致页面骨架。
3. A2/A3：用户关系和群聊消息是 IM 后台核心，可分支并行但不得同时改同一页面。
4. A4：支撑通知、日志和 AI 审计，复用 A1-A3 形成的页面模式。
5. A5：收口生成服务、类型检查、文档和 PR 证据。

## 8. 执行计划自审

1. 范围闭环：计划只覆盖 admin 管理后台，不修改后端接口；如果发现后端缺少接口，只记录为后端后续任务。
2. 风格一致性：继续使用 Ant Design Pro、Umi Max、ProComponents 和当前项目枚举目录，不引入新 UI 体系。
3. OpenAPI 一致性：生成服务目录不手改；页面只引用生成代码和本地枚举/展示工具。
4. 不过度设计：统计页只保留已有接口能支撑的数据，不做复杂图表和运营分析。
5. 可验收性：每个 Issue 都能通过页面范围、命令和 PR 说明单独验收。
6. 工作区清洁：执行实现前必须确认 `mallchat-admin` `git status --short` 为空。

## 9. 基线验证

当前基线已执行：

```bash
pnpm run tsc
```

结果：通过。

## 10. 风险与边界

1. `pnpm run openapi` 依赖后端各服务的 `/api/v3/api-docs` 可访问；如果服务未启动，需要先启动后端或延后生成。
2. OpenAPI 预检显示当前生成结果会导致部分页面类型漂移，例如 `API.User`、`API.Notification`、`listFriendApplyParams` 和消息历史参数，需要在 A2/A3/A4/A5 中按生成类型修正。
3. 某些管理能力可能缺后端分页/统计接口，前端不得用假数据伪装完成。
4. 生成服务可能覆盖已有手工调整，因此实现前需要确认服务目录是否为纯生成代码。
5. 后续如需要真实页面验收，应启动 dev server 并用浏览器检查主要页面。

## 11. 变更记录

| 日期 | 作者 | 版本 | 变更说明 |
| --- | --- | --- | --- |
| 2026-05-21 | StephenQiu30 | 0.1.0 | 初始化管理后台 Ant Design Pro 优化与 Issue 编排计划 |
