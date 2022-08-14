import {
  merchantuserdelete,
  merchantusersearch,
  merchantuserupdate,
} from '@/services/ant-design-pro/libApi';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, ConfigProvider } from 'antd';
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
const Users: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentRow, setCurrentRow] = useState<API.MerchantUser>();
  const [selectedRowsState, setSelectedRows] = useState<API.MerchantUser[]>([]);
  const [allRows, setAllRows] = useState<API.MerchantUser[]>([]);
  const [intl, setIntl] = useState('zhCNIntl');
  const actionRef = useRef<ActionType>();
  const getMerchantUserList = async (values: API.MerchantUserSearchReq) => {
    try {
      console.log(values);
      console.log('--------getMerchantUserList------');
      const result = await merchantusersearch({ ...values });
      console.log('getMerchantUserList result:');
      console.log(result);
      console.log('getMerchantUserList result code:');
      console.log(result.code);
      if (result.code == 200) {
        let tmpAllRows = [];
        result.merchantusers.map((merchantuser) => {
          tmpAllRows.push(merchantuser);
        });
        setAllRows(tmpAllRows);
        setCurrentPage(result.currentpage);
        setTotalPage(result.totalpage);
        setTotalCount(result.total);
        //return result.merchants;
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMerchantUserList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 10,
    } as API.MerchantSearchReq);
  }, []);
  const pageChange = (pagination: any, filters: any, sorter: any) => {
    const tmpCurrentPage = pagination.current;
    setCurrentPage(tmpCurrentPage);
    getMerchantList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: tmpCurrentPage,
      pagesize: pageSize,
    } as API.MerchantSearchReq);
    console.log('pageChange---');
  };
  const columns: ProColumns<API.MerchantUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 48,
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      copyable: true,
      ellipsis: true,
      tip: '商户名过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '呢称不能为空',
          },
        ],
      },
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
      <ProTable<API.MerchantUser>
        columns={columns}
        actionRef={actionRef}
        dataSource={allRows}
        editable={{
          type: 'single',
          onSave: function (key, record, originrow) {
            console.log(record);
            console.log(record.status);
            let status = Number(record.status);
            merchantuserupdate({
              id: record.id,
              nickname: record.nickname,
              mobliephone: mobliephone,
            } as API.MerchantUserUpdateReq).then((res) => {
              console.log(res);
              getMerchantUserList({
                keyword: '',
                status: 1,
                lastid: 0,
                ordertype: 'desc',
                page: currentPage,
                pagesize: pageSize,
              } as API.MerchantUserSearchReq);
            });
          },
          onDelete: function (key, record) {
            console.log(record);
            merchantuserdelete({ id: record.id } as API.MerchantUserDeleteReq).then((res) => {
              getMerchantUserList({
                keyword: '',
                status: 1,
                lastid: 0,
                ordertype: 'desc',
                page: currentPage,
                pagesize: pageSize,
              } as API.MerchantUserSearchReq);
            });
          },
        }}
        columnsState={{
          persistenceKey: 'merchantdemo',
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
                    getMerchantUserList({
                      keyword: name,
                      status: status,
                      lastid: 0,
                      ordertype: 'desc',
                      page: 1,
                      pagesize: 10,
                    } as API.MerchantUserSearchReq);
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
        headerTitle="商户管理员列表"
        loading={loading}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              history.replace({
                pathname: '/merchant/add',
              });
            }}
          >
            添加商户
          </Button>,
        ]}
      />
    </ConfigProvider>
  );
};

export default Users;
