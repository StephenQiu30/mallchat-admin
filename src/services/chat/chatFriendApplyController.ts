// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 申请好友 发起好友添加申请 POST /chat_friend_apply/add */
export async function applyFriend(
  body: API.ChatFriendApplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/chat_friend_apply/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核好友 同意或拒绝好友申请 POST /chat_friend_apply/approve */
export async function approveFriend(
  body: API.ChatFriendApproveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chat_friend_apply/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 好友申请列表 获取当前收到的好友申请记录 GET /chat_friend_apply/list/vo */
export async function listFriendApply(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFriendApplyParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatFriendApplyVO>('/chat_friend_apply/list/vo', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  });
}
