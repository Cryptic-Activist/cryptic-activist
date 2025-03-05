'use client';

import { ChangeEvent, FC } from 'react';
import { FaSearch } from 'react-icons/fa';

import { useNavigationBar } from '@/hooks';

import styles from './index.module.scss';
import type { ListTemplateProps } from './types';

const ListTemplate: FC<ListTemplateProps> = ({
  children,
  width,
  height,
  heading,
  onFilter,
}) => {
  const { resetNavigationBar } = useNavigationBar();

  const closeModal = () => {
    resetNavigationBar();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onFilter(value);
  };

  return (
    <>
      <div className={styles.bg} onClick={closeModal} />
      <div className={styles.container} style={{ width, height }}>
        {heading && <h1 className={styles.heading}>{heading}</h1>}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            autoFocus
          />
          <button>
            <FaSearch />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default ListTemplate;
