import { languagessearch, merchantadd } from '@/services/ant-design-pro/libApi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, PageHeader } from 'antd';
import { useEffect, useRef, useState } from 'react';
const AddStore: React.FC = () => {
  const [languages, setLanguages] = useState<[]>([]);
  useEffect(() => {
    getLanguageList({
      keyword: '',
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 100,
    } as API.LanguagesSearchReq);
  }, []);
  const getLanguageList = async (values: API.LanguagesSearchReq) => {
    try {
      const result = await languagessearch({ ...values });
      if (result.code == 200) {
        let tmpAllRows = [];
        result.languages.map((language) => {
          tmpAllRows.push({ value: language.id, label: language.name });
        });
        setLanguages(tmpAllRows);
      }
    } catch (error) {}
  };
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
      <PageHeader className="site-page-header" onBack={() => null} title="添加店铺" />
      <ProForm.Group>
        <ProFormSelect
          width="xs"
          required={true}
          mode="multiple"
          placeholder={'Please choose languages'}
          initialValue={1}
          options={languages}
          name="languages"
          label="语言"
          rules={[{ required: true, message: '请选择语言' }]}
        />
      </ProForm.Group>

      <ProFormDependency name={['languages']}>
        {({ languages }) => {
          console.log(languages);
          if (languages.length > 0) {
            return (
              <div>
                {for(l=0;l<languages.length;l++) {
                  <div>
                    <h2>{languages[l]}</h2>
                    <ProForm.Group>
                      <ProFormText
                        width="md"
                        name="name"
                        required
                        label="店铺名"
                        tooltip="最长为 24 位"
                        placeholder="请输入商户名"
                        rules={[{ required: true, message: '请输入商户名' }]}
                      />
                    </ProForm.Group>
                  </div>
                }
              }
              </div>
            );
          } else {
            return null;
          }
        }}
      </ProFormDependency>

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
          initialValue={1}
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

export default AddStore;
