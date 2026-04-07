// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取历史消息 获取指定房间的历史聊天记录（支持滚动翻页优化） GET /chat_message/history */
export async function listHistoryMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listHistoryMessagesParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatMessageVO>('/chat_message/history', {
    method: 'GET',
    params: {
      // limit has a default value: 20
      limit: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 上报消息已读 更新当前用户在该房间的已读消息 ID POST /chat_message/read */
export async function markMessageRead(
  body: API.ChatMessageReadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/chat_message/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送消息 向指定房间发送一条消息（支持文本、图片、文件） POST /chat_message/send */
export async function sendMessage(
  body: API.ChatMessageSendRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/chat_message/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
