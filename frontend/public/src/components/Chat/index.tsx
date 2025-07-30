'use client';

import { ChatProps, ContentProps, HeaderProps, InputsProps } from './types';
import {
  FaCircle,
  FaPaperPlane,
  FaPaperclip,
  FaPlus,
  FaXmark,
} from 'react-icons/fa6';
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';

import { FaEllipsisV } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { UploadedFile } from '@/hooks/useTradeSocket/types';
import Viewer from '../Viewer';
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
  const [fileInView, setFileInView] = useState<any>(null);

  const openViewer = (file: any) => {
    setFileInView(file);
  };

  const closeViewer = () => {
    setFileInView(null);
  };

  const viewerRef = useOutsideClick(closeViewer);

  return (
    <>
      {fileInView && (
        <Viewer
          onClose={closeViewer}
          key={fileInView.key}
          ref={viewerRef}
          src={fileInView.key}
        />
      )}
      <ul className={styles.list}>
        {messages.map((message, index) => {
          const isSender = sender?.id === message.from;
          const messageStyle = isSender ? styles.sender : styles.receiver;
          const attachmentStyle = isSender
            ? styles.attachmentSender
            : styles.attachmentReceiver;

          const isInfoMessage = message.type === 'info';

          if (isInfoMessage) {
            return (
              <li key={index} className={styles.listItemChatInfo}>
                <p className={styles.infoMessage}>{message.message}</p>
              </li>
            );
          }

          console.log({ messageAttachment: message });

          return (
            <li
              key={index}
              className={`${styles.listItem} ${messageStyle} ${attachmentStyle}`}
            >
              {message.attachment && (
                <div
                  className={styles.attachmentFile}
                  style={{
                    backgroundImage: `url(${
                      // @ts-ignore
                      message.attachment.key
                    })`,
                  }}
                  onClick={() => openViewer(message.attachment)}
                />
              )}
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
    </>
  );
};

const Inputs: FC<InputsProps> = ({ receiver, sender, sendMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 0 || file) {
      sendMessage({
        content: {
          from: sender.id,
          to: receiver.id,
          message: trimmedMessage,
          attachment: file,
          createdAt: Date(),
        },
      });
      setMessage('');
      setFile(null);
      setPreview(null);
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
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      const fileUrl = URL.createObjectURL(blob);
      setPreview(fileUrl);
    }
  };

  const handleClearAttachment = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form className={styles.inputs} onSubmit={submitMessage}>
      {preview && (
        <div className={styles.filePreview}>
          <img
            src={preview}
            alt="File preview"
            className={styles.previewImage}
          />
          <button
            onClick={handleClearAttachment}
            className={styles.clearButton}
          >
            <FaXmark />
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        className={styles.button}
        title="Attachments"
        onClick={handleAttachmentClick}
        type="button"
      >
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
