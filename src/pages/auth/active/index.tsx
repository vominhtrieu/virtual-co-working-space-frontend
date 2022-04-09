// import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Login from "../login/index"
import { toastError, toastSuccess } from "../../../helpers/toast";
import ActiveProxy from "../../../services/proxy/auth/active";
import { ProxyStatusEnum } from "../../../types/http/proxy/ProxyStatus";


function Active() {
  const params = useParams();
  const {token}: any = params;

  
  const handleActive = () => {
    ActiveProxy(token)
      .then((res) => {
        console.log(token);
        if (res.status === ProxyStatusEnum.FAIL) {
          console.log(res);
          console.log(res.message);
          toastError(res.message ?? "Active user fail");
          return;
        }

        if (res.status === ProxyStatusEnum.SUCCESS) {
          toastSuccess("Active user success");
          return;
        }
      })
      .catch((err) => {
        toastError(err.message ?? "Active usern fail");
      })
      .finally(() => {});
  };

  useEffect(() => {
      handleActive();
  }, [])


  return (
    <Login/>
  );
}

export default Active;
