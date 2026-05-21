// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建群聊 创建一个新的群聊并初始化成员 POST /chat/room/add */
export async function addChatRoom(body: API.ChatRoomAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatIdVO>('/chat/room/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取房间详情 获取群聊或私聊详情 GET /chat/room/detail */
export async function getRoomDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatRoomVO>('/chat/room/detail', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 解散群聊 群主解散指定群聊 POST /chat/room/dismiss */
export async function dismissRoom(body: API.ChatRoomIdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/dismiss', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邀请成员入群 邀请自己的好友加入指定群聊 POST /chat/room/invite */
export async function inviteMembers(
  body: API.ChatRoomInviteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 加入聊天室 当前 MVP 阶段不支持公开加入聊天室，成员进入需走受控路径 POST /chat/room/join */
export async function joinChatRoom(body: API.ChatRoomIdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户的聊天室列表 获取当前登录用户参与的所有聊天室 GET /chat/room/list/vo */
export async function listUserChatRooms(options?: { [key: string]: any }) {
  return request<API.BaseResponseListChatRoomVO>('/chat/room/list/vo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 任命群管理员 群主任命普通成员为管理员 POST /chat/room/member/admin/grant */
export async function grantAdmin(
  body: API.ChatRoomAdminRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/member/admin/grant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消群管理员 群主取消管理员角色 POST /chat/room/member/admin/revoke */
export async function revokeAdmin(
  body: API.ChatRoomAdminRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/member/admin/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取房间成员 获取指定房间的成员列表 GET /chat/room/member/list */
export async function listRoomMembers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRoomMembersParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatRoomMemberVO>('/chat/room/member/list', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 移除群成员 仅群主可移除普通群成员 POST /chat/room/member/remove */
export async function removeMember(
  body: API.ChatRoomMemberRemoveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/member/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取或创建私聊房间 获取与指定好友的唯一私聊房间，若不存在则初始化（UnionID 级别唯一） POST /chat/room/private */
export async function getOrCreatePrivateRoom(
  body: API.ChatPrivateRoomRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatIdVO>('/chat/room/private', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出群聊 当前用户退出指定群聊 POST /chat/room/quit */
export async function quitRoom(body: API.ChatRoomIdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/quit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新群聊资料 仅群主可更新群名称、头像和群公告 POST /chat/room/update */
export async function updateGroupProfile(
  body: API.ChatRoomUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
