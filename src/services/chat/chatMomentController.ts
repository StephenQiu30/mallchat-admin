// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 评论动态 评论自己可见的动态 POST /chat/moment/comment */
export async function commentMoment(
  body: API.ChatMomentCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatIdVO>('/chat/moment/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 动态评论列表 分页查询自己可见动态的一级评论 GET /chat/moment/comment/list */
export async function listComments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCommentsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatMomentCommentVO>('/chat/moment/comment/list', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 删除动态 删除自己的动态 DELETE /chat/moment/delete */
export async function deleteMoment(
  body: API.ChatMomentIdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/moment/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞动态 点赞自己可见的动态 POST /chat/moment/like */
export async function likeMoment(body: API.ChatMomentIdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/moment/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消点赞动态 取消点赞自己可见的动态 DELETE /chat/moment/like */
export async function unlikeMoment(
  body: API.ChatMomentIdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatOperationResultVO>('/chat/moment/like', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 动态列表 查询自己和好友可见动态 GET /chat/moment/list */
export async function listVisibleMoments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listVisibleMomentsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatMomentVO>('/chat/moment/list', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 公开动态广场 分页查询公开且审核通过的动态 GET /chat/moment/public/list */
export async function listPublicMoments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPublicMomentsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChatMomentVO>('/chat/moment/public/list', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** 发布动态 发布文字或图片动态 POST /chat/moment/publish */
export async function publish(
  body: API.ChatMomentPublishRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatIdVO>('/chat/moment/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
