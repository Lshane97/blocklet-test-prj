import { FC, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { createRoot } from 'react-dom/client';

export interface MessageProps {
  content: string;
  duration?: number;
  type: AlertColor;
}

const DURATION = 2000;

const Message: FC<MessageProps> = (props) => {
  const { content, duration = DURATION, type } = props;
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}>
      <Alert severity={type} variant="standard">
        {content}
      </Alert>
    </Snackbar>
  );
};

type MsgArgs = Omit<MessageProps, 'type'>;

const renderMessage = ({ content, duration = DURATION, type }: MessageProps) => {
  const dom = document.createElement('div');
  createRoot(dom).render(<Message content={content} duration={duration} type={type}></Message>);
  document.body.appendChild(dom);
  removeTimer(dom, duration);
};

const removeTimer = (node: HTMLElement, duration: number) => {
  setTimeout(() => {
    node?.remove();
  }, duration + 500); // 500ms 防止动画未结束
};

const message = {
  success({ content, duration }: MsgArgs) {
    renderMessage({ content, duration, type: 'success' });
  },
  error({ content, duration }: MsgArgs) {
    renderMessage({ content, duration, type: 'error' });
  },
  warning({ content, duration }: MsgArgs) {
    renderMessage({ content, duration, type: 'warning' });
  },
  info({ content, duration }: MsgArgs) {
    renderMessage({ content, duration, type: 'warning' });
  },
};

export default message;
