import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Typography, message, Avatar, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { approveFriend, listFriendApply } from '@/services/chat/chatFriendApplyController';
import {
  ChatFriendApplyStatusEnumMap,
  ChatFriendApplyStatusEnum,
} from '@/enums/ChatFriendApplyStatusEnum';

/**
 * 好友申请管理列表
 * @constructor
 */
const FriendApplyList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 审核申请
   * @param record
   * @param status
   */
  const handleApprove = async (record: API.ChatFriendApplyVO, status: number) => {
    if (!record.id) return;
    const hide = message.loading('正在处理');
    try {
      const res = await approveFriend({
        applyId: record.id,
        status,
      });
      if (res.code === 0) {
        message.success('处理成功');
        actionRef.current?.reload();
      } else {
        message.error(`处理失败: ${res.message}`);
      }
    } catch (error: any) {
      message.error(`处理报错: ${error.message}`);
    } finally {
      hide();
    }
  };

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.ChatFriendApplyVO>[] = [
    {
      title: '申请ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '申请人',
      dataIndex: 'userName',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      hideInSearch: true,
      width: 80,
      render: (text) => <Avatar src={text as string} />,
    },
    {
      title: '申请内容',
      dataIndex: 'msg',
      valueType: 'text',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: ChatFriendApplyStatusEnumMap,
      hideInSearch: true,
      width: 100,
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          {record.status === ChatFriendApplyStatusEnum.WAITING && (
            <>
              <Popconfirm
                title="确定同意？"
                onConfirm={() => handleApprove(record, ChatFriendApplyStatusEnum.AGREETED)}
              >
                <Typography.Link key="approve">同意</Typography.Link>
              </Popconfirm>
              <Popconfirm
                title="确定忽略？"
                onConfirm={() => handleApprove(record, ChatFriendApplyStatusEnum.IGNORED)}
              >
                <Typography.Link key="ignore" type="danger">
                  忽略
                </Typography.Link>
              </Popconfirm>
            </>
          )}
          {record.status !== ChatFriendApplyStatusEnum.WAITING && <span>-</span>}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<API.ChatFriendApplyVO, API.ChatFriendApplyQueryRequest>
        headerTitle="好友申请管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params, sort) => {
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] ?? 'descend';
          const { data, code } = await listFriendApply({
            current: params.current,
            pageSize: params.pageSize,
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
        scroll={{ x: 'max-content' }}
      />
    </PageContainer>
  );
};

export default FriendApplyList;
