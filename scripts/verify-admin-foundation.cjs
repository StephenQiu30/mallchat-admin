#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

const expectIncludes = (source, text, message) => {
  if (!source.includes(text)) {
    failures.push(message);
  }
};

const routes = read('config/routes.ts');
const statistics = read('src/pages/Admin/Statistics/index.tsx');

const routeTree = new Function(`${routes.replace(/^export default/, 'return')}`)();
const adminMenuGroups = routeTree.filter(
  (route) =>
    route &&
    route.name &&
    route.path?.startsWith('/admin/') &&
    route.access === 'canAdmin' &&
    Array.isArray(route.routes) &&
    !route.hidden,
);

expectIncludes(
  routes,
  "redirect: '/admin/workbench/statistics'",
  '根路径应默认进入数据概览页，而不是直接进入某个治理列表。',
);
expectIncludes(
  routes,
  "path: '/admin', redirect: '/admin/workbench/statistics'",
  '/admin 应直接进入数据概览页，避免命中空父级路由。',
);
expectIncludes(
  routes,
  "path: '/admin/statistics', redirect: '/admin/workbench/statistics'",
  '旧数据概览地址应重定向到新的工作台路径。',
);

const expectedGroups = {
  工作台: '/admin/workbench',
  用户与关系: '/admin/relation',
  聊天治理: '/admin/chat',
  运营审计: '/admin/ops',
};

Object.entries(expectedGroups).forEach(([name, routePath]) => {
  expectIncludes(routes, `name: '${name}'`, `路由菜单缺少「${name}」分组。`);
  if (!new RegExp(`name: '${name}',[\\s\\S]*?path: '${routePath}'`).test(routes)) {
    failures.push(`「${name}」分组父路径应为 ${routePath}。`);
  }
});

const actualGroupPaths = adminMenuGroups.map((route) => route.path);

if (new Set(actualGroupPaths).size !== actualGroupPaths.length) {
  failures.push('一级分组 path 必须唯一，避免 ProLayout 菜单 key 冲突。');
}

Object.values(expectedGroups).forEach((routePath) => {
  if (!actualGroupPaths.includes(routePath)) {
    failures.push(`一级菜单实际路由中缺少 ${routePath}。`);
  }
});

const checkChildRoutes = (children, parentPath) => {
  children?.forEach((child) => {
    if (child.path?.startsWith('/') && !child.path.startsWith(parentPath)) {
      failures.push(`${child.path} 必须以父级路径 ${parentPath} 开头。`);
    }
    if (Array.isArray(child.routes)) {
      checkChildRoutes(child.routes, child.path);
    }
  });
};

adminMenuGroups.forEach((route) => checkChildRoutes(route.routes, route.path));

expectIncludes(
  routes,
  "path: '/admin/log', redirect: '/admin/ops/log'",
  '旧日志父入口 /admin/log 应重定向到新的日志明细入口。',
);

expectIncludes(
  statistics,
  'PageContainer',
  '数据概览页应使用 Ant Design Pro 的 PageContainer 作为页面容器。',
);
expectIncludes(statistics, 'ProCard', '数据概览页应使用 ProCard 组织统计内容。');
expectIncludes(statistics, 'listUserByPage', '数据概览页应使用后端用户接口获取真实用户统计。');
expectIncludes(
  statistics,
  'listUserChatRooms',
  '数据概览页应使用后端聊天房间接口获取真实房间统计。',
);
expectIncludes(
  statistics,
  'getNotificationUnreadCount',
  '数据概览页应使用后端通知接口获取真实未读通知统计。',
);
expectIncludes(
  statistics,
  'listMyAiChatRecordVoByPage',
  '数据概览页应使用后端 AI 记录接口获取真实 AI 审计统计。',
);

if (/title="在线人数"[\s\S]*?value=\{0\}/.test(statistics)) {
  failures.push('在线人数不能使用 value={0} 伪装真实统计。');
}

if (/title="总消息数"[\s\S]*?value=\{0\}/.test(statistics)) {
  failures.push('总消息数不能使用 value={0} 伪装真实统计。');
}

if (statistics.includes('title="在线人数"') || statistics.includes('title="总消息数"')) {
  failures.push('已接入真实后端后，不应继续展示缺接口支撑的在线人数或总消息数占位卡。');
}

if (/value=\{0\}/.test(statistics)) {
  failures.push('数据概览页不应使用 value={0} 硬编码统计值。');
}

if (statistics.includes('当前未接入后端统计接口')) {
  failures.push('已接入真实后端后，数据概览页不应继续展示未接入统计接口的占位说明。');
}

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('admin foundation verification passed');
