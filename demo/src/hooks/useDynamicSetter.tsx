import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

export default function useDynamicSetter() {
    function dynamicSet<T>(setter: React.Dispatch<React.SetStateAction<T>>, useCheckedProperty: boolean = false) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            if (useCheckedProperty) {
                setter(event.target.checked as T);
            } else {
                setter(event.target.value as T);
            }
        }
    }

    return dynamicSet;
}