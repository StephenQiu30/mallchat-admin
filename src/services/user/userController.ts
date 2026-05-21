// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/add */
export async function addUser(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserIdVO>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/delete */
export async function deleteUser(body: API.UserIdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserOperationResultVO>('/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/edit */
export async function editUser(body: API.UserEditRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserOperationResultVO>('/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/get */
export async function getUserById(
  params: API.UserIdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登录用户 获取系统当前登录的用户信息 GET /user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/get/vo */
export async function getUserVoById(
  params: API.UserIdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/get/vo/batch */
export async function getUserVoByIds(
  params: API.UserIdsRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>('/user/get/vo/batch', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 是否管理员 返回当前登录用户是否为管理员 GET /user/is/admin */
export async function isAdmin(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserAdminStatusVO>('/user/is/admin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/list/page */
export async function listUserByPage(body: API.UserQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageUserVO>('/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/list/page/vo */
export async function listUserVoByPage(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱登录 通过邮箱验证码进行登录或注册 POST /user/login/email */
export async function userLoginByEmail(
  body: API.UserEmailLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/login/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 向指定邮箱发送 6 位验证码 POST /user/login/email/code */
export async function sendEmailCode(
  body: API.UserEmailCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserOperationResultVO>(
    '/user/login/email/code',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /user/login/wx/qrcode */
export async function getWxLoginQrCode(options?: { [key: string]: any }) {
  return request<API.BaseResponseWxLoginResponse>('/user/login/wx/qrcode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 检查微信登录状态 轮询检查微信扫码登录状态 GET /user/login/wx/status */
export async function checkWxLoginStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkWxLoginStatusParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO>('/user/login/wx/status', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注销 退出当前登录状态 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserOperationResultVO>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update */
export async function updateUser(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserOperationResultVO>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
