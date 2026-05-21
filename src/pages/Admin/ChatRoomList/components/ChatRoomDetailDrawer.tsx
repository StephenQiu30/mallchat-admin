import { ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Drawer, Empty, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChatRoomTypeEnumMap } from '@/enums/ChatRoomTypeEnum';
import { getRoomDetail } from '@/services/chat/chatRoomController';

interface Props {
  roomId?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 聊天室详情抽屉
 */
const ChatRoomDetailDrawer: React.FC<Props> = ({ roomId, visible, onClose }) => {
  const [room, setRoom] = useState<API.ChatRoomVO>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !roomId) {
      setRoom(undefined);
      return;
    }

    const fetchRoomDetail = async () => {
      setLoading(true);
      try {
        const res = await getRoomDetail({ request: { roomId } });
        setRoom(res.code === 0 ? res.data : undefined);
      } catch {
        setRoom(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [visible, roomId]);

  return (
    <Drawer title="聊天室详情" open={visible} onClose={onClose} width={520} destroyOnClose>
      <Spin spinning={loading}>
        {room ? (
          <>
            <ProDescriptions<API.ChatRoomVO>
              column={1}
              dataSource={room}
              columns={[
                { title: '房间ID', dataIndex: 'id', copyable: true },
                { title: '房间名称', dataIndex: 'name' },
                {
                  title: '房间头像',
                  dataIndex: 'avatar',
                  render: (_, record) => <Avatar src={record.avatar}>{record.name?.[0]}</Avatar>,
                },
                {
                  title: '房间类型',
                  dataIndex: 'type',
                  valueEnum: ChatRoomTypeEnumMap,
                },
                { title: '房间拥有者ID', dataIndex: 'ownerUserId', copyable: true },
                { title: '成员数量', dataIndex: 'memberCount' },
                {
                  title: '群公告',
                  dataIndex: 'announcement',
                  render: (text) => (
                    <Typography.Paragraph style={{ marginBottom: 0 }}>
                      {text || '暂无公告'}
                    </Typography.Paragraph>
                  ),
                },
                { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
              ]}
            />
            <Typography.Text type="secondary">
              当前详情仅展示后端已提供的房间基础信息。
            </Typography.Text>
          </>
        ) : (
          <Empty description={loading ? '加载中...' : '暂无聊天室详情'} />
        )}
      </Spin>
    </Drawer>
  );
};

export default ChatRoomDetailDrawer;
