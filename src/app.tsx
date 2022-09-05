import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.MerchantUserLoginReply;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.MerchantUserLoginReply | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      let userString = localStorage.getItem('currentUser');
      if (userString) {
        let userData = JSON.parse(userString);
        return userData;
      } else {
        history.push(loginPath);
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    let currentUser;
    let userString = localStorage.getItem('currentUser');
    if (userString) {
      currentUser = JSON.parse(userString);
      const nowDate = parseInt((new Date().getTime() / 1000).toString());
      if (nowDate > parseInt(currentUser.refreshafter)) {
        localStorage.removeItem('currentUser');
        history.push(loginPath);
      }
    } else {
      history.push(loginPath);
    }
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {},
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      console.log(history);
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
