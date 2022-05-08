import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { ProxyFuncType } from "../../../../types/http/proxy/ProxyFuncType";
import { createConversation } from "../../../api/conversations/create-conversation";
import {
  CreateConversationProxyParamsInterface,
  CreateConversationProxyResponseInterface,
  CreateConversationProxyTransformInterface,
} from "./types";

const createConversationTransform = (
  res: CreateConversationProxyTransformInterface
): CreateConversationProxyResponseInterface => {
  const transform = {
    conversation: res?.conversation ?? {},
  };
  return transform;
};

const CreateConversationProxy = async (
  params: CreateConversationProxyParamsInterface
): Promise<ProxyFuncType<CreateConversationProxyResponseInterface>> => {
  const res = await createConversation(params);

  if (res?.code && res?.code !== 200) {
    return {
      status: ProxyStatusEnum.FAIL,
      message: res.message,
      code: res.code,
      errors: res.errors,
    };
  }

  const ConversationListRespTransformed = createConversationTransform(
    res?.data
  );
  return {
    status: ProxyStatusEnum.SUCCESS,
    data: ConversationListRespTransformed,
  };
};

export default CreateConversationProxy;
