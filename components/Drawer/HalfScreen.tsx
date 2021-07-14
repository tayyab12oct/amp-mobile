import * as React from 'react';

import { useContext, useEffect } from 'react';

import Modal from 'react-modal';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../ViewportProvider';
import { makeStyles } from '@material-ui/styles';

export function HalfScreen(props) {
  const { isOpen, closeHandler, menu } = props;
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => closeHandler(false)}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
        },
        content: {
          position: 'fixed',
          top: '60%',
          left: '0%',
          right: '0%',
          bottom: 0,
          background: 'rgb(15, 8, 32)',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          zIndex: '999',
          border: 'none',
          padding: 0,
          height: '300px',
          transition: 'all .4s ease',
        },
      }}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
      onAfterClose={() => {
        document.body.style.overflow = 'auto';
      }}
    >
      {menu}
    </Modal>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'rgb(15, 8, 32)',
  },
}));
