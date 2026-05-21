// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 直接添加好友 跳过申请直接与指定用户建立双向好友关系（通常用于系统加好友或测试） POST /chat/friend/add */
export async function addFriend(body: API.ChatFriendAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/friend/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 拉黑用户 拉黑指定用户并限制好友申请、私聊和动态可见性 POST /chat/friend/block */
export async function blockUser(
  body: API.ChatFriendBlockRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/friend/block', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 解除拉黑 解除对指定用户的拉黑 DELETE /chat/friend/block */
export async function unblockUser(
  body: API.ChatFriendUnblockRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/friend/block', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除好友 移除好友关系（双向） DELETE /chat/friend/delete */
export async function deleteFriend(
  body: API.ChatFriendDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/friend/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 我的好友列表 获取当前登录用户的所有好友基本信息（昵称、头像） GET /chat/friend/list/vo */
export async function listFriends(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFriendsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatFriendUserVO>('/chat/friend/list/vo', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 更新好友资料 更新好友备注和轻量分组 POST /chat/friend/profile/update */
export async function updateFriendProfile(
  body: API.ChatFriendProfileUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/friend/profile/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索候选用户 按昵称/简介搜索用户并返回与当前用户关系状态 GET /chat/friend/search */
export async function search(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatFriendUserVO>('/chat/friend/search', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}
