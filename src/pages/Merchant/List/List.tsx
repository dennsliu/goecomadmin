import { merchantsearch } from '@/services/ant-design-pro/libApi';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Select } from 'antd';
import React, { useRef, useState } from 'react';
const List: React.FC = () => {
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
        let tmpAllRows = allRows;
        result.merchants.map((merchant) => {
          tmpAllRows.push(merchant);
        });
        setAllRows(tmpAllRows);
        return result.merchants;
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

  getMerchantList({
    keyword: '',
    status: 1,
    orderby: 'id',
    ordertype: 'desc',
    page: 1,
    pagesize: 10,
    lastval: 0,
  } as API.MerchantSearchReq);
  const columns: ProColumns<GithubIssueItem>[] = [
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
        '': { text: '全部' },
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
    },
    {
      updatedat: '创建时间',
      key: 'updatedat',
      dataIndex: 'updatedat',
      valueType: 'dateTime',
      sorter: true,
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
        labelWidth: 'auto',
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
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
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
