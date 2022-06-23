// import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/toast";
import ActiveProxy from "../../../services/proxy/auth/active";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";
import Lobby from "../../lobby";

function Active() {
  const params = useParams();
  const { token }: any = params;
  const navigate = useNavigate();

  const handleActive = () => {
    ActiveProxy(token)
      .then((res) => {
        if (res.status === ProxyStatusEnum.FAIL) {
          toastError(res.message ?? "Active user fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Active user success");
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        toastError("Active user fail");
      })
      .finally(() => {});
  };

  useEffect(() => {
    handleActive();
  }, []);

  return <Lobby />;
}

export default Active;
