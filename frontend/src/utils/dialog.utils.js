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
          label: 'Yes',
          onClick: () => confirmCallBack()
        },
        {
          label: 'No',
          onClick: () => refuseCallBack()
        }
      ]
    });
};