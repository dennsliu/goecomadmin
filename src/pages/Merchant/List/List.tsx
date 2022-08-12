import { merchantsearch } from '@/services/ant-design-pro/libApi';
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
  const handlePageChange = (page) => {
    console.log('handlePageChange:', page);
    getMerchantList({
      keyword: '',
      status: 1,
      lastid: 0,
      ordertype: 'desc',
      page: page,
      pagesize: 10,
    } as API.MerchantSearchReq);
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
      pagesize: 10,
    } as API.MerchantSearchReq);
    console.log('pageChange---');
  };
  const columns: ProColumns<API.Merchant>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      name: 'Name',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: 'name过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
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
      createdat: '创建时间',
      key: 'createdat',
      dataIndex: 'createdat',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      editable: false,
    },
    {
      updatedat: '更新时间',
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
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
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
      cardBordered
      dataSource={allRows}
      editable={{
        type: 'multiple',
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
              //console.log(params);
              //form?.submit();

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
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
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
