// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /v1/lib/gettoken */
export async function gettoken(body: API.GetTokenReq, options?: { [key: string]: any }) {
  return request<API.GetTokenReply>('/v1/lib/gettoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/add */
export async function merchantadd(body: API.MerchantAddReq, options?: { [key: string]: any }) {
  return request<API.MerchantReply>('/v1/lib/merchant/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/delete */
export async function merchantdelete(
  body: API.MerchantDeleteReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantDeleteReply>('/v1/lib/merchant/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/get */
export async function merchantget(body: API.MerchantGetReq, options?: { [key: string]: any }) {
  return request<API.MerchantReply>('/v1/lib/merchant/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/search */
export async function merchantsearch(
  body: API.MerchantSearchReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantSearchReply>('/v1/lib/merchant/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/update */
export async function merchantupdate(
  body: API.MerchantUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantReply>('/v1/lib/merchant/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/add */
export async function merchantuseradd(
  body: API.MerchantUserAddReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserReply>('/v1/lib/merchant/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/delete */
export async function merchantuserdelete(
  body: API.MerchantUserDeleteReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserDeleteReply>('/v1/lib/merchant/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/get */
export async function merchantuserget(
  body: API.MerchantUserGetReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserReply>('/v1/lib/merchant/user/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/login */
export async function merchantuserlogin(
  body: API.MerchantUserLoginReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserLoginReply>('/v1/lib/merchant/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/search */
export async function merchantusersearch(
  body: API.MerchantSearchReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserSearchReply>('/v1/lib/merchant/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/merchant/user/update */
export async function merchantuserupdate(
  body: API.MerchantUserUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.MerchantUserReply>('/v1/lib/merchant/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
