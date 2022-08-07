declare namespace API {
  type GetTokenReply = {
    code: number;
    msg: string;
    accesstoken: string;
    accessexpire: number;
    refreshafter: number;
  };

  type GetTokenReq = true;

  type Merchant = {
    id: number;
    name: string;
    status: number;
    createdat: string;
    updatedat: string;
  };

  type MerchantAddReq = {
    name: string;
    status: number;
  };

  type MerchantDeleteReply = {
    code: number;
    msg: string;
    id: string;
  };

  type MerchantDeleteReq = {
    id: string;
  };

  type MerchantGetReq = {
    id: number;
  };

  type MerchantReply = {
    code: number;
    msg: string;
    id: number;
    name: string;
    status: number;
    createdat: string;
    updatedat: string;
  };

  type MerchantSearchReply = {
    code: number;
    msg: string;
    merchants: Merchant[];
    isend: boolean;
    lastval: number;
  };

  type MerchantSearchReq = {
    keyword: string;
    page: number;
    status: number;
    pagesize: number;
    orderby: string;
    ordertype: string;
  };

  type MerchantUpdateReq = {
    id: number;
    name: string;
    status: number;
  };

  type MerchantUser = {
    id: number;
    nickname: string;
    email: string;
    username: string;
    password: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
    status: number;
    createdat: string;
    updatedat: string;
  };

  type MerchantUserAddReq = {
    nickname: string;
    username: string;
    email: string;
    password: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
  };

  type MerchantUserDeleteReply = {
    code: number;
    msg: string;
    id: string;
  };

  type MerchantUserDeleteReq = {
    id: string;
  };

  type MerchantUserGetReq = {
    id: number;
  };

  type MerchantUserLoginReply = {
    code: number;
    msg: string;
    id: number;
    nickname: string;
    email: string;
    username: string;
    password: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
    status: number;
    createdat: string;
    updatedat: string;
    accesstoken: string;
    accessexpire: number;
    refreshafter: number;
  };

  type MerchantUserLoginReq = {
    username: string;
    password: string;
    type: number;
  };

  type MerchantUserReply = {
    code: number;
    msg: string;
    id: number;
    nickname: string;
    email: string;
    username: string;
    password: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
    status: number;
    createdat: string;
    updatedat: string;
  };

  type MerchantUserSearchReply = {
    code: number;
    msg: string;
    merchantusers: MerchantUser[];
    isend: boolean;
    lastval: number;
  };

  type MerchantUserSearchReq = {
    keyword: string;
    status: number;
    page: number;
    pagesize: number;
    orderby: string;
    ordertype: number;
  };

  type MerchantUserUpdateReq = {
    nickname: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
  };

  type Reply = {
    code: number;
    msg: string;
  };
}