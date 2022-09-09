import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

type ExtraButtonData = {
    text: string;
    callback: () => void;
}

export default function useErrorAlert() {
    const [error, setError] = useState('');
    const [extraButton, setExtraButton] = useState<ExtraButtonData | null>(null);

    const handleErrorClose = () => {
        setError('');
        setExtraButton(null);
    }

    let errorTitle = '';
    let errorBody = '';

    if (error !== '') {
        errorTitle = error.split('\n')[0];
        errorBody = error.split('\n')[1];
    }

    const alertElement = (
        <Dialog
            open={error !== ''}
            onClose={handleErrorClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {errorTitle}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {errorBody}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            {extraButton != null && (
                <Button onClick={extraButton.callback}>{extraButton.text}</Button>
            )}
            <Button onClick={handleErrorClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )

    const showAlert = (title: string, body: string) => {
        setError(title + '\n' + body);
    }

    const showAlertWithButton = (title: string, body: string, buttonText: string, callback: () => void) => {
        setError(title + '\n' + body);
        setExtraButton({
            text: buttonText,
            callback
        });
    }

    return {
        showAlert,
        alertElement,
        showAlertWithButton
    }
}