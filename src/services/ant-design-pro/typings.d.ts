declare namespace API {
  type GetTokenReply = {
    code: number;
    msg: string;
    accesstoken: string;
    accessexpire: number;
    refreshafter: number;
  };

  type GetTokenReq = true;

  type Languages = {
    id: number;
    name: string;
    code: string;
    image: string;
    directory: string;
    order: number;
    createdat: string;
    updatedat: string;
  };

  type LanguagesAddReq = {
    name: string;
    languagecode: string;
    image: string;
    directory: string;
    order: number;
  };

  type LanguagesDeleteReply = {
    code: number;
    msg: string;
    id: number;
  };

  type LanguagesDeleteReq = {
    id: number;
  };

  type LanguagesGetReq = {
    id: number;
  };

  type LanguagesReply = {
    code: number;
    msg: string;
    id: number;
    name: string;
    languagecode: string;
    image: string;
    directory: string;
    order: number;
    createdat: string;
    updatedat: string;
  };

  type LanguagesSearchReply = {
    code: number;
    msg: string;
    languages: Languages[];
    isend: boolean;
    lastval: number;
    total: number;
    currentpage: number;
    totalpage: number;
  };

  type LanguagesSearchReq = {
    keyword: string;
    page: number;
    pagesize: number;
    lastid: number;
    ordertype: string;
  };

  type LanguagesUpdateReq = {
    id: number;
    name: string;
    languagecode: string;
    image: string;
    directory: string;
    order: number;
  };

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
    id: number;
  };

  type MerchantDeleteReq = {
    id: number;
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
    total: number;
    currentpage: number;
    totalpage: number;
  };

  type MerchantSearchReq = {
    keyword: string;
    page: number;
    status: number;
    pagesize: number;
    lastid: number;
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
    id: number;
  };

  type MerchantUserDeleteReq = {
    id: number;
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
    total: number;
    currentpage: number;
    totalpage: number;
  };

  type MerchantUserSearchReq = {
    keyword: string;
    status: number;
    page: number;
    pagesize: number;
    lastid: number;
    ordertype: string;
  };

  type MerchantUserUpdateReq = {
    id: number;
    nickname: string;
    telephone: string;
    mobliephone: string;
    merchantid: number;
    status: number;
  };

  type Reply = {
    code: number;
    msg: string;
  };

  type Store = {
    id: number;
    merchantid: number;
    order: number;
    status: number;
    createdat: string;
    updatedat: string;
  };

  type StoreAddLaguageReq = {
    name: string;
    keyword: string;
    description: string;
    laguageid: number;
  };

  type StoreAddReq = {
    merchantid: number;
    order: number;
    status: number;
    storeLaguage: StoreAddLaguageReq[];
  };

  type StoreDeleteReply = {
    code: number;
    msg: string;
    id: number;
  };

  type StoreDeleteReq = {
    id: number;
  };

  type StoreGetReq = {
    id: number;
  };

  type StoreLaguage = {
    id: number;
    name: string;
    keyword: string;
    description: string;
    laguageid: number;
    createdat: string;
    updatedat: string;
  };

  type StoreReply = {
    code: number;
    msg: string;
    id: number;
    merchantid: number;
    order: number;
    createdat: string;
    updatedat: string;
  };

  type StoreSearchReply = {
    code: number;
    msg: string;
    stores: Store[];
    isend: boolean;
    lastval: number;
    total: number;
    currentpage: number;
    totalpage: number;
  };

  type StoreSearchReq = {
    keyword: string;
    page: number;
    status: number;
    pagesize: number;
    lastid: number;
    ordertype: string;
  };

  type StoreUpdateReq = {
    id: number;
    order: number;
    status: number;
    storeLaguage: StoreLaguage[];
  };

  type Total = {
    total: number;
  };
}
