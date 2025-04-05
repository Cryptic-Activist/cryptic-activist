'use client';

import { ChangeEvent, FC } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';

import type { ListTemplateProps } from './types';
import styles from './index.module.scss';
import { useNavigationBar } from '@/hooks';

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
        <header className={styles.header}>
          {heading && <h1 className={styles.heading}>{heading}</h1>}
          <button className={styles.closeBtn} onClick={closeModal}>
            <FaPlus size={18} />
          </button>
        </header>
        <div className={styles.search}>
          <input type="text" placeholder="Search" onChange={handleSearch} />
          <button>
            <FaSearch size={16} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default ListTemplate;
