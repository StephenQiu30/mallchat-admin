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

const userList = read('src/pages/Admin/UserList/index.tsx');
const createUserModal = read('src/pages/Admin/UserList/components/CreateUserModal.tsx');
const updateUserModal = read('src/pages/Admin/UserList/components/UpdateUserModal.tsx');
const friendApplyList = read('src/pages/Admin/FriendApplyList/index.tsx');

expectIncludes(userList, 'PageContainer', '用户管理页应使用 PageContainer 对齐后台页面容器。');
expectIncludes(userList, 'updateUser', '用户管理页应使用 generated user service 执行封禁/解封。');
expectIncludes(userList, 'handleToggleBan', '用户管理页应提供封禁/解封操作闭环。');
expectIncludes(userList, 'UserRoleEnum.BAN', '封禁操作应使用项目用户角色枚举。');
expectIncludes(userList, 'UserRoleEnum.USER', '解封操作应恢复为普通用户枚举。');
expectIncludes(userList, 'UserRoleEnum.ADMIN', '用户封禁入口应保护管理员账号，避免管理员误封禁。');

expectIncludes(
  updateUserModal,
  'ProFormUploadDragger',
  '更新用户弹窗应保留头像上传入口，避免只能创建时上传头像。',
);
expectIncludes(updateUserModal, 'uploadFile', '更新用户头像应复用 generated file service。');
expectIncludes(
  createUserModal,
  'file as File',
  '创建用户头像上传应按 generated file service 的 file 参数传递文件。',
);
expectIncludes(
  updateUserModal,
  'file as File',
  '更新用户头像上传应按 generated file service 的 file 参数传递文件。',
);
expectIncludes(
  createUserModal,
  'const submitValues: API.UserAddRequest',
  '创建用户提交体应显式收敛为 generated UserAddRequest。',
);
expectIncludes(createUserModal, 'form.resetFields()', '新建用户弹窗应在打开或成功后重置表单状态。');
expectIncludes(
  createUserModal,
  'setUserAvatar(undefined)',
  '新建用户弹窗应重置头像状态，避免多次创建时串头像。',
);
expectIncludes(
  updateUserModal,
  'const submitValues: API.UserUpdateRequest',
  '更新用户提交体应显式收敛为 generated UserUpdateRequest。',
);

expectIncludes(
  friendApplyList,
  'PageContainer',
  '好友申请管理页应使用 PageContainer 对齐后台页面容器。',
);
expectIncludes(friendApplyList, 'sortField', '好友申请分页应映射 ProTable 排序字段。');
expectIncludes(friendApplyList, 'sortOrder', '好友申请分页应映射 ProTable 排序方向。');
expectIncludes(
  friendApplyList,
  'hideInSearch: true',
  '好友申请页不应展示后端查询 DTO 不支持的状态搜索项。',
);

if (friendApplyList.includes('as any')) {
  failures.push('好友申请页不应通过 as any 绕过 generated DTO 类型。');
}

if (friendApplyList.includes('sorter: true')) {
  failures.push('好友申请页后端未支持排序前，不应展示会误导用户的表格排序入口。');
}

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('admin user relation verification passed');
