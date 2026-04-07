import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';
import { updateNotification } from '@/services/notification/notificationController';
import { message } from 'antd';

interface Props {
  oldData?: API.Notification;
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
}

const UpdateNotificationModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.NotificationUpdateRequest>();

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && oldData) {
      form.setFieldsValue(oldData);
    }
  }, [visible, oldData, form]);

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.NotificationUpdateRequest>
      title="更新通知信息"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updateNotification({
            ...values,
            id: oldData.id,
          });
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.();
            return true;
          } else {
            message.error(`更新失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`更新报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '更新',
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
        placeholder="请输入通知内容"
        rules={[{ required: true, message: '请输入内容' }]}
      />
      <ProFormSelect
        name="type"
        label="通知类型"
        options={[
          { label: '系统通知', value: 'system' },
          { label: '用户通知', value: 'user' },
          { label: '评论通知', value: 'comment' },
          { label: '点赞通知', value: 'like' },
          { label: '关注通知', value: 'follow' },
          { label: '全员广播', value: 'broadcast' },
        ]}
      />
      <ProFormText
        name="contentUrl"
        label="跳转链接"
        placeholder="请输入跳转链接"
      />
      <ProFormSelect
        name="relatedType"
        label="关联类型"
        options={[
          { label: '无', value: '' },
          { label: '帖子', value: 'POST' },
          { label: '评论', value: 'COMMENT' },
          { label: '系统', value: 'SYSTEM' },
        ]}
      />
      <ProFormText name="relatedId" label="关联ID" placeholder="请输入关联ID" />
    </ModalForm>
  );
};
export default UpdateNotificationModal;
