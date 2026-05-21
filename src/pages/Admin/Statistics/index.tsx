import {
  BellOutlined,
  CommentOutlined,
  FileTextOutlined,
  GroupOutlined,
  RobotOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row, Statistic, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { listMyAiChatRecordVoByPage } from '@/services/ai/aiChatRecordController';
import { listUserChatRooms } from '@/services/chat/chatRoomController';
import { ChatRoomTypeEnum } from '@/enums/ChatRoomTypeEnum';
import { listLogByPage } from '@/services/log/operationLogController';
import {
  getNotificationUnreadCount,
  listNotificationByPage,
} from '@/services/notification/notificationController';
import { listUserByPage } from '@/services/user/userController';

type MetricKey =
  | 'totalUsers'
  | 'totalRooms'
  | 'totalGroups'
  | 'totalPrivateRooms'
  | 'unreadNotifications'
  | 'totalNotifications'
  | 'aiRecords'
  | 'operationLogs';

type MetricState = {
  value?: number;
  error?: boolean;
};

type StatsData = Record<MetricKey, MetricState>;

const emptyStats: StatsData = {
  totalUsers: {},
  totalRooms: {},
  totalGroups: {},
  totalPrivateRooms: {},
  unreadNotifications: {},
  totalNotifications: {},
  aiRecords: {},
  operationLogs: {},
};

const getTotal = (response?: { code?: number; data?: { total?: number } }) =>
  response?.code === 0 ? Number(response.data?.total) || 0 : undefined;

const metricValue = (metric: MetricState) => {
  if (metric.error) {
    return '-';
  }
  return metric.value ?? '-';
};

/**
 * 数据统计页面
 * @constructor
 */
const Statistics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>(emptyStats);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [userRes, roomRes, unreadRes, notificationRes, aiRes, operationLogRes] =
        await Promise.allSettled([
          listUserByPage({ current: 1, pageSize: 1 }),
          listUserChatRooms(),
          getNotificationUnreadCount(),
          listNotificationByPage({ current: 1, pageSize: 1 }),
          listMyAiChatRecordVoByPage({ current: 1, pageSize: 1 }),
          listLogByPage({ current: 1, pageSize: 1 }),
        ]);

      const rooms =
        roomRes.status === 'fulfilled' && roomRes.value.code === 0 ? roomRes.value.data || [] : [];

      setStats({
        totalUsers:
          userRes.status === 'fulfilled'
            ? { value: getTotal(userRes.value), error: userRes.value.code !== 0 }
            : { error: true },
        totalRooms:
          roomRes.status === 'fulfilled' && roomRes.value.code === 0
            ? { value: rooms.length }
            : { error: true },
        totalGroups:
          roomRes.status === 'fulfilled' && roomRes.value.code === 0
            ? { value: rooms.filter((r) => r.type === ChatRoomTypeEnum.GROUP).length }
            : { error: true },
        totalPrivateRooms:
          roomRes.status === 'fulfilled' && roomRes.value.code === 0
            ? { value: rooms.filter((r) => r.type === ChatRoomTypeEnum.PRIVATE).length }
            : { error: true },
        unreadNotifications:
          unreadRes.status === 'fulfilled' && unreadRes.value.code === 0
            ? { value: Number(unreadRes.value.data?.count) || 0 }
            : { error: true },
        totalNotifications:
          notificationRes.status === 'fulfilled'
            ? { value: getTotal(notificationRes.value), error: notificationRes.value.code !== 0 }
            : { error: true },
        aiRecords:
          aiRes.status === 'fulfilled'
            ? { value: getTotal(aiRes.value), error: aiRes.value.code !== 0 }
            : { error: true },
        operationLogs:
          operationLogRes.status === 'fulfilled'
            ? { value: getTotal(operationLogRes.value), error: operationLogRes.value.code !== 0 }
            : { error: true },
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const metrics = useMemo(
    () => [
      {
        key: 'totalUsers' as const,
        title: '总用户数',
        icon: <UserOutlined />,
        color: '#1677ff',
      },
      {
        key: 'totalRooms' as const,
        title: '聊天室总数',
        icon: <WechatOutlined />,
        color: '#52c41a',
      },
      {
        key: 'totalGroups' as const,
        title: '群聊数量',
        icon: <GroupOutlined />,
        color: '#722ed1',
      },
      {
        key: 'totalPrivateRooms' as const,
        title: '私聊数量',
        icon: <CommentOutlined />,
        color: '#fa8c16',
      },
      {
        key: 'unreadNotifications' as const,
        title: '未读通知',
        icon: <BellOutlined />,
        color: '#eb2f96',
      },
      {
        key: 'totalNotifications' as const,
        title: '通知总数',
        icon: <BellOutlined />,
        color: '#13c2c2',
      },
      {
        key: 'aiRecords' as const,
        title: 'AI 对话记录',
        icon: <RobotOutlined />,
        color: '#2f54eb',
      },
      {
        key: 'operationLogs' as const,
        title: '操作日志',
        icon: <FileTextOutlined />,
        color: '#a8071a',
      },
    ],
    [],
  );

  return (
    <PageContainer title={false}>
      <ProCard title="数据概览" bordered headerBordered loading={loading}>
        <Row gutter={[16, 16]}>
          {metrics.map((item) => {
            const metric = stats[item.key];
            return (
              <Col key={item.key} xs={24} sm={12} lg={6}>
                <ProCard bordered>
                  <Statistic
                    title={item.title}
                    value={metricValue(metric)}
                    prefix={item.icon}
                    valueStyle={{ color: item.color }}
                  />
                  {metric.error && (
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      当前接口暂不可用
                    </Typography.Text>
                  )}
                </ProCard>
              </Col>
            );
          })}
        </Row>
      </ProCard>
    </PageContainer>
  );
};

export default Statistics;
