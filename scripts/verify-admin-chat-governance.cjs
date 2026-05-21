#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];

const expectIncludes = (source, text, message) => {
  if (!source.includes(text)) {
    failures.push(message);
  }
};

const expectNotIncludes = (source, text, message) => {
  if (source.includes(text)) {
    failures.push(message);
  }
};

const chatRoomList = read('src/pages/Admin/ChatRoomList/index.tsx');
const chatRoomDetailDrawer = exists(
  'src/pages/Admin/ChatRoomList/components/ChatRoomDetailDrawer.tsx',
)
  ? read('src/pages/Admin/ChatRoomList/components/ChatRoomDetailDrawer.tsx')
  : '';
const groupList = read('src/pages/Admin/GroupList/index.tsx');
const membersDrawer = read('src/pages/Admin/GroupList/components/MembersDrawer.tsx');
const messageHistoryDrawer = read('src/pages/Admin/GroupList/components/MessageHistoryDrawer.tsx');

if (!exists('src/pages/Admin/ChatRoomList/components/ChatRoomDetailDrawer.tsx')) {
  failures.push('聊天室列表应提供详情抽屉组件，不能继续用开发中占位。');
}

expectIncludes(
  chatRoomList,
  'PageContainer',
  '聊天室管理页应使用 PageContainer 对齐后台页面容器。',
);
expectIncludes(chatRoomList, 'ChatRoomDetailDrawer', '聊天室管理页应接入详情抽屉。');
expectNotIncludes(chatRoomList, '详情功能开发中', '聊天室详情不能继续提示开发中。');
expectIncludes(
  chatRoomDetailDrawer,
  'getRoomDetail',
  '聊天室详情抽屉应复用 generated chat room detail service。',
);

expectIncludes(groupList, 'PageContainer', '群组管理页应使用 PageContainer 对齐后台页面容器。');
expectNotIncludes(groupList, '(a as any)', '群组列表不应使用 any 字段访问做本地排序。');
expectNotIncludes(groupList, 'list.sort(', '群组列表不应展示后端不支持的本地排序假能力。');

expectIncludes(
  membersDrawer,
  'listRoomMembers',
  '群成员抽屉应复用 generated chat room member service。',
);
expectIncludes(membersDrawer, 'ChatRoomMemberRoleEnumMap', '群成员角色展示应复用枚举映射。');
expectNotIncludes(membersDrawer, 'listHistoryMessages', '群成员抽屉不应再通过消息历史推断成员。');
expectIncludes(
  messageHistoryDrawer,
  'listHistoryMessages',
  '消息记录抽屉应继续复用 generated chat message history service。',
);

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('admin chat governance verification passed');
