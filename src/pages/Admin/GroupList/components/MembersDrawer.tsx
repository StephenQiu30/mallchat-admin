import { Avatar, Drawer, Empty, List, Spin, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChatRoomMemberRoleEnumMap } from '@/enums/ChatRoomMemberRoleEnum';
import { listRoomMembers } from '@/services/chat/chatRoomController';

interface Props {
  roomId?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 群成员抽屉
 */
const MembersDrawer: React.FC<Props> = ({ roomId, visible, onClose }) => {
  const [members, setMembers] = useState<API.ChatRoomMemberVO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !roomId) {
      setMembers([]);
      return;
    }

    const fetchMembers = async () => {
      setLoading(true);
      try {
        const res = await listRoomMembers({ request: { roomId } });
        setMembers(res.code === 0 && res.data ? res.data : []);
      } catch {
        setMembers([]);
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
                  title={
                    <span>
                      <Typography.Text>{item.userName || `用户${item.userId}`}</Typography.Text>
                      {item.role ? (
                        <Tag style={{ marginInlineStart: 8 }}>
                          {ChatRoomMemberRoleEnumMap[item.role]?.text || '未知角色'}
                        </Tag>
                      ) : null}
                    </span>
                  }
                  description={
                    <Typography.Text type="secondary">ID: {item.userId}</Typography.Text>
                  }
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
