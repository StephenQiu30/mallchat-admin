import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';

import { Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { UserRoleEnum, userRole } from '@/enums/UserRoleEnum';
import CreateUserModal from '@/pages/Admin/UserList/components/CreateUserModal';
import UpdateUserModal from '@/pages/Admin/UserList/components/UpdateUserModal';
import ViewUserModal from '@/pages/Admin/UserList/components/ViewUserModal';
import { deleteUser, listUserByPage, updateUser } from '@/services/user/userController';

/**
 * 用户管理列表
 * @constructor
 */
const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // Modal 状态管理
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);

  /**
   * 删除节点
   * @param row
   */
  const handleDelete = async (row: API.UserVO) => {
    if (!row?.id) return;
    const hide = message.loading('正在删除');
    try {
      const res = await deleteUser({ id: row.id });
      if (res.code === 0) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(`删除失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 批量删除节点
   * @param selectedRows
   */
  const handleBatchDelete = async (selectedRows: API.UserVO[]) => {
    if (!selectedRows?.length) return;
    const hide = message.loading('正在删除');
    try {
      const userIds = selectedRows.map((row) => row.id).filter((id): id is number => Boolean(id));
      const res = await Promise.all(userIds.map((id) => deleteUser({ id })));
      if (res.every((r) => r.code === 0)) {
        message.success('批量删除成功');
        actionRef.current?.reloadAndRest?.();
        setSelectedRows([]);
      } else {
        message.error('部分内容删除失败');
      }
    } catch (error: any) {
      message.error(`批量删除报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 封禁/解封用户
   * @param row
   * @param ban
   */
  const handleToggleBan = async (row: API.UserVO, ban: boolean) => {
    if (!row?.id) return;
    if (row.userRole === UserRoleEnum.ADMIN) {
      message.warning('管理员账号不支持封禁');
      return;
    }
    const hide = message.loading(ban ? '正在封禁' : '正在解封');
    try {
      const res = await updateUser({
        id: row.id,
        userRole: ban ? UserRoleEnum.BAN : UserRoleEnum.USER,
      });
      if (res.code === 0) {
        message.success(ban ? '封禁成功' : '解封成功');
        actionRef.current?.reload();
      } else {
        message.error(`${ban ? '封禁' : '解封'}失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`${ban ? '封禁' : '解封'}报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
      hideInTable: true,
      copyable: true,
      ellipsis: true,
      width: 140,
    },

    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: { width: 48 },
      hideInSearch: true,
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
      valueType: 'text',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'userPhone',
      valueType: 'text',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: userRole,
    },
    {
      title: '最后登录 IP',
      dataIndex: 'lastLoginIp',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      sorter: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <ViewUserModal user={record}>
            <Typography.Link key="view">详情</Typography.Link>
          </ViewUserModal>
          <Typography.Link
            key="update"
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleDelete(record)}
          >
            <Typography.Link key="delete" type="danger">
              删除
            </Typography.Link>
          </Popconfirm>
          {record.userRole === UserRoleEnum.ADMIN ? null : record.userRole === UserRoleEnum.BAN ? (
            <Popconfirm title="确定解封该用户？" onConfirm={() => handleToggleBan(record, false)}>
              <Typography.Link key="unban">解封</Typography.Link>
            </Popconfirm>
          ) : (
            <Popconfirm title="确定封禁该用户？" onConfirm={() => handleToggleBan(record, true)}>
              <Typography.Link key="ban" type="danger">
                封禁
              </Typography.Link>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<API.UserVO, API.UserQueryRequest>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';

          const { data, code } = await listUserByPage({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.UserQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={() => (
          <Space size={16}>
            <Popconfirm
              title="确定批量删除？"
              onConfirm={() => handleBatchDelete(selectedRowsState)}
            >
              <Typography.Link type="danger">批量删除</Typography.Link>
            </Popconfirm>
          </Space>
        )}
        scroll={{ x: 'max-content' }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
            </div>
          }
        >
          <Popconfirm
            title="确定批量删除？"
            description="删除后将无法恢复？"
            onConfirm={() => handleBatchDelete(selectedRowsState)}
          >
            <Button danger type="primary">
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}

      <CreateUserModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <UpdateUserModal
        visible={updateModalVisible}
        oldData={currentRow}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default UserList;
