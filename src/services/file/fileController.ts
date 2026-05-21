// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文件 上传文件到腾讯云 COS，支持用户头像、聊天图片、聊天文件、聊天语音、聊天视频等业务类型 POST /file/upload */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseFileVO>('/file/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
