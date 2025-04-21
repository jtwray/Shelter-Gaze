import React from 'react';
import './LoadingSkeleton.css';

export const LoadingSkeleton = ({ width, height, borderRadius = '0 0 8px 8px' }) => {
    return (
        <div
            className="skeleton"
            style={{
                width: width || '100%',
                height: height || '100%',
                borderRadius: borderRadius
            }}
        />
    );
};