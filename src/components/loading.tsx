import React, { useContext } from 'react';
import { AuthContext } from '../Providers/authContext';

export const LoadingComponent = ({isLoading}) => {
    // const { isLoading } = useContext(AuthContext);
    // console.log('--- LoadingComponent: isLoading ---',isLoading);
    return (
        <div className="loading-container">
            <div className="loading-overlay">
                <div className="loading-spinner">
                    <div className="loading-spinner-inner"> loading...</div>
                </div>
            </div>
        </div>
    )
}