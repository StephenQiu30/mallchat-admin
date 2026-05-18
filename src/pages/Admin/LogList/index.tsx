import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tabs, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listLogByPage, deleteOperationLog } from '@/services/log/operationLogController';
import { listLogByPage2 } from '@/services/log/apiAccessLogController';
import { listLogByPage1 } from '@/services/log/userLoginLogController';
import { OperationStatusEnumMap } from '@/enums/OperationStatusEnum';
import { LoginStatusEnumMap } from '@/enums/LoginStatusEnum';
import { ApiAccessStatusEnumMap } from '@/enums/ApiAccessStatusEnum';

/**
 * 操作日志 Tab
 */
const OperationLogTab: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const handleDelete = async (record: API.OperationLogVO) => {
    if (!record?.id) return;
    const hide = message.loading('正在删除');
    try {
      await deleteOperationLog({ id: record.id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error: any) {
      message.error(`删除失败: ${error.message}`);
    } finally {
      hide();
    }
  };

  const columns: ProColumns<API.OperationLogVO>[] = [
    { title: '操作人ID', dataIndex: 'operatorId', width: 100, copyable: true },
    { title: '操作人', dataIndex: 'operatorName', width: 100 },
    { title: '模块', dataIndex: 'module', width: 100 },
    { title: '操作类型', dataIndex: 'action', width: 100 },
    { title: '请求路径', dataIndex: 'path', ellipsis: true, hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'success',
      width: 80,
      valueEnum: OperationStatusEnumMap,
    },
    { title: '客户端IP', dataIndex: 'clientIp', width: 130, hideInSearch: true },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 160,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record)}>
          <Typography.Link type="danger">删除</Typography.Link>
        </Popconfirm>
      ),
    },
  ];

  return (
    <ProTable<API.OperationLogVO>
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async (params, sort) => {
        const sortField = Object.keys(sort)?.[0] || 'createTime';
        const sortOrder = sort?.[sortField] ?? 'descend';
        const { data, code } = await listLogByPage({
          ...params,
          sortField,
          sortOrder,
        });
        return {
          success: code === 0,
          data: data?.records || [],
          total: Number(data?.total) || 0,
        };
      }}
      columns={columns}
      scroll={{ x: 1100 }}
    />
  );
};

/**
 * API 访问日志 Tab
 */
const ApiAccessLogTab: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ApiAccessLogVO>[] = [
    { title: '用户ID', dataIndex: 'userId', width: 80, copyable: true },
    { title: 'HTTP方法', dataIndex: 'method', width: 90 },
    { title: '请求路径', dataIndex: 'path', ellipsis: true },
    {
      title: '状态码',
      dataIndex: 'status',
      width: 80,
      valueEnum: ApiAccessStatusEnumMap,
    },
    { title: '耗时(ms)', dataIndex: 'latencyMs', width: 90, hideInSearch: true },
    { title: '客户端IP', dataIndex: 'clientIp', width: 130 },
    {
      title: '访问时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 160,
      sorter: true,
    },
  ];

  return (
    <ProTable<API.ApiAccessLogVO>
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async (params, sort) => {
        const sortField = Object.keys(sort)?.[0] || 'createTime';
        const sortOrder = sort?.[sortField] ?? 'descend';
        const { data, code } = await listLogByPage2({
          ...params,
          sortField,
          sortOrder,
        });
        return {
          success: code === 0,
          data: data?.records || [],
          total: Number(data?.total) || 0,
        };
      }}
      columns={columns}
      scroll={{ x: 1000 }}
    />
  );
};

/**
 * 登录日志 Tab
 */
const LoginLogTab: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.UserLoginLogVO>[] = [
    { title: '用户ID', dataIndex: 'userId', width: 80, copyable: true },
    { title: '登录账号', dataIndex: 'account', width: 140 },
    { title: '登录类型', dataIndex: 'loginType', width: 100 },
    {
      title: '登录状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: LoginStatusEnumMap,
    },
    { title: '客户端IP', dataIndex: 'clientIp', width: 130 },
    { title: '归属地', dataIndex: 'location', width: 120, hideInSearch: true },
    {
      title: '登录时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 160,
      sorter: true,
    },
  ];

  return (
    <ProTable<API.UserLoginLogVO>
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async (params, sort) => {
        const sortField = Object.keys(sort)?.[0] || 'createTime';
        const sortOrder = sort?.[sortField] ?? 'descend';
        const { data, code } = await listLogByPage1({
          ...params,
          sortField,
          sortOrder,
        });
        return {
          success: code === 0,
          data: data?.records || [],
          total: Number(data?.total) || 0,
        };
      }}
      columns={columns}
      scroll={{ x: 1000 }}
    />
  );
};

/**
 * 日志管理页面（统一入口）
 */
const LogList: React.FC = () => {
  return (
    <Tabs
      defaultActiveKey="operation"
      items={[
        { key: 'operation', label: '操作日志', children: <OperationLogTab /> },
        { key: 'api', label: 'API 访问日志', children: <ApiAccessLogTab /> },
        { key: 'login', label: '登录日志', children: <LoginLogTab /> },
      ]}
    />
  );
};

export default LogList;
