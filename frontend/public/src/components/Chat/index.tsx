'use client';

import { ChatProps, ContentProps, HeaderProps, InputsProps } from './types';
import { FaCircle, FaPaperPlane, FaPaperclip } from 'react-icons/fa6';
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';

import { FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';
import { formatTimestamp } from '@/utils';
import styles from './index.module.scss';
import { useOutsideClick } from '@/hooks';

const Header: FC<HeaderProps> = ({
  receiver,
  sender: _sender,
  receiverStatus,
}) => {
  const indicatorStyle =
    receiverStatus === 'online' ? styles.online : styles.offline;

  const [isChatHeaderMenuOpen, setIsChatHeaderMenuOpen] = useState(false);

  const toggleChatHeaderMenu = () => {
    setIsChatHeaderMenuOpen((prev) => !prev);
  };

  const handleBlockUser = () => {
    toggleChatHeaderMenu();
  };

  const handleReportUser = () => {
    toggleChatHeaderMenu();
  };

  const ref = useOutsideClick(toggleChatHeaderMenu);

  return (
    <header className={styles.header}>
      <div className={styles.vendor}>
        <div
          className={styles.profileColor}
          style={{ backgroundColor: receiver?.profileColor }}
        />
        <div className={styles.names}>
          <span className={styles.username}>{receiver?.username}</span>
          <div className={`${styles.status} ${indicatorStyle}`}>
            {receiver.id && receiverStatus === 'online' && (
              <>
                <FaCircle size={8} className={styles.indicator} />
                <span className={styles.lastSeen}>Online</span>
              </>
            )}
            {/* <FaCircle size={8} className={styles.indicator} />
            <span className={styles.lastSeen}>
              {receiverStatus === 'online'
                ? 'Online'
                : timeSince(receiver?.lastLoginAt)}
            </span> */}
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={toggleChatHeaderMenu}>
          <FaEllipsisV size={18} />
        </button>
        {isChatHeaderMenuOpen && (
          <div className={styles.menuContent} ref={ref}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link
                  href={`/vendor/${receiver.id}`}
                  onClick={toggleChatHeaderMenu}
                >
                  View Profile
                </Link>
              </li>
              <li className={styles.menuItem}>
                <button onClick={handleBlockUser}>Block User</button>
              </li>
              <li className={styles.menuItem}>
                <button onClick={handleReportUser}>Report User</button>
              </li>
            </ul>
          </div>
        )}
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
          sender?.id === message.from ? styles.sender : styles.receiver;

        const isInfoMessage = message.type === 'info';

        if (isInfoMessage) {
          return (
            <li key={index} className={styles.listItemChatInfo}>
              <p className={styles.infoMessage}>{message.message}</p>
            </li>
          );
        }

        return (
          <li key={index} className={`${styles.listItem} ${messageStyle}`}>
            <div className={styles.message}>
              <p>{message.message}</p>
              <span className={styles.time}>
                {formatTimestamp(message.createdAt)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const Inputs: FC<InputsProps> = ({ receiver, sender, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendMessage({
        content: {
          from: sender.id,
          to: receiver.id,
          message,
          createdAt: Date(),
        },
      });
      setMessage('');
    }
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setMessage(value);
  };

  const onKeyDownInput = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === 'Enter') {
      return;
    }
    if (e.key === 'Enter') {
      handleSendMessage();
      e.currentTarget.focus();
      e.currentTarget.setSelectionRange(0, 0);
    }
  };

  useEffect(() => {
    if (message === '\n') {
      setMessage('');
    }
  }, [message]);

  return (
    <form className={styles.inputs} onSubmit={submitMessage}>
      <button className={styles.button} title="Attachments">
        <FaPaperclip size={20} />
      </button>
      <textarea
        className={styles.textarea}
        onChange={onChangeMessage}
        value={message}
        onKeyDown={onKeyDownInput}
      />
      <button className={styles.button} title="Send message" type="submit">
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

const Chat: FC<ChatProps> = ({
  receiverStatus,
  messages,
  onSendMessage,
  receiver,
  sender,
}) => {
  return (
    <div className={styles.container}>
      <Header
        receiver={receiver}
        sender={sender}
        receiverStatus={receiverStatus}
      />
      <Content receiver={receiver} sender={sender} messages={messages} />
      <Inputs receiver={receiver} sender={sender} sendMessage={onSendMessage} />
    </div>
  );
};

export default Chat;
