import { Avatar, Button, Drawer, List, Spin, Tag, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ChatMessageTypeEnum, ChatMessageTypeEnumMap } from '@/enums/ChatMessageTypeEnum';
import { listHistoryMessages } from '@/services/chat/chatMessageController';

interface Props {
  roomId?: number;
  visible: boolean;
  onClose: () => void;
}

const PAGE_SIZE = 50;

/**
 * 群消息记录抽屉
 */
const MessageHistoryDrawer: React.FC<Props> = ({ roomId, visible, onClose }) => {
  const [messages, setMessages] = useState<API.ChatMessageVO[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMessages = useCallback(
    async (lastMessageId?: number) => {
      if (!roomId) return;
      setLoading(true);
      try {
        const res = await listHistoryMessages({
          request: {
            roomId,
            lastMessageId,
            limit: PAGE_SIZE,
          },
        });
        if (res.code === 0 && res.data) {
          const list = res.data as API.ChatMessageVO[];
          setMessages((prev) => (lastMessageId ? [...prev, ...list] : list));
          setHasMore(list.length >= PAGE_SIZE);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    [roomId],
  );

  useEffect(() => {
    if (!visible || !roomId) {
      setMessages([]);
      setHasMore(true);
      return;
    }
    fetchMessages();
  }, [visible, roomId, fetchMessages]);

  const handleLoadMore = () => {
    if (messages.length > 0) {
      const lastId = messages[messages.length - 1]?.id;
      fetchMessages(lastId);
    }
  };

  return (
    <Drawer title="群消息记录" open={visible} onClose={onClose} width={520} destroyOnClose>
      <Spin spinning={loading && messages.length === 0}>
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.fromUserAvatar}>{item.fromUserName?.[0]}</Avatar>}
                title={
                  <Typography.Text>{item.fromUserName || `用户${item.fromUserId}`}</Typography.Text>
                }
                description={
                  <div>
                    <div style={{ wordBreak: 'break-all' }}>
                      {item.type && item.type !== ChatMessageTypeEnum.TEXT ? (
                        <Tag>
                          {ChatMessageTypeEnumMap[item.type as ChatMessageTypeEnum]?.text ||
                            '未知类型'}
                        </Tag>
                      ) : null}
                      {item.content}
                    </div>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {item.createTime}
                    </Typography.Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {hasMore && messages.length > 0 && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <Button type="link" loading={loading} onClick={handleLoadMore}>
              加载更多
            </Button>
          </div>
        )}
        {!hasMore && messages.length > 0 && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <Typography.Text type="secondary">没有更多消息了</Typography.Text>
          </div>
        )}
        {!loading && messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Typography.Text type="secondary">暂无消息记录</Typography.Text>
          </div>
        )}
      </Spin>
    </Drawer>
  );
};

export default MessageHistoryDrawer;
