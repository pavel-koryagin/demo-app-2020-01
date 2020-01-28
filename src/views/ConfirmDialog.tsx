import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { InternalDialogViewProps } from '../widgets/DialogWidget';

export interface ConfirmProps {
  title?: string,
  text: string,
  open?: boolean,
  onOk: () => void,
  onCancel?: () => void,
}

type Props = ConfirmProps & InternalDialogViewProps;

const ConfirmDialog: React.FC<Props> = ({
  title,
  text,
  open = true,
  onOk,
  onCancel,
  onClose,
}: Props) => {

  const triggerCancel = () => {
    onClose();
    onCancel && onCancel();
  }
  const triggerOk = () => {
    onClose();
    onOk();
  }

  return (
    <Dialog
      open={open}
      onClose={triggerCancel}
      aria-labelledby={title ? 'alert-dialog-title' : 'alert-dialog-description'}
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={triggerOk} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
