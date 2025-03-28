'use client';

import { ChatProps, ContentProps, HeaderProps, InputsProps } from './types';
import { FaCircle, FaPaperPlane, FaPaperclip } from 'react-icons/fa6';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { formatTimestamp, timeSince } from '@/utils';

import { FaEllipsisV } from 'react-icons/fa';
import styles from './index.module.scss';
import { useSocket } from '@/hooks';

const Header: FC<HeaderProps> = ({ receiver, sender: _sender }) => {
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

const Content: FC<ContentProps> = ({
  receiver: _receiver,
  sender,
  messages,
}) => {
  return (
    <ul className={styles.list}>
      {messages.map((message, index) => {
        const messageStyle =
          message.user.id === sender.id ? styles.sender : styles.receiver;
        return (
          <li key={index} className={`${styles.listItem} ${messageStyle}`}>
            <div className={styles.usernameTime}>
              <span className={styles.username}>{message.user.username}</span>
              <span className={styles.time}>
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
            <p className={styles.message}>{message.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

const Inputs: FC<InputsProps> = ({
  receiver: _receiver,
  sender: _sender,
  sendMessage,
}) => {
  const [message, setMessage] = useState('');

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setMessage(value);
  };

  return (
    <form className={styles.inputs} onSubmit={submitMessage}>
      <button className={styles.button} title="Attachments">
        <FaPaperclip size={20} />
      </button>
      <textarea
        className={styles.textarea}
        onChange={onChangeMessage}
        value={message}
      />
      <button className={styles.button} title="Send message" type="submit">
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

const Chat: FC<ChatProps> = ({ receiver, sender, trade }) => {
  const { sendMessage, messages } = useSocket({
    roomId: trade.chat?.id,
    user: trade.trader,
  });

  return (
    <div className={styles.container}>
      <Header receiver={receiver} sender={sender} />
      <Content receiver={receiver} sender={sender} messages={messages} />
      <Inputs receiver={receiver} sender={sender} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
