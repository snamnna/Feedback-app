import React from "react";
import "../../../i18n/config";
import { useTranslation } from "react-i18next";

const DelConf = ({ onCancel, onConfirm }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <div className="delete-conf flex flex-col items-center">
      <p>{t("delete-confirm-text")}</p>
      <button onClick={onConfirm}>{t("yes")}</button>
      <button onClick={onCancel}>{t("no")}</button>
    </div>
  );
};

export default DelConf;
