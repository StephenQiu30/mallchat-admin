import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Space, Typography, message, Avatar, Tag } from 'antd';
import React, { useRef } from 'react';
import { listUserChatRooms } from '@/services/chat/chatRoomController';
import { ChatRoomTypeEnumMap } from '@/enums/ChatRoomTypeEnum';

/**
 * 聊天室管理列表
 * @constructor
 */
const ChatRoomList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  /**
   * 表格列定义
   */
  const columns: ProColumns<API.ChatRoomVO>[] = [
    {
      title: '房号',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
    },
    {
      title: '房间名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '房间头像',
      dataIndex: 'avatar',
      valueType: 'image',
      hideInSearch: true,
      width: 80,
      render: (text) => <Avatar src={text as string} />,
    },
    {
      title: '房间类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: ChatRoomTypeEnumMap,
      width: 100,
      render: (_, record) => {
        const type = ChatRoomTypeEnumMap[record.type as number];
        return type ? <Tag color={type.color}>{type.text}</Tag> : '-';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="view"
            onClick={() => {
              message.info('详情功能开发中');
            }}
          >
            详情
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.ChatRoomVO>
      headerTitle="聊天室管理"
      actionRef={actionRef}
      rowKey="id"
      search={{ labelWidth: 100 }}
      request={async () => {
        const { data, code } = await listUserChatRooms();
        return {
          success: code === 0,
          data: data || [],
          total: data?.length || 0,
        };
      }}
      columns={columns}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default ChatRoomList;
