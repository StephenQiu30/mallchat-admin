// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 提交入群申请 当前用户申请加入指定群聊 POST /chat/room/join/apply/add */
export async function applyJoinRoom(
  body: API.ChatRoomJoinApplyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatIdVO>('/chat/room/join/apply/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核入群申请 群主或管理员审核入群申请 POST /chat/room/join/apply/approve */
export async function approveJoinRoom(
  body: API.ChatRoomJoinApproveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/room/join/apply/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询入群申请 群主或管理员查询指定群聊的入群申请 POST /chat/room/join/apply/list/page/vo */
export async function listRoomJoinApplyPage(
  body: API.ChatRoomJoinApplyQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatRoomJoinApplyVO>('/chat/room/join/apply/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
