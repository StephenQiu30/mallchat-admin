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

const expectAllIncludes = (source, texts, message) => {
  const missing = texts.filter((text) => !source.includes(text));
  if (missing.length > 0) {
    failures.push(`${message} 缺失: ${missing.join(', ')}`);
  }
};

const messageHistoryDrawer = read('src/pages/Admin/GroupList/components/MessageHistoryDrawer.tsx');
const fileUploadRecord = read('src/pages/Admin/Log/FileUploadRecord/index.tsx');
const chatMessageTypeEnum = read('src/enums/ChatMessageTypeEnum.ts');
const fileUploadBizEnum = read('src/enums/FileUploadBizEnum.ts');

expectIncludes(chatMessageTypeEnum, 'ChatMessageTypeEnumMap', '聊天消息类型展示应沉淀为枚举映射。');
expectAllIncludes(
  chatMessageTypeEnum,
  ['TEXT = 1', 'IMAGE = 2', 'FILE = 3', 'VOICE = 4', 'VIDEO = 5', 'STICKER = 6'],
  '聊天消息类型枚举应对齐后端 ChatMessageTypeEnum。',
);
expectIncludes(
  messageHistoryDrawer,
  'ChatMessageTypeEnumMap',
  '群消息记录应复用消息类型枚举映射展示。',
);
expectIncludes(fileUploadBizEnum, 'FileUploadBizEnumMap', '文件上传业务类型展示应沉淀为枚举映射。');
expectAllIncludes(
  fileUploadBizEnum,
  ['user_avatar', 'chat_image', 'chat_file', 'chat_voice', 'chat_video'],
  '文件上传业务类型枚举应对齐后端 FileUploadBizEnum。',
);
expectIncludes(
  fileUploadRecord,
  'FileUploadBizEnumMap',
  '文件上传记录页应复用业务类型枚举映射展示。',
);

if (messageHistoryDrawer.includes('switch (type)')) {
  failures.push('群消息记录不应继续通过 switch 分散维护消息类型展示。');
}

if (fileUploadRecord.includes('[FileUploadBiz.')) {
  failures.push('文件上传记录页不应内联维护 FileUploadBiz 展示映射。');
}

if (fileUploadBizEnum.includes('post_cover') || fileUploadBizEnum.includes('post_image_cover')) {
  failures.push('文件上传业务类型不应保留当前后端未支持的 post_* 旧枚举。');
}

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log('admin enum display verification passed');
