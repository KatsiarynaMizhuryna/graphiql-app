import { Toaster } from 'react-hot-toast';
import React from 'react';

export const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          duration: 5000,
          position: 'top-right',
          style: {
            background: '#90EE90',
            color: '#696969',
            border: '2px solid green'
          }
        },
        error: {
          duration: 5000,
          position: 'top-right',
          style: {
            backgroundColor: '#FFB6C1',
            border: '2px solid red',
            color: '#696969'
          }
        },
        loading: {
          duration: 1000,
          position: 'top-right',
          style: {
            background: '#90EE90',
            color: '#696969',
            border: '2px solid green'
          }
        }
      }}
      position="top-right"
    />
  );
};
