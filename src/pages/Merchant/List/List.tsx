import { merchantdelete, merchantsearch, merchantupdate } from '@/services/ant-design-pro/libApi';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const List: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [currentRow, setCurrentRow] = useState<API.Merchant>();
  const [selectedRowsState, setSelectedRows] = useState<API.Merchant[]>([]);
  const [allRows, setAllRows] = useState<API.Merchant[]>([]);
  const actionRef = useRef<ActionType>();
  const getMerchantList = async (values: API.MerchantSearchReq) => {
    try {
      console.log(values);
      console.log('--------getMerchantList------');
      const result = await merchantsearch({ ...values });
      console.log('merchantSearch result:');
      console.log(result);
      console.log('merchantSearch result code:');
      console.log(result.code);
      if (result.code == 200) {
        let tmpAllRows = [];
        result.merchants.map((merchant) => {
          tmpAllRows.push(merchant);
        });
        setAllRows(tmpAllRows);
        setCurrentPage(result.currentpage);
        setTotalPage(result.totalpage);
        setTotalCount(result.total);
        //return result.merchants;
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
    getMerchantList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: 1,
      pagesize: 10,
    } as API.MerchantSearchReq);
  }, []);
  const onLineSave = (key) => {
    console.log(key);
    console.log('------onLineSave------');
  };
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
  const columns: ProColumns<API.Merchant>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 48,
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: '商户名过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '商户名不能为空',
          },
        ],
      },
    },
    {
      disable: true,
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
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <ProTable<API.Merchant>
      columns={columns}
      actionRef={actionRef}
      dataSource={allRows}
      editable={{
        type: 'single',
        onSave: function (key, record, originrow) {
          console.log(record);
          console.log(record.status);
          let status = Number(record.status);
          merchantupdate({
            id: record.id,
            name: record.name,
            status: status,
          } as API.MerchantUpdateReq).then((res) => {
            console.log(res);
            getMerchantList({
              keyword: '',
              status: 1,
              lastid: 0,
              ordertype: 'desc',
              page: currentPage,
              pagesize: pageSize,
            } as API.MerchantSearchReq);
          });
        },
        onDelete: function (key, record) {
          console.log(record);
          merchantdelete({ id: record.id } as API.MerchantDeleteReq).then((res) => {
            getMerchantList({
              keyword: '',
              status: 1,
              lastid: 0,
              ordertype: 'desc',
              page: currentPage,
              pagesize: pageSize,
            } as API.MerchantSearchReq);
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
                  getMerchantList({
                    keyword: name,
                    status: status,
                    lastid: 0,
                    ordertype: 'desc',
                    page: 1,
                    pagesize: 10,
                  } as API.MerchantSearchReq);
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
      headerTitle="商户列表"
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
  );
};

export default List;
