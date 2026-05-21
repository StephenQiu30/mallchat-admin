import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import { userRole } from '@/enums/UserRoleEnum';
import { uploadFile } from '@/services/file/fileController';
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

  /**
   * 用户更新头像
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadFile(
          {
            bizType: FileUploadBiz.USER_AVATAR,
          },
          {},
          file as File,
        );
        if (res.code === 0 && res.data?.url) {
          onSuccess(res.data);
          setUserAvatar(res.data.url);
          message.success('头像上传成功');
        } else {
          onError(new Error(res.message));
          message.error(`头像上传失败: ${res.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error(`文件上传失败: ${error.message}`);
      }
    },
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只允许上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('头像大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onRemove() {
      setUserAvatar(oldData?.userAvatar);
    },
  };

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
          const submitValues: API.UserUpdateRequest = {
            id: oldData?.id,
            userName: values.userName,
            userAvatar,
            userProfile: values.userProfile,
            userRole: values.userRole,
            userPhone: values.userPhone,
            userEmail: values.userEmail,
          };
          const res = await updateUser(submitValues);
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.(submitValues);
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
      <ProFormUploadDragger
        title="点击或拖拽文件到此区域进行上传"
        label="头像"
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="file"
      />
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
