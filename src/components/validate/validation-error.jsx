import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

function ValidationError() {
    const { error } = useSelector(state => state.auth);

    const errorMessage = useCallback(() => {
        if (!error || typeof error !== 'object') return [];

        return Object.keys(error).map(name => {
            const msg = Array.isArray(error[name]) ? error[name].join(', ') : String(error[name]);
            return msg;
        });
    }, [error]);

    return (
        error !== null &&
        errorMessage().map((err, index) => (
            <div className="alert alert-danger m-1 p-1" key={index}>{err}</div>
        ))
    );
}

export default ValidationError;
