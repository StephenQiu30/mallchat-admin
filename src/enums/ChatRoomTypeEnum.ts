/**
 * 聊天室类型枚举
 */
export const ChatRoomTypeEnum = {
  GROUP: 1,
  PRIVATE: 2,
};

/**
 * 聊天室类型文本映射
 */
export const ChatRoomTypeEnumMap = {
  [ChatRoomTypeEnum.GROUP]: {
    text: '群聊',
    color: 'blue',
  },
  [ChatRoomTypeEnum.PRIVATE]: {
    text: '私聊',
    color: 'green',
  },
};
