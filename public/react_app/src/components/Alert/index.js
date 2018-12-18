import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Alert = props => {

    let emprtyFunction = ()=>{};
    let onClose = props.onClose || emprtyFunction;
    let onClick = props.onClick || emprtyFunction;

    return (
        <Dialog fullScreen={false} open={(props.message ? true : false)} onClose={(e)=>{onClose(e)}} aria-labelledby="responsive-dialog-title">
            <DialogContent>
                <DialogContentText>
                {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e)=>{onClick(e)}} color="primary" autoFocus>
                Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Alert;