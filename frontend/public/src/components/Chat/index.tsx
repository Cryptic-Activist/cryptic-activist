import { ChatProps, ContentProps, HeaderProps, InputsProps } from './types';
import { FaCircle, FaPaperPlane, FaPaperclip } from 'react-icons/fa6';
import React, { FC } from 'react';

import { FaEllipsisV } from 'react-icons/fa';
import styles from './index.module.scss';
import { timeSince } from '@/utils';

const Header: FC<HeaderProps> = ({ receiver, sender }) => {
  return (
    <header className={styles.header}>
      <div className={styles.vendor}>
        <div
          className={styles.profileColor}
          style={{ backgroundColor: receiver.profileColor }}
        />
        <div className={styles.names}>
          <span className={styles.username}>{receiver.username}</span>
          <div className={styles.status}>
            <FaCircle size={8} className={styles.indicator} />
            <span className={styles.lastSeen}>
              {timeSince(receiver.lastLoginAt)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <button className={styles.menuButton}>
          <FaEllipsisV size={18} />
        </button>
      </div>
    </header>
  );
};

const Content: FC<ContentProps> = ({ receiver, sender }) => {
  return (
    <div className={styles.content}>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
    </div>
  );
};

const Inputs: FC<InputsProps> = ({ receiver, sender }) => {
  return (
    <form className={styles.inputs}>
      <button className={styles.button} title="Attachments">
        <FaPaperclip size={20} />
      </button>
      <input className={styles.input} />
      <button className={styles.button} title="Send message" type="submit">
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

const Chat: FC<ChatProps> = ({ receiver, sender }) => {
  return (
    <div className={styles.container}>
      <Header receiver={receiver} sender={sender} />
      <Content receiver={receiver} sender={sender} />
      <Inputs receiver={receiver} sender={sender} />
    </div>
  );
};

export default Chat;
