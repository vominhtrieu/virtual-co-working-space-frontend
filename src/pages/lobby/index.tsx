import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/navbar";
import Thumbnail from "../../components/UI/thumbnail";
import { toastError, toastSuccess } from "../../helpers/toast";
import JoinByCodeProxy from "../../services/proxy/office-invitation/join-invite-code";
import CreateOfficeProxy from "../../services/proxy/offices/create-office";
import GetOfficeListProxy from "../../services/proxy/offices/office-list";
import { ProxyStatusEnum } from "../../types/http/proxy/ProxyStatus";
import { OfficeInterface } from "../../types/office";
import {
  CreateOfficeFormValuesInterface,
  JoinOfficeFormValuesInterface,
} from "./types";

const Lobby = () => {
  const [officeList, setOfficeList] = useState<OfficeInterface[]>();
  const [countGetOffices, setCountGetOffices] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    GetOfficeListProxy({ page: 1, size: 5 })
      .then((res) => {
        if (!isMounted) return;

        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Get offices fail");
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          setOfficeList(res.data.officeList);
        }
      })
      .catch((err) => {
        console.log(err);

        toastError(err.message ?? "Get offices fail");
      });

    return () => {
      isMounted = false;
    };
  }, [countGetOffices]);

  return (
    <section className="lobby">
      <Navbar />

      <div className="lobby__main">
        <div className="lobby__office-list">
          {officeList?.map((office) => {
            return (
              <Thumbnail
                key={office.id}
                office={office}
                alt={office.avatarUrl}
                src={office.avatarUrl}
                onClick={() => {
                  navigate(`/office/${office.id}`);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Lobby;
