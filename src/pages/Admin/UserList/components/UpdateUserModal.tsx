import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useState } from 'react';
import { userRole } from '@/enums/UserRoleEnum';
import { updateUser } from '@/services/user/userController';

interface Props {
  oldData?: API.UserVO;
  onCancel: () => void;
  onSubmit: (values?: API.UserUpdateRequest) => void;
  visible: boolean;
}

/**
 * 更新用户 Modal
 * @param props
 * @constructor
 */
const UpdateUserModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [userAvatar, setUserAvatar] = useState<string>();
  const [form] = ProForm.useForm<API.UserUpdateRequest>();

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && oldData) {
      form.setFieldsValue(oldData);
      setUserAvatar(oldData.userAvatar);
    }
  }, [visible, oldData, form]);

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.UserUpdateRequest>
      title="更新用户信息"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updateUser({
            ...values,
            id: oldData?.id,
            userAvatar,
          });
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.(values);
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
        name="userName"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
        placeholder="请输入用户名"
      />
      <ProFormTextArea name="userProfile" label="简介" placeholder="请输入简介" />
      <ProFormText
        name="userPhone"
        label="电话"
        placeholder="请输入电话"
        rules={[{ pattern: /^1\d{10}$/, message: '请输入正确的手机号' }]}
      />
      <ProFormSelect
        name="userRole"
        label="权限"
        valueEnum={userRole}
        rules={[{ required: true, message: '请选择权限' }]}
      />
      <ProFormText
        name="userEmail"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
        ]}
      />
    </ModalForm>
  );
};
export default UpdateUserModal;
