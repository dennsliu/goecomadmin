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

/** 此处后端没有提供注释 POST /v1/lib/languages/add */
export async function languagesadd(body: API.LanguagesAddReq, options?: { [key: string]: any }) {
  return request<API.LanguagesReply>('/v1/lib/languages/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/languages/delete */
export async function languagesdelete(
  body: API.LanguagesDeleteReq,
  options?: { [key: string]: any },
) {
  return request<API.LanguagesDeleteReply>('/v1/lib/languages/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/languages/get */
export async function languagesget(body: API.LanguagesGetReq, options?: { [key: string]: any }) {
  return request<API.LanguagesReply>('/v1/lib/languages/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/languages/search */
export async function languagessearch(
  body: API.LanguagesSearchReq,
  options?: { [key: string]: any },
) {
  return request<API.LanguagesSearchReply>('/v1/lib/languages/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/languages/update */
export async function languagesupdate(
  body: API.LanguagesUpdateReq,
  options?: { [key: string]: any },
) {
  return request<API.LanguagesReply>('/v1/lib/languages/update', {
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

/** 此处后端没有提供注释 POST /v1/lib/store/add */
export async function storeadd(body: API.StoreAddReq, options?: { [key: string]: any }) {
  return request<API.StoreReply>('/v1/lib/store/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/store/delete */
export async function storedelete(body: API.StoreDeleteReq, options?: { [key: string]: any }) {
  return request<API.StoreDeleteReply>('/v1/lib/store/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/store/get */
export async function storeget(body: API.StoreGetReq, options?: { [key: string]: any }) {
  return request<API.StoreReply>('/v1/lib/store/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/store/search */
export async function storesearch(body: API.StoreSearchReq, options?: { [key: string]: any }) {
  return request<API.StoreSearchReply>('/v1/lib/store/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/lib/store/update */
export async function storeupdate(body: API.StoreUpdateReq, options?: { [key: string]: any }) {
  return request<API.StoreReply>('/v1/lib/store/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
