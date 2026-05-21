/**
 * 聊天消息类型枚举
 */
export enum ChatMessageTypeEnum {
  TEXT = 1,
  IMAGE = 2,
  FILE = 3,
  VOICE = 4,
  VIDEO = 5,
  STICKER = 6,
}

/**
 * 聊天消息类型枚举映射
 */
export const ChatMessageTypeEnumMap = {
  [ChatMessageTypeEnum.TEXT]: {
    text: '文本',
    status: 'Default',
  },
  [ChatMessageTypeEnum.IMAGE]: {
    text: '图片',
    status: 'Processing',
  },
  [ChatMessageTypeEnum.FILE]: {
    text: '文件',
    status: 'Success',
  },
  [ChatMessageTypeEnum.VOICE]: {
    text: '语音',
    status: 'Warning',
  },
  [ChatMessageTypeEnum.VIDEO]: {
    text: '视频',
    status: 'Warning',
  },
  [ChatMessageTypeEnum.STICKER]: {
    text: '表情',
    status: 'Processing',
  },
};
