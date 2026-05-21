import { Avatar, Drawer, List, Spin, Typography, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { listHistoryMessages } from '@/services/chat/chatMessageController';

interface Props {
  roomId?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 群成员抽屉（基于消息记录提取活跃成员）
 * 注：后端暂无群成员列表接口，使用消息历史中的发送者作为近似数据
 */
const MembersDrawer: React.FC<Props> = ({ roomId, visible, onClose }) => {
  const [members, setMembers] = useState<
    { userId: number; userName: string; userAvatar: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !roomId) {
      setMembers([]);
      return;
    }

    const fetchMembers = async () => {
      setLoading(true);
      try {
        const res = await listHistoryMessages({ request: { roomId, limit: 200 } });
        if (res.code === 0 && res.data) {
          const memberMap = new Map<
            number,
            { userId: number; userName: string; userAvatar: string }
          >();
          (res.data as API.ChatMessageVO[]).forEach((msg) => {
            if (msg.fromUserId && !memberMap.has(msg.fromUserId)) {
              memberMap.set(msg.fromUserId, {
                userId: msg.fromUserId,
                userName: msg.fromUserName || `用户${msg.fromUserId}`,
                userAvatar: msg.fromUserAvatar || '',
              });
            }
          });
          setMembers(Array.from(memberMap.values()));
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [visible, roomId]);

  return (
    <Drawer title="群成员" open={visible} onClose={onClose} width={400} destroyOnClose>
      <Spin spinning={loading}>
        {members.length > 0 ? (
          <List
            dataSource={members}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.userAvatar}>{item.userName?.[0]}</Avatar>}
                  title={<Typography.Text>{item.userName}</Typography.Text>}
                  description={<Typography.Text type="secondary">ID: {item.userId}</Typography.Text>}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description={loading ? '加载中...' : '暂无成员数据'} />
        )}
      </Spin>
    </Drawer>
  );
};

export default MembersDrawer;
