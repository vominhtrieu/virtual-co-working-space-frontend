import { useEffect } from "react";
import GetMessagesProxy from "../../../../services/proxy/conversations/get-messages";
import { useAppSelector } from "../../../../stores";
import { userSelectors } from "../../../../stores/auth-slice";
import { ProxyStatusEnum } from "../../../../types/http/proxy/ProxyStatus";
import { OfficeDetailInterface } from "../../../../types/office";

interface UseMessPropsInterface {
  conversationId: number;
  nextCursor?: number;
  limit?: number;
  officeDetail: OfficeDetailInterface;
  handleSuccess: (mess: any[]) => void;
}

const useMess = (props: UseMessPropsInterface) => {
  const { conversationId, nextCursor, limit, officeDetail, handleSuccess } =
    props;

  const userInfo = useAppSelector(userSelectors.getUserInfo);

  useEffect(() => {
    GetMessagesProxy({
      id: conversationId,
      nextCursor: nextCursor,
      limit: limit,
    })
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          handleSuccess(res.data.messages.messages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {  };
};

export default useMess;
