// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 转发单条消息 将当前用户可见的单条正常消息转发到目标房间 POST /chat/message/forward */
export async function forwardMessage(
  body: API.ChatMessageForwardRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatMessageVO>('/chat/message/forward', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取游标后的新消息 获取指定房间中客户端最后收到消息之后的新消息，用于重连补偿 GET /chat/message/list/after/vo */
export async function listMessagesAfter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listMessagesAfterParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatMessageVO>('/chat/message/list/after/vo', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 获取历史消息 获取指定房间的历史聊天记录（支持滚动翻页优化） GET /chat/message/list/history/vo */
export async function listHistoryMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listHistoryMessagesParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListChatMessageVO>('/chat/message/list/history/vo', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 上报消息已读 更新当前用户在该房间的已读消息 ID POST /chat/message/read */
export async function markMessageRead(
  body: API.ChatMessageReadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/message/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取消息已读统计 发送者查询单条消息的聚合已读/未读人数 GET /chat/message/read/status */
export async function getMessageReadStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMessageReadStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatMessageReadStatusVO>('/chat/message/read/status', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 撤回消息 撤回指定消息（限时 2 分钟内） POST /chat/message/recall */
export async function recallMessage(
  body: API.ChatMessageRecallRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/message/recall', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索文本消息 在指定房间内按关键词搜索文本消息 GET /chat/message/search/vo */
export async function searchMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchMessagesParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatMessageVO>('/chat/message/search/vo', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 发送消息 向指定房间发送一条消息（支持文本、图片、文件、语音、视频、表情） POST /chat/message/send */
export async function sendMessage(
  body: API.ChatMessageSendRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatMessageVO>('/chat/message/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
