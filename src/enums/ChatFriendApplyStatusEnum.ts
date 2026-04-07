/**
 * 好友申请状态枚举
 */
export const ChatFriendApplyStatusEnum = {
  WAITING: 1,
  AGREETED: 2,
  IGNORED: 3,
};

/**
 * 好友申请状态文本映射
 */
export const ChatFriendApplyStatusEnumMap = {
  [ChatFriendApplyStatusEnum.WAITING]: {
    text: '待处理',
    status: 'Default',
  },
  [ChatFriendApplyStatusEnum.AGREETED]: {
    text: '已同意',
    status: 'Success',
  },
  [ChatFriendApplyStatusEnum.IGNORED]: {
    text: '已忽略',
    status: 'Error',
  },
};
