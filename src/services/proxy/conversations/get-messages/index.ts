import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";

import {
  GetMessagesProxyParamsInterface,
  GetMessagesProxyResponseInterface,
  GetMessagesProxyTransformInterface,
} from "./types";
import { getMessages } from "../../../api/conversations/get-messages";

const getMessagesTransform = (
  res: GetMessagesProxyTransformInterface
): GetMessagesProxyResponseInterface => {
  const transform = {
    messages: {
      messages: res?.messages.map((message) => {
        return {
          id: message?.id ?? 0,
          conversationId: message?.conversationId ?? 0,
          content: message?.content ?? "",
          type: message?.type ?? "",
          sentAt: message?.sentAt ?? "",
          senderId: message?.senderId ?? 0,
          readers: message?.readers?.map((reader) => {
            return {
              readerId: reader?.readerId ?? 0,
              messageId: reader?.messageId ?? 0,
              readAt: reader?.readAt ?? "",
            };
          }),
          status: message?.status ?? "",
        };
      }),
      pagination: {
        count: res?.pagination?.count ?? 0,
        nextCursor: res?.pagination?.nextCursor ?? 0,
      },
    },
  };
  return transform;
};

const GetMessagesProxy = async (
  params: GetMessagesProxyParamsInterface
): Promise<ProxyFuncType<GetMessagesProxyResponseInterface>> => {
  const res = await getMessages(params);

  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const GetMessagesRespTransformed = getMessagesTransform(res?.data);
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: GetMessagesRespTransformed,
  };
};

export default GetMessagesProxy;
