import React from 'react';
import { GENERIC_API_ERROR } from '../configs/constants';

export const Error = ({ error }) => {
    if (error && error.message) {
        error = error.message.split(':');
        
        return (
            <p className="error">{error[1]}</p>
        );
    } else {
        return (
            <p className="error">{GENERIC_API_ERROR}</p>
        );
    }
};
