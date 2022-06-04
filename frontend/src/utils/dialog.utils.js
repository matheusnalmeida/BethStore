import { confirmAlert } from 'react-confirm-alert';

export const showConfirmationDialog = (
    title,
    message,
    confirmCallBack = () => {return true},
    refuseCallBack = () => {return true}) => {
    confirmAlert({
      title: title,
      message: message,
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => confirmCallBack()
        },
        {
          label: 'Não',
          onClick: () => refuseCallBack()
        }
      ]
    });
};