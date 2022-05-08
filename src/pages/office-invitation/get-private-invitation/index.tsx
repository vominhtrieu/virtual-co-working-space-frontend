import { useState, useEffect } from "react";
import IconLanguages from "../../../components/icon-lang";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import { toastError, toastSuccess } from "../../../helpers/toast";
import AcceptPrivateInvitation from "../../../services/proxy/office-invitation/accept-private-invitation";
import GetPrivateInvitationProxy from "../../../services/proxy/office-invitation/get-private-invitation";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/UI/button";
import { InvitationInterface } from "./type";

function PrivateInvitation() {
  const params = useParams();
  const { token }: any = params;
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationInterface>();

  useEffect(()=>{
     GetPrivateInvitationProxy({id: token})
        .then((res) => {
          console.log(res);
          if (res.status === ProxyStatusEnum.FAIL) {
            toastError(res?.message??"Invitation fail");
            navigate("/");
          }
  
          if (res.status === ProxyStatusEnum.SUCCESS) {
            toastSuccess("Invitation success");
            setInvitation(res?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => { });
  },[]);

  const handleAcceptPrivate = () => {
    AcceptPrivateInvitation({
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
          navigate(`/office/${invitation?.invitation?.office?.id??0}`, {
            state: {
              officeId: invitation?.invitation?.office?.id??0,
            },
          });
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
        {invitation?
          <div className="public-invitation__container">
          <p className='public-invitation__title'>{invitation?.invitation?.inviter?.name} mời bạn tham gia văn phòng {invitation?.invitation?.office?.name}. 
          Bạn có muốn tham gia không?</p>
          <div className='public-invitation__group-btn'>
            <Button
              type='submit'
              variant='primary'
              onClick={handleAcceptPrivate}
            >
              Đồng ý
            </Button>

            <Button type='reset' variant='outlined' onClick={() => navigate("/")}>
              Huỷ
            </Button>
          </div>
        </div>:null}
      </section>
    </>
  );
}

export default PrivateInvitation;
