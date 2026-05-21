import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Avatar, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { listUserChatRooms } from '@/services/chat/chatRoomController';
import { ChatRoomTypeEnum, ChatRoomTypeEnumMap } from '@/enums/ChatRoomTypeEnum';
import MembersDrawer from './components/MembersDrawer';
import MessageHistoryDrawer from './components/MessageHistoryDrawer';

/**
 * 群组管理列表
 * @constructor
 */
const GroupList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 抽屉状态管理
  const [membersDrawerVisible, setMembersDrawerVisible] = useState(false);
  const [messageDrawerVisible, setMessageDrawerVisible] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<number>();

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
      title: '群名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '群头像',
      dataIndex: 'avatar',
      valueType: 'image',
      hideInSearch: true,
      width: 80,
      render: (_, record) => <Avatar src={record.avatar}>{record.name?.[0]}</Avatar>,
    },
    {
      title: '房间类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: ChatRoomTypeEnumMap,
      width: 100,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            key="members"
            onClick={() => {
              setCurrentRoomId(record.id);
              setMembersDrawerVisible(true);
            }}
          >
            成员
          </Typography.Link>
          <Typography.Link
            key="messages"
            onClick={() => {
              setCurrentRoomId(record.id);
              setMessageDrawerVisible(true);
            }}
          >
            消息记录
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<API.ChatRoomVO>
        headerTitle="群组管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        request={async (params) => {
          const { data, code } = await listUserChatRooms();
          // 筛选群聊类型
          let list = (data || []).filter((item) => item.type === ChatRoomTypeEnum.GROUP);

          // 关键字搜索
          if (params?.name) {
            const keyword = String(params.name).toLowerCase();
            list = list.filter((item) => item.name?.toLowerCase().includes(keyword));
          }

          return {
            success: code === 0,
            data: list,
            total: list.length,
          };
        }}
        columns={columns}
        scroll={{ x: 'max-content' }}
      />

      <MembersDrawer
        roomId={currentRoomId}
        visible={membersDrawerVisible}
        onClose={() => {
          setMembersDrawerVisible(false);
          setCurrentRoomId(undefined);
        }}
      />

      <MessageHistoryDrawer
        roomId={currentRoomId}
        visible={messageDrawerVisible}
        onClose={() => {
          setMessageDrawerVisible(false);
          setCurrentRoomId(undefined);
        }}
      />
    </PageContainer>
  );
};

export default GroupList;
