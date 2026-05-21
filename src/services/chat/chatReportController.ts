// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 提交举报 举报用户、消息或动态 POST /chat/report/submit */
export async function submitReport(
  body: API.ChatReportSubmitRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChatIdVO>('/chat/report/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
