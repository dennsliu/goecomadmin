import { languagesadd } from '@/services/ant-design-pro/libApi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, PageHeader } from 'antd';
import { useRef } from 'react';
const AddLanguage: React.FC = () => {
  const handleSubmit = async (values: API.MerchantAddReq) => {
    try {
      formRef.current?.validateFields();
      console.log('-----handleSubmit------');
      let addData = {
        name: formRef?.current?.getFieldValue('name'),
        languagecode: formRef?.current?.getFieldValue('languagecode'),
        image: formRef?.current?.getFieldValue('image'),
        directory: formRef?.current?.getFieldValue('directory'),
        order: parseInt(formRef?.current?.getFieldValue('order')),
      } as API.LanguagesAddReq;
      const result = await languagesadd(addData);
      message.success('Added successfully');
      history.replace({
        pathname: '/merchant/languages',
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
      <PageHeader className="site-page-header" onBack={() => null} title="添加系统语言" />
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          required
          label="语言名"
          tooltip="最长为 24 位"
          placeholder="请输入语言名"
          rules={[{ required: true, message: '请输入语言名' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="languagecode"
          required
          label="语言码"
          tooltip="最长为 24 位"
          placeholder="请输入语言码"
          rules={[{ required: true, message: '请输入语言码' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="directory"
          required
          label="语言目录"
          tooltip="最长为 24 位"
          placeholder="请输入语言目录"
          rules={[{ required: true, message: '请输入语言目录' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="image"
          required
          label="图片"
          tooltip="最长为 24 位"
          placeholder="请输入图片"
          rules={[{ required: true, message: '请输入图片' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="order"
          required
          label="排序"
          tooltip="最长为 24 位"
          placeholder="请输入排序"
          rules={[{ required: true, message: '请输入排序' }]}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default AddLanguage;
