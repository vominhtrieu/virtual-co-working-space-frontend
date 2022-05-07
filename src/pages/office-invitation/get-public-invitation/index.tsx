import { useState } from "react";
import IconLanguages from "../../../components/icon-lang";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { toastError, toastSuccess } from "../../../helpers/toast";
import PublicInvitationProxy from "../../../services/proxy/office-invitation/get-public-invitation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../../home/Home";
import Button from "../../../components/UI/button";

function PublicInvitation() {
  const params = useParams();
  const { token }: any = params;
  const navigate = useNavigate();

  const handlePublicInvitation = () => {
    PublicInvitationProxy({
      id: token,
    })
      .then((res) => {
        console.log(res);
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res?.message??"Join office fail");
          navigate("/");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Join office success");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });
  };

  return (
    <>
      <section className='public-invitation'>
        <IconLanguages />
        <div className="public-invitation__container">
          <p className='public-invitation__title'>Bạn có đồng ý tham gia văn phòng này không?</p>
          <div className='public-invitation__group-btn'>
            <Button
              type='submit'
              variant='primary'
              onClick={handlePublicInvitation}
            >
              Đồng ý
            </Button>

            <Button type='reset' variant='outlined' onClick={() => navigate("/")}>
              Huỷ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PublicInvitation;
