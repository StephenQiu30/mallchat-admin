import {
  TeamOutlined,
  UserOutlined,
  CommentOutlined,
  GroupOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { listUserByPage } from '@/services/user/userController';
import { listUserChatRooms } from '@/services/chat/chatRoomController';
import { ChatRoomTypeEnum } from '@/enums/ChatRoomTypeEnum';

const { Title } = Typography;

interface StatsData {
  totalUsers: number;
  totalRooms: number;
  totalGroups: number;
  totalPrivateRooms: number;
}

/**
 * 数据统计页面
 * @constructor
 */
const Statistics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalRooms: 0,
    totalGroups: 0,
    totalPrivateRooms: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [userRes, roomRes] = await Promise.all([
          listUserByPage({ current: 1, pageSize: 1 }),
          listUserChatRooms(),
        ]);

        const totalUsers = userRes.code === 0 ? Number(userRes.data?.total) || 0 : 0;
        const rooms = roomRes.code === 0 ? roomRes.data || [] : [];
        const totalGroups = rooms.filter((r) => r.type === ChatRoomTypeEnum.GROUP).length;
        const totalPrivateRooms = rooms.filter((r) => r.type === ChatRoomTypeEnum.PRIVATE).length;

        setStats({
          totalUsers,
          totalRooms: rooms.length,
          totalGroups,
          totalPrivateRooms,
        });
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{ padding: '0 4px' }}>
        <Title level={4} style={{ marginBottom: 24 }}>
          数据概览
        </Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="总用户数"
                value={stats.totalUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="聊天室总数"
                value={stats.totalRooms}
                prefix={<WechatOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="群聊数量"
                value={stats.totalGroups}
                prefix={<GroupOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="私聊数量"
                value={stats.totalPrivateRooms}
                prefix={<CommentOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="在线人数"
                value={0}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#13c2c2' }}
              />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                需后端提供实时在线统计接口
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable>
              <Statistic
                title="总消息数"
                value={0}
                prefix={<CommentOutlined />}
                valueStyle={{ color: '#eb2f96' }}
              />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                需后端提供消息统计接口
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Statistics;
