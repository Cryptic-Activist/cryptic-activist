'use client';

import {
  FaRegFaceFrownOpen,
  FaRegFaceMeh,
  FaRegFaceSmile,
} from 'react-icons/fa6';
import { FeedbackList, FeedbackSelectorProps, Type } from './types';
import React, { FC, Fragment, useEffect, useState } from 'react';

import styles from './index.module.scss';

const FeedbackSelector: FC<FeedbackSelectorProps> = ({
  errorMessage,
  onChange,
}) => {
  const [selectedNum, setSelectedNum] = useState<number>();

  const feedbackList: FeedbackList = [
    {
      value: 'POSITIVE',
      label: <FaRegFaceSmile size={32} />,
    },
    {
      value: 'NEUTRAL',
      label: <FaRegFaceMeh size={32} />,
    },
    {
      value: 'NEGATIVE',
      label: <FaRegFaceFrownOpen size={32} />,
    },
  ];

  const handleSelectFeedback = (feedbackIndex: number) => {
    setSelectedNum(feedbackIndex);
  };

  useEffect(() => {
    if (typeof selectedNum !== 'undefined') {
      const selectedFeedback = (
        typeof selectedNum !== 'undefined'
          ? feedbackList[selectedNum].value
          : undefined
      ) as Type;
      onChange(selectedFeedback);
    }
  }, [selectedNum]);

  return (
    <div>
      <div className={styles.container}>
        {feedbackList.map((btn, index) => {
          const isLast = index === feedbackList.length - 1;
          const isSelected = selectedNum === index;
          return (
            <Fragment key={index}>
              <button
                type="button"
                className={`${styles.btn} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleSelectFeedback(index)}
              >
                {btn.label}
              </button>
              {!isLast && <div className={styles.separator} />}
            </Fragment>
          );
        })}
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default FeedbackSelector;
