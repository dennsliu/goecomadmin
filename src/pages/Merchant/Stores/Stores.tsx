import { storesearch } from '@/services/ant-design-pro/libApi';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, ConfigProvider, Select } from 'antd';
import caESIntl from 'antd/lib/locale/ca_ES';
import enGBIntl from 'antd/lib/locale/en_GB';
import enUSIntl from 'antd/lib/locale/en_US';
import esESIntl from 'antd/lib/locale/es_ES';
import frFRIntl from 'antd/lib/locale/fr_FR';
import itITIntl from 'antd/lib/locale/it_IT';
import jaJPIntl from 'antd/lib/locale/ja_JP';
import msMYIntl from 'antd/lib/locale/ms_MY';
import ptBRIntl from 'antd/lib/locale/pt_BR';
import ruRUIntl from 'antd/lib/locale/ru_RU';
import srRSIntl from 'antd/lib/locale/sr_RS';
import viVNIntl from 'antd/lib/locale/vi_VN';
import zhCNIntl from 'antd/lib/locale/zh_CN';
import zhTWIntl from 'antd/lib/locale/zh_TW';
import React, { useEffect, useRef, useState } from 'react';
const intlMap = {
  zhCNIntl,
  enUSIntl,
  enGBIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  srRSIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
};
const List: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentRow, setCurrentRow] = useState<API.Merchant>();
  const [selectedRowsState, setSelectedRows] = useState<API.Merchant[]>([]);
  const [allRows, setAllRows] = useState<API.Merchant[]>([]);
  const [intl, setIntl] = useState('zhCNIntl');
  const actionRef = useRef<ActionType>();
  const getStoreList = async (values: API.StoreSearchReq) => {
    try {
      console.log(values);
      console.log('--------getStoreList------');
      const result = await storesearch({ ...values });
      console.log('storesearch result:');
      console.log(result);
      console.log('storesearch result code:');
      console.log(result.code);
      if (result.code == 200) {
        let tmpAllRows = [];
        result.stores.map((store) => {
          tmpAllRows.push(store);
        });
        setAllRows(tmpAllRows);
        setCurrentPage(result.currentpage);
        setTotalPage(result.totalpage);
        setTotalCount(result.total);
      }
    } catch (error) {}
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;

  useEffect(() => {
    getStoreList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 10,
    } as API.StoreSearchReq);
  }, []);

  const pageChange = (pagination: any, filters: any, sorter: any) => {
    const tmpCurrentPage = pagination.current;
    setCurrentPage(tmpCurrentPage);
    getStoreList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: tmpCurrentPage,
      pagesize: pageSize,
    } as API.StoreSearchReq);
    console.log('pageChange---');
  };
  const columns: ProColumns<API.Store>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 48,
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      initialValue: 1,
      valueEnum: {
        1: {
          text: 'Active',
          status: 'Success',
        },
        0: {
          text: 'Inactive',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      key: 'createdat',
      dataIndex: 'createdat',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '更新时间',
      key: 'updatedat',
      dataIndex: 'updatedat',
      valueType: 'dateTime',
      sorter: true,
      editable: false,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <ConfigProvider locale={intlMap[intl]}>
      <ProTable<API.Store>
        columns={columns}
        actionRef={actionRef}
        dataSource={allRows}
        columnsState={{
          persistenceKey: 'storedemo',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 100,
          span: 12,
          optionRender: ({ searchText, resetText }, { form }, dom) => [
            <Button
              key="searchText"
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((fieldsValue) => {
                    console.log(fieldsValue);
                    let name = '';
                    if (fieldsValue.name) {
                      name = fieldsValue.name;
                    }
                    let status = 1;
                    if (fieldsValue.status && fieldsValue.status == 0) {
                      status = 0;
                    }
                    setCurrentPage(1);
                    getStoreList({
                      keyword: '',
                      status: status,
                      lastid: 0,
                      ordertype: 'desc',
                      page: 1,
                      pagesize: 10,
                    } as API.StoreSearchReq);
                  })
                  .catch((errorInfo) => {
                    console.log(errorInfo);
                  });
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="resetText"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
        onChange={pageChange}
        pagination={{
          pageSize: pageSize,
          total: totalCount,
        }}
        dateFormatter="string"
        headerTitle="店铺列表"
        loading={loading}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              history.replace({
                pathname: '/merchant/addstore',
              });
            }}
          >
            添加店铺
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};

export default List;
