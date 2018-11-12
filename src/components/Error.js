import React from 'react';

export const Error = ({ error }) => {
    error = error.message.split(':');
    return (
        <p className="error">{error[1]}</p>
    );
};
