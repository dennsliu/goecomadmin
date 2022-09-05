import { merchantsearch, merchantuseradd } from '@/services/ant-design-pro/libApi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, PageHeader } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './AddUser.less';

const AddUser: React.FC = () => {
  const [merchants, setMerchants] = useState<[]>([]);
  useEffect(() => {
    getMerchantList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 100,
    } as API.MerchantSearchReq);
  }, []);

  const getMerchantList = async (values: API.MerchantSearchReq) => {
    try {
      const result = await merchantsearch({ ...values });
      if (result.code == 200) {
        let tmpAllRows = [];
        result.merchants.map((merchant) => {
          tmpAllRows.push({ value: merchant.id, label: merchant.name });
        });
        setMerchants(tmpAllRows);
      }
    } catch (error) {}
  };

  const handleSubmit = async (values: API.MerchantAddReq) => {
    try {
      formRef.current?.validateFields();
      console.log('-----handleSubmit------');
      let addData = {
        nickname: formRef?.current?.getFieldValue('nickname'),
        username: formRef?.current?.getFieldValue('username'),
        email: formRef?.current?.getFieldValue('email'),
        password: formRef?.current?.getFieldValue('password'),
        telephone: '' + formRef?.current?.getFieldValue('telephone'),
        mobliephone: '' + formRef?.current?.getFieldValue('mobliephone'),
        merchantid: formRef?.current?.getFieldValue('merchantid'),
      } as API.MerchantUserAddReq;
      const result = await merchantuseradd(addData);
      message.success('Added merchant user successfully');
      history.replace({
        pathname: '/merchant/users',
      });
      return;
      // 登录
    } catch (error) {}
  };
  const formRef = useRef<
    ProFormInstance<{
      username: string;
      status?: number;
    }>
  >();
  return (
    <div className={styles.container}>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        autoFocusFirstInput={true}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type="primary" htmlType="button" onClick={handleSubmit} key="submit">
                保存
              </Button>,
            ];
          },
        }}
      >
        <PageHeader className="site-page-header" onBack={() => null} title="添加商户管理员" />
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nickname"
            required
            label="昵称"
            tooltip="最长为 100 个字符"
            placeholder="请输入昵称"
            rules={[{ required: true, message: '请输入昵称,最长度为100个字符', max: 100 }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            required
            label="用户名"
            tooltip="最长为 100 个字符"
            placeholder="请输入用户名"
            rules={[{ required: true, message: '请输入用户名,最长度为100个字符', max: 100 }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="email"
            required
            label="邮箱"
            tooltip="最长为 100 个字符"
            placeholder="请输入邮箱"
            rules={[{ required: true, message: '请输入邮箱,最长度为100个字符', max: 100 }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            width="md"
            name="password"
            required
            label="密码"
            tooltip="最长为 11 个字符"
            placeholder="请输入密码"
            rules={[{ required: true, message: '请输入密码,最长度为11个字符' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="telephone"
            label="固话"
            tooltip="最长为 100 个字符"
            placeholder="请输入固话"
            rules={[{ required: false, message: '请输入固话' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="md"
            name="mobliephone"
            label="手机号"
            tooltip="最长为 100 个字符"
            placeholder="请输入手机号"
            rules={[{ required: false, message: '请输入手机号,最长度为100个字符' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="xs"
            required={true}
            mode="single"
            placeholder={'请选择商户'}
            initialValue={1}
            options={merchants}
            name="merchantid"
            label="商户"
            rules={[{ required: true, message: '请选择商户' }]}
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default AddUser;
