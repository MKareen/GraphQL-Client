import React from 'react';

export const Error = ({ error }) => {
    if (error && error.message) {
        error = error.message.split(':');
        return (
            <p className="error">{error[1]}</p>
        );
    } else {
        console.log(error);
    }
};
