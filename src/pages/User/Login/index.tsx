import { Footer } from '@/components';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { MailOutlined } from '@ant-design/icons';
import { Divider, Image, message, Typography } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';
import { STEPHEN_SUBTITLE, STEPHEN_TITLE } from '@/constants';
import { sendEmailCode, userLoginByEmail } from '@/services/user/userController';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundColor: token.colorBgContainer,
    },
    content: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 12px',
    },
    loginCard: {
      width: '100%',
      maxWidth: '480px',
      padding: '32px',
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowTertiary,
      backgroundColor: token.colorBgContainer,
    },
  };
});

/**
 * 登录页面
 * @constructor
 */
const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  /**
   * 登录成功后的处理
   * @param res
   */
  const handleLoginSuccess = async (res: API.BaseResponseLoginUserVO) => {
    if (res.code === 0 && res.data) {
      if (res.data.userRole === 'admin') {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 保存 token
        localStorage.setItem('stephen-token', res.data.token || '');
        // 更新全局状态
        setInitialState((s) => ({
          ...s,
          currentUser: res.data,
        }));
        // 延迟跳转，确保状态更新
        setTimeout(() => {
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
        }, 10);
      } else {
        message.error('对不起，您不是管理员，无法登录管理后台');
      }
    } else {
      message.error(res.message || '登录失败，请重试');
    }
  };

  const handleSubmit = async (values: API.UserEmailLoginRequest) => {
    try {
      const res = await userLoginByEmail({
        ...values,
      });
      await handleLoginSuccess(res);
    } catch (error) {
      console.error(error);
      message.error('登录失败，请重试');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginCard}>
          <LoginForm
            logo={<Image preview={false} width={48} alt="logo" src="/logo.svg" />}
            title={
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {STEPHEN_TITLE}
              </Typography.Title>
            }
            subTitle={STEPHEN_SUBTITLE}
            onFinish={handleSubmit}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Typography.Text strong type="danger" style={{ fontSize: '16px' }}>
                本系统为管理系统，仅限管理员登录
              </Typography.Text>
              <Divider dashed />
            </div>

            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined />,
              }}
              name="email"
              placeholder="请输入邮箱"
              rules={[
                {
                  required: true,
                  message: '邮箱是必填项！',
                },
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder="请输入 6 位验证码"
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'秒后重新获取'}`;
                }
                return '获取验证码';
              }}
              name="code"
              phoneName="email"
              rules={[
                {
                  required: true,
                  message: '验证码是必填项！',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '请输入 6 位数字验证码',
                },
              ]}
              onGetCaptcha={async (email) => {
                const result = await sendEmailCode({
                  email,
                });
                if (result.code === 0 && result.data) {
                  message.success('验证码发送成功！');
                  return;
                }
                throw new Error('获取验证码失败');
              }}
            />
            <div style={{ marginBottom: 24 }}></div>
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
