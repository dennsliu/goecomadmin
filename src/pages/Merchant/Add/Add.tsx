import { merchantadd } from '@/services/ant-design-pro/libApi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message } from 'antd';
import { useRef } from 'react';
const Add: React.FC = () => {
  const handleSubmit = async (values: API.MerchantAddReq) => {
    try {
      formRef.current?.validateFields();
      console.log('-----handleSubmit------');
      let addData = {
        name: formRef?.current?.getFieldValue('name'),
        status: formRef?.current?.getFieldValue('status'),
      } as API.MerchantAddReq;
      const result = await merchantadd(addData);
      message.success('Added successfully');
      history.replace({
        pathname: '/merchant/list',
      });
      return;
      // 登录
    } catch (error) {}
  };
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      status?: number;
    }>
  >();
  return (
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
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          required
          label="商户名"
          tooltip="最长为 24 位"
          placeholder="请输入商户名"
          rules={[{ required: true, message: '请输入商户名' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="xs"
          required={true}
          mode="single"
          placeholder={'Please choose merchant status'}
          options={[
            {
              value: 1,
              label: 'Active',
            },
            {
              value: 0,
              label: 'Inactive',
            },
          ]}
          name="status"
          label="Status"
          rules={[{ required: true, message: '请选择状态' }]}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default Add;
