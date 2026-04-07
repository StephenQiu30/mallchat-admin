import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import React from 'react';
import { addNotification } from '@/services/notification/notificationController';
import { message } from 'antd';

interface Props {
  onCancel: () => void;
  visible: boolean;
  onSubmit: () => void;
}

const CreateNotificationModal: React.FC<Props> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = ProForm.useForm<API.NotificationAddRequest>();

  return (
    <ModalForm<API.NotificationAddRequest>
      title="创建系统通知"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await addNotification({
            ...values,
          });
          if (res.code === 0) {
            message.success('通知发送成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`创建失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`创建报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '创建',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="title"
        label="通知标题"
        placeholder="请输入通知标题"
        rules={[{ required: true, message: '请输入标题' }]}
      />
      <ProFormTextArea
        name="content"
        label="通知内容"
        placeholder="请输入通知的具体内容"
        rules={[{ required: true, message: '请输入内容' }]}
      />
      <ProFormText
        name="contentUrl"
        label="跳转链接"
        placeholder="请输入点击通知后的跳转链接"
      />
      <ProFormText
        name="target"
        label="发送目标"
        initialValue="all"
        placeholder="默认 all (全员广播)"
      />
    </ModalForm>
  );
};
export default CreateNotificationModal;
