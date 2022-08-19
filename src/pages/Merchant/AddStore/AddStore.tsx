import { languagessearch, merchantsearch, storeadd } from '@/services/ant-design-pro/libApi';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, PageHeader } from 'antd';
import { useEffect, useRef, useState } from 'react';
const AddStore: React.FC = () => {
  const [languages, setLanguages] = useState<[]>([]);
  const [languageObject, setLanguageObject] = useState<[]>([]);
  const [merchants, setMerchants] = useState<[]>([]);
  useEffect(() => {
    getLanguageList({
      keyword: '',
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 100,
    } as API.LanguagesSearchReq);
    getMerchantList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 100,
    } as API.MerchantSearchReq);
  }, []);
  const getLanguageList = async (values: API.LanguagesSearchReq) => {
    try {
      const result = await languagessearch({ ...values });
      if (result.code == 200) {
        let tmpAllRows = [];
        let tmpLanguageObject = {};
        result.languages.map((language) => {
          tmpAllRows.push({ value: language.id, label: language.name });
          tmpLanguageObject[language.id] = language.name;
        });
        setLanguages(tmpAllRows);
        setLanguageObject(tmpLanguageObject);
      }
    } catch (error) {}
  };
  const getMerchantList = async (values: API.MerchantSearchReq) => {
    try {
      const result = await merchantsearch({ ...values });
      if (result.code == 200) {
        let tmpAllRows = [];
        result.merchants.map((merchant) => {
          tmpAllRows.push({ value: merchant.id, label: merchant.name });
        });
        setMerchants(tmpAllRows);
        formRef.setFieldsValue({ merchantid: tmpAllRows[0].value });
      }
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      formRef.current?.validateFields();
      console.log('-----handleSubmit------');
      const languages = formRef?.current?.getFieldValue('languages');
      console.log('--------languages--------');
      console.log(languages);
      var tmpStoreLaguageArray = [];

      languages.map((language) => {
        console.log(language);
        console.log(formRef?.current?.getFieldValue('name[' + language + ']'));
        const tmpLanguageData = {
          name: formRef?.current?.getFieldValue('name[' + language + ']'),
          keyword: formRef?.current?.getFieldValue('keyword[' + language + ']'),
          description: formRef?.current?.getFieldValue('description[' + language + ']'),
          laguageid: language,
        };
        console.log(tmpLanguageData);
        tmpStoreLaguageArray[language] = tmpLanguageData;
      });
      let addData = {
        merchantid: formRef?.current?.getFieldValue('merchantid'),
        status: formRef?.current?.getFieldValue('status'),
        order: Number(formRef?.current?.getFieldValue('order')),
        storeLaguage: tmpStoreLaguageArray,
      } as API.StoreAddReq;
      console.log(addData);
      const result = await storeadd(addData);
      message.success('Added successfully');
      history.replace({
        pathname: '/merchant/stores',
      });
      return;
      // 登录
    } catch (error) {}
  };
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      status?: number;
      merchantid?: number;
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
          if (languages.length > 0) {
            return (
              <div>
                {languages.map((language) => (
                  <div>
                    <h2>[{languageObject[language]}]</h2>
                    <ProForm.Group>
                      <ProFormText
                        width="md"
                        name={'name[' + language + ']'}
                        required
                        label="店铺名"
                        tooltip="最长为 24 位"
                        placeholder="请输入店铺名"
                        rules={[{ required: true, message: '请输入店铺名' }]}
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        width="md"
                        name={'keyword[' + language + ']'}
                        required
                        label="关键词"
                        tooltip="最长为 24 位"
                        placeholder="请输入关键词"
                        rules={[{ required: true, message: '请输入关键词' }]}
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        width="md"
                        name={'description[' + language + ']'}
                        required
                        label="简述"
                        tooltip="最长为 24 位"
                        placeholder="请输入简述"
                        rules={[{ required: true, message: '请输入简述' }]}
                      />
                    </ProForm.Group>
                  </div>
                ))}
              </div>
            );
          } else {
            return null;
          }
        }}
      </ProFormDependency>
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
          label="状态"
          rules={[{ required: true, message: '请选择状态' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="xs"
          required={true}
          mode="single"
          placeholder={'Please choose merchant'}
          initialValue={1}
          options={merchants}
          name="merchantid"
          label="商户"
          rules={[{ required: true, message: '请选择商户' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="order"
          label="排序"
          tooltip="最长为 24 位"
          placeholder="请输入排序"
          initialValue={0}
          rules={[{ message: '请输入排序' }]}
          min={0}
        />
      </ProForm.Group>
    </ProForm>
  );
};

export default AddStore;
