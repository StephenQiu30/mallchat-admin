/**
 * 群成员角色枚举
 */
export enum ChatRoomMemberRoleEnum {
  MEMBER = 1,
  ADMIN = 2,
  OWNER = 3,
}

/**
 * 群成员角色枚举映射
 */
export const ChatRoomMemberRoleEnumMap = {
  [ChatRoomMemberRoleEnum.MEMBER]: {
    text: '成员',
    status: 'Default',
  },
  [ChatRoomMemberRoleEnum.ADMIN]: {
    text: '管理员',
    status: 'Processing',
  },
  [ChatRoomMemberRoleEnum.OWNER]: {
    text: '群主',
    status: 'Success',
  },
};
