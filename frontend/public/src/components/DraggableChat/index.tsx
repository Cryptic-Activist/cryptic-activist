'use client';

import Chat from '../Chat';
import { FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import { useState } from 'react';

const DraggableChat = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          className={styles.floatingButton}
          drag
          dragMomentum={false}
          onClick={toggleChat}
        >
          <FaComment size={24} />
        </motion.div>
      )}
      {isOpen && (
        <motion.div
          className={styles.draggableContainer}
          drag
          dragMomentum={false}
        >
          <div className={styles.chatHeader} onDoubleClick={toggleChat}>
            <p>Chat</p>
          </div>
          <Chat {...props} />
        </motion.div>
      )}
    </>
  );
};

export default DraggableChat;
