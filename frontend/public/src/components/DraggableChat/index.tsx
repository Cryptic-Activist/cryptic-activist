'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { PanInfo, animate, motion, useMotionValue } from 'motion/react';

import Chat from '../Chat';
import { ChatProps } from '../Chat/types';
import { FaComment } from 'react-icons/fa';
import styles from './index.module.scss';

const DraggableChat: FC<ChatProps> = (props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const [constraints, setConstraints] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dragged = useRef(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Recalculate constraints on mount and resize
  useEffect(() => {
    const updateConstraints = () => {
      const box = boxRef.current;
      if (!box) return;

      const boxRect = box.getBoundingClientRect();
      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;

      setConstraints({
        top: 0,
        bottom: window.innerHeight - boxHeight,
        left: 0,
        right: window.innerWidth - boxWidth,
      });
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  const handleDragEnd = () => {
    const box = boxRef.current;
    if (!box) return;

    const boxWidth = box.offsetWidth;
    const currentX = x.get();
    const currentY = y.get();

    const snapX =
      currentX + boxWidth / 2 < window.innerWidth / 2
        ? constraints.left
        : constraints.right;

    // Clamp Y position to stay within top/bottom constraints
    const snapY = Math.max(
      constraints.top,
      Math.min(currentY, constraints.bottom)
    );

    animate(x, snapX, { type: 'spring', stiffness: 300 });
    animate(y, snapY, { type: 'spring', stiffness: 300 });
  };

  return (
    <>
      <motion.div
        className={styles.floatingButton}
        drag
        dragMomentum={false}
        onDragStart={() => {
          dragged.current = false; // Reset on each new drag
        }}
        onDrag={() => {
          dragged.current = true;
        }}
        dragConstraints={{ left: 0, right: window.innerWidth }}
        onDragEnd={handleDragEnd}
        onClick={toggleChat}
        style={{
          x,
          y,
          cursor: 'grab',
        }}
      >
        <FaComment size={24} />
      </motion.div>

      {isOpen && <Chat {...props} />}
    </>
  );
};

export default DraggableChat;
