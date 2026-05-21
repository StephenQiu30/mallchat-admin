// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除会话 在列表中移除选中的会话 POST /chat/session/delete */
export async function deleteSession(
  body: API.ChatSessionDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/session/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户消息列表 获取当前登录用户的所有消息会话列表（包含未读数、最后一条消息概览） GET /chat/session/list/vo */
export async function listMySessions(options?: { [key: string]: any }) {
  return request<API.BaseResponseListChatSessionVO>('/chat/session/list/vo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 会话免打扰 修改指定会话的免打扰状态 POST /chat/session/mute */
export async function muteSession(
  body: API.ChatSessionMuteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/session/mute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 置顶会话 修改会话置顶状态 POST /chat/session/top */
export async function topSession(
  body: API.ChatSessionTopRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/session/top', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
