export enum FileUploadBiz {
  USER_AVATAR = 'user_avatar',
  CHAT_IMAGE = 'chat_image',
  CHAT_FILE = 'chat_file',
  CHAT_VOICE = 'chat_voice',
  CHAT_VIDEO = 'chat_video',
}

/**
 * 文件上传业务类型枚举映射
 */
export const FileUploadBizEnumMap = {
  [FileUploadBiz.USER_AVATAR]: {
    text: '用户头像',
    status: 'Default',
  },
  [FileUploadBiz.CHAT_IMAGE]: {
    text: '聊天图片',
    status: 'Processing',
  },
  [FileUploadBiz.CHAT_FILE]: {
    text: '聊天文件',
    status: 'Success',
  },
  [FileUploadBiz.CHAT_VOICE]: {
    text: '聊天语音',
    status: 'Warning',
  },
  [FileUploadBiz.CHAT_VIDEO]: {
    text: '聊天视频',
    status: 'Warning',
  },
};
