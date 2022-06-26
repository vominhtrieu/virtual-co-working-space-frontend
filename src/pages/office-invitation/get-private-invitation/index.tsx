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
import { useAppSelector } from "../../../stores";
import { loadSelectors } from "../../../stores/load-slice";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

function PrivateInvitation() {
  const params = useParams();
  const { token }: any = params;
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationInterface>();
  const isLoading = useAppSelector(loadSelectors.getIsLoad);
  const { t } = useTranslation();

  useEffect(() => {
    GetPrivateInvitationProxy({ id: token })
      .then((res) => {

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res?.message ?? "Invitation fail");
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
  }, []);

  const handleAcceptPrivate = () => {
    AcceptPrivateInvitation({
      id: token,
    })
      .then((res) => {

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res?.message ?? "Join office fail");
          navigate("/");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Join office success");
          navigate(`/office/${invitation?.invitation?.office?.id ?? 0}`, {
            state: {
              officeId: invitation?.invitation?.office?.id ?? 0,
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
        {invitation ?
          <div className="public-invitation__container">
            <p className='public-invitation__title'>{invitation?.invitation?.inviter?.name} {t("page.office.invitation.inviteJoin")} {invitation?.invitation?.office?.name}.
              {t("page.office.invitation.wantJoin")}</p>
            <div className='public-invitation__group-btn'>
              <Button
                type='submit'
                variant='primary'
                onClick={handleAcceptPrivate}
                disabled={isLoading}
              >
                {isLoading ? <Spin style={{ paddingRight: 5 }} /> : null}
                {t("default.action.accept")}
              </Button>

              <Button type='reset' variant='outlined' onClick={() => navigate("/")}>
                {t("default.action.cancel")}
              </Button>
            </div>
          </div> : null}
      </section>
    </>
  );
}

export default PrivateInvitation;
