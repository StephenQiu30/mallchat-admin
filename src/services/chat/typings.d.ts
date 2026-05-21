declare namespace API {
  type BaseResponseChatIdVO = {
    /** 状态码 */
    code?: number;
    data?: ChatIdVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseChatMessageReadStatusVO = {
    /** 状态码 */
    code?: number;
    data?: ChatMessageReadStatusVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseChatMessageVO = {
    /** 状态码 */
    code?: number;
    data?: ChatMessageVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseChatOperationResultVO = {
    /** 状态码 */
    code?: number;
    data?: ChatOperationResultVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseChatRoomVO = {
    /** 状态码 */
    code?: number;
    data?: ChatRoomVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChatFriendUserVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChatFriendUserVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChatMessageVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChatMessageVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChatRoomMemberVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChatRoomMemberVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChatRoomVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChatRoomVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponseListChatSessionVO = {
    /** 状态码 */
    code?: number;
    /** 数据 */
    data?: ChatSessionVO[];
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatFriendApplyVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatFriendApplyVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatFriendUserVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatFriendUserVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatMessageVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatMessageVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatMomentCommentVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatMomentCommentVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatMomentVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatMomentVO;
    /** 消息 */
    message?: string;
  };

  type BaseResponsePageChatRoomJoinApplyVO = {
    /** 状态码 */
    code?: number;
    data?: PageChatRoomJoinApplyVO;
    /** 消息 */
    message?: string;
  };

  type ChatFriendAddRequest = {
    /** 好友用户ID */
    friendUserId: number;
  };

  type ChatFriendApplyQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
  };

  type ChatFriendApplyRequest = {
    /** 目标用户ID */
    targetId: number;
    /** 申请消息 */
    msg: string;
  };

  type ChatFriendApplyVO = {
    /** 申请ID */
    id?: number;
    /** 发起用户ID */
    userId?: number;
    /** 发起用户昵称 */
    userName?: string;
    /** 发起用户头像 */
    userAvatar?: string;
    /** 申请消息 */
    msg?: string;
    /** 状态：1-待处理，2-已同意，3-已忽略 */
    status?: number;
    /** 申请时间 */
    createTime?: string;
  };

  type ChatFriendApproveRequest = {
    /** 申请记录ID */
    applyId: number;
    /** 审核状态：2-同意，3-拒绝 */
    status: number;
  };

  type ChatFriendBlockRequest = {
    /** 目标用户ID */
    targetUserId: number;
  };

  type ChatFriendDeleteRequest = {
    /** 好友用户ID */
    friendUserId: number;
  };

  type ChatFriendListRequest = {
    /** 好友分组名称 */
    friendGroupName?: string;
  };

  type ChatFriendProfileUpdateRequest = {
    /** 好友用户ID */
    friendUserId: number;
    /** 好友备注 */
    remarkName?: string;
    /** 好友分组名称 */
    friendGroupName?: string;
  };

  type ChatFriendQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 关键词（用户昵称） */
    searchText?: string;
    /** 用户ID */
    userId?: number;
    /** 好友用户ID */
    friendUserId?: number;
  };

  type ChatFriendUnblockRequest = {
    /** 目标用户ID */
    targetUserId: number;
  };

  type ChatFriendUserVO = {
    /** 用户ID */
    id?: number;
    /** 昵称 */
    userName?: string;
    /** 头像 */
    userAvatar?: string;
    /** 好友备注 */
    remarkName?: string;
    /** 好友分组名称 */
    friendGroupName?: string;
    /** 在线状态：0-离线，1-在线 */
    onlineStatus?: number;
    /** 关系状态：0-陌生人，1-本人，2-已是好友，3-我已发起待处理，4-对方已发起待处理 */
    friendStatus?: number;
  };

  type ChatIdVO = {
    /** 资源ID */
    id?: number;
  };

  type ChatMessageAfterQueryRequest = {
    /** 房间ID */
    roomId: number;
    /** 客户端最后收到的消息ID */
    afterMessageId?: number;
    /** 加载消息数量 */
    limit?: number;
  };

  type ChatMessageForwardRequest = {
    /** 来源消息ID */
    sourceMessageId: number;
    /** 目标房间ID */
    targetRoomId: number;
    /** 客户端消息ID，用于幂等控制 */
    clientMsgId: string;
  };

  type ChatMessageHistoryQueryRequest = {
    /** 房间ID */
    roomId: number;
    /** 上一页最后一条消息ID */
    lastMessageId?: number;
    /** 加载消息数量 */
    limit?: number;
  };

  type ChatMessageReadRequest = {
    /** 房间ID */
    roomId: number;
    /** 已读到的最后一条消息ID */
    lastReadMessageId: number;
  };

  type ChatMessageReadStatusRequest = {
    /** 房间ID */
    roomId: number;
    /** 消息ID */
    messageId: number;
  };

  type ChatMessageReadStatusVO = {
    /** 房间ID */
    roomId?: number;
    /** 消息ID */
    messageId?: number;
    /** 当前房间成员总数 */
    totalCount?: number;
    /** 已读成员数 */
    readCount?: number;
    /** 未读成员数 */
    unreadCount?: number;
  };

  type ChatMessageRecallRequest = {
    /** 消息ID */
    messageId: number;
  };

  type ChatMessageSearchRequest = {
    /** 房间ID */
    roomId: number;
    /** 关键词 */
    keyword: string;
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
  };

  type ChatMessageSendRequest = {
    /** 房间ID */
    roomId: number;
    /** 客户端消息ID，用于幂等控制 */
    clientMsgId: string;
    /** 消息内容，文本消息必填；图片/文件消息可为空 */
    content?: string;
    /** 消息类型：1-文本，2-图片，3-文件，4-语音，5-视频，6-表情 */
    type: number;
    /** 消息扩展内容（JSON 字符串） */
    extra?: string;
    /** 被回复的消息ID */
    replyMsgId?: number;
  };

  type ChatMessageVO = {
    /** 消息ID */
    id?: number;
    /** 房间ID */
    roomId?: number;
    /** 发送者ID */
    fromUserId?: number;
    /** 客户端消息ID */
    clientMsgId?: string;
    /** 发送者姓名 */
    fromUserName?: string;
    /** 发送者头像 */
    fromUserAvatar?: string;
    /** 消息内容 */
    content?: string;
    /** 消息类型：1-文本，2-图片，3-文件 */
    type?: number;
    /** 消息扩展内容 */
    extra?: string;
    replyMsg?: ReplyMsgVO;
    /** 消息状态：0-正常，1-已撤回，2-已删除 */
    status?: number;
    /** 发送时间 */
    createTime?: string;
  };

  type ChatMomentCommentQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 动态ID */
    momentId: number;
  };

  type ChatMomentCommentRequest = {
    /** 动态ID */
    momentId: number;
    /** 评论正文 */
    content: string;
  };

  type ChatMomentCommentVO = {
    /** 评论ID */
    id?: number;
    /** 动态ID */
    momentId?: number;
    /** 评论用户ID */
    userId?: number;
    /** 评论正文 */
    content?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type ChatMomentIdRequest = {
    /** 动态ID */
    id: number;
  };

  type ChatMomentMediaRequest = {
    /** 媒体URL */
    url?: string;
    /** 图片宽度 */
    width?: number;
    /** 图片高度 */
    height?: number;
    /** 文件大小 */
    size?: number;
    /** 排序 */
    sortOrder?: number;
  };

  type ChatMomentMediaVO = {
    /** 媒体ID */
    id?: number;
    /** 动态ID */
    momentId?: number;
    /** 媒体URL */
    url?: string;
    /** 图片宽度 */
    width?: number;
    /** 图片高度 */
    height?: number;
    /** 文件大小 */
    size?: number;
    /** 排序 */
    sortOrder?: number;
  };

  type ChatMomentPublishRequest = {
    /** 动态正文 */
    content?: string;
    /** 动态媒体列表 */
    mediaList?: ChatMomentMediaRequest[];
    /** 可见范围：0-好友可见，1-公开 */
    visibility?: number;
  };

  type ChatMomentQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
  };

  type ChatMomentVO = {
    /** 动态ID */
    id?: number;
    /** 发布用户ID */
    userId?: number;
    /** 动态正文 */
    content?: string;
    /** 媒体数量 */
    mediaCount?: number;
    /** 点赞数 */
    likeCount?: number;
    /** 评论数 */
    commentCount?: number;
    /** 可见范围：0-好友可见，1-公开 */
    visibility?: number;
    /** 媒体列表 */
    mediaList?: ChatMomentMediaVO[];
    /** 创建时间 */
    createTime?: string;
  };

  type ChatOperationResultVO = {
    /** 是否成功 */
    success?: boolean;
  };

  type ChatPrivateRoomRequest = {
    /** 对方用户ID */
    peerUserId: number;
  };

  type ChatReportSubmitRequest = {
    /** 举报对象类型：1-用户，2-消息，3-动态 */
    targetType: number;
    /** 举报对象ID */
    targetId: number;
    /** 举报原因类型 */
    reasonType: string;
    /** 举报说明 */
    reason?: string;
  };

  type ChatRoomAddRequest = {
    /** 房间名称 */
    name: string;
    /** 房间头像 */
    avatar?: string;
    /** 群公告 */
    announcement?: string;
    /** 初始群成员ID列表 */
    memberIds?: number[];
  };

  type ChatRoomAdminRoleRequest = {
    /** 房间ID */
    roomId: number;
    /** 成员用户ID */
    memberId: number;
  };

  type ChatRoomDetailRequest = {
    /** 房间ID */
    roomId: number;
  };

  type ChatRoomIdRequest = {
    /** 房间ID */
    roomId: number;
  };

  type ChatRoomInviteRequest = {
    /** 房间ID */
    roomId: number;
    /** 待邀请成员ID列表 */
    memberIds: number[];
  };

  type ChatRoomJoinApplyQueryRequest = {
    /** 当前页号 */
    current?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 排序字段 */
    sortField?: string;
    /** 排序顺序（默认升序） */
    sortOrder?: string;
    /** 房间ID */
    roomId: number;
  };

  type ChatRoomJoinApplyRequest = {
    /** 房间ID */
    roomId: number;
    /** 申请留言 */
    msg?: string;
  };

  type ChatRoomJoinApplyVO = {
    /** 申请ID */
    id?: number;
    /** 房间ID */
    roomId?: number;
    /** 申请用户ID */
    userId?: number;
    /** 审核用户ID */
    reviewerId?: number;
    /** 申请留言 */
    msg?: string;
    /** 审核留言 */
    reviewMsg?: string;
    /** 状态：1-待处理，2-已同意，3-已拒绝 */
    status?: number;
    /** 申请时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ChatRoomJoinApproveRequest = {
    /** 申请ID */
    applyId: number;
    /** 审核状态：2-同意，3-拒绝 */
    status: number;
    /** 审核留言 */
    reviewMsg?: string;
  };

  type ChatRoomMemberQueryRequest = {
    /** 房间ID */
    roomId: number;
  };

  type ChatRoomMemberRemoveRequest = {
    /** 房间ID */
    roomId: number;
    /** 待移除成员用户ID */
    memberId: number;
  };

  type ChatRoomMemberVO = {
    /** 成员ID */
    id?: number;
    /** 房间ID */
    roomId?: number;
    /** 用户ID */
    userId?: number;
    /** 用户名称 */
    userName?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 角色：1-普通成员，2-管理员，3-群主 */
    role?: number;
    /** 最后已读消息ID */
    lastReadMessageId?: number;
    /** 加入时间 */
    createTime?: string;
  };

  type ChatRoomUpdateRequest = {
    /** 房间ID */
    roomId: number;
    /** 群聊名称 */
    name?: string;
    /** 群聊头像 */
    avatar?: string;
    /** 群公告 */
    announcement?: string;
  };

  type ChatRoomVO = {
    /** 房间ID */
    id?: number;
    /** 房间名称 */
    name?: string;
    /** 房间类型：1-群聊，2-私聊 */
    type?: number;
    /** 房间头像 */
    avatar?: string;
    /** 房间拥有者ID */
    ownerUserId?: number;
    /** 成员数量 */
    memberCount?: number;
    /** 群公告 */
    announcement?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type ChatSessionDeleteRequest = {
    /** 房间ID */
    roomId: number;
  };

  type ChatSessionMuteRequest = {
    /** 房间ID */
    roomId: number;
    /** 免打扰状态：0-关闭，1-开启 */
    muteStatus: number;
  };

  type ChatSessionTopRequest = {
    /** 房间ID */
    roomId: number;
    /** 置顶状态：0-取消置顶, 1-置顶 */
    status: number;
  };

  type ChatSessionVO = {
    /** 房间ID */
    roomId?: number;
    /** 房间名称 */
    name?: string;
    /** 房间头像 */
    avatar?: string;
    /** 房间类型：1-群聊，2-私聊 */
    type?: number;
    /** 最后一条消息内容 */
    lastMessage?: string;
    /** 最后一条消息ID */
    lastMessageId?: number;
    /** 最后一条已读消息ID */
    lastReadMessageId?: number;
    /** 未读数 */
    unreadCount?: number;
    /** 置顶状态：0-否，1-是 */
    topStatus?: number;
    /** 免打扰状态：0-否，1-是 */
    muteStatus?: number;
    /** 最后活跃时间 */
    activeTime?: string;
    /** 在线状态：0-离线，1-在线 */
    onlineStatus?: number;
  };

  type getMessageReadStatusParams = {
    request: ChatMessageReadStatusRequest;
  };

  type getRoomDetailParams = {
    request: ChatRoomDetailRequest;
  };

  type listCommentsParams = {
    request: ChatMomentCommentQueryRequest;
  };

  type listFriendsParams = {
    request: ChatFriendListRequest;
  };

  type listHistoryMessagesParams = {
    request: ChatMessageHistoryQueryRequest;
  };

  type listMessagesAfterParams = {
    request: ChatMessageAfterQueryRequest;
  };

  type listPublicMomentsParams = {
    request: ChatMomentQueryRequest;
  };

  type listRoomMembersParams = {
    request: ChatRoomMemberQueryRequest;
  };

  type listVisibleMomentsParams = {
    request: ChatMomentQueryRequest;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChatFriendApplyVO = {
    records?: ChatFriendApplyVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatFriendApplyVO;
    searchCount?: PageChatFriendApplyVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChatFriendUserVO = {
    records?: ChatFriendUserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatFriendUserVO;
    searchCount?: PageChatFriendUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChatMessageVO = {
    records?: ChatMessageVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatMessageVO;
    searchCount?: PageChatMessageVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChatMomentCommentVO = {
    records?: ChatMomentCommentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatMomentCommentVO;
    searchCount?: PageChatMomentCommentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChatMomentVO = {
    records?: ChatMomentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatMomentVO;
    searchCount?: PageChatMomentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageChatRoomJoinApplyVO = {
    records?: ChatRoomJoinApplyVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChatRoomJoinApplyVO;
    searchCount?: PageChatRoomJoinApplyVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ReplyMsgVO = {
    /** 消息ID */
    id?: number;
    /** 发送者姓名 */
    userName?: string;
    /** 消息内容 */
    content?: string;
    /** 消息类型 */
    type?: number;
  };

  type searchMessagesParams = {
    request: ChatMessageSearchRequest;
  };

  type searchParams = {
    request: ChatFriendQueryRequest;
  };
}
