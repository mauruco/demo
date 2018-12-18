import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Confirm = props => {

    let emptyFunc = ()=>{};
    let onClose = props.onClose || emptyFunc;
    let onConfirm = props.onConfirm || emptyFunc;
    let onClick = props.onClick || emptyFunc;

    return (
        <Dialog fullScreen={false} open={props.open} onClose={(e)=>{onClose(e)}} aria-labelledby="responsive-dialog-title">
            <DialogContent>
                <DialogContentText>
                Tem certeza que deseja continuar com a ação de excluir o curso?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e)=>{onClick(e)}} color="primary" autoFocus>
                Cancelar
                </Button>
                <Button onClick={(e)=>{onConfirm(e)}} color="primary" autoFocus>
                Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;