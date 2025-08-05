'use client';

import { Brand, DynamicIcon } from '@/components';
import { FaBars, FaPlus } from 'react-icons/fa6';
import { useApp, useNavigationBar, useSearch } from '@/hooks';

import { Controller } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Menu from './Menu';
import Search from './Search';
import { getInitials } from '@/utils';
import styles from './index.module.scss';

const NavigationBar = () => {
  const { app } = useApp();
  const { handleToggleDrawer } = useNavigationBar();
  const {
    form,
    setIsInFocus,
    isInFocus,
    data,
    isSuccess,
    search,
    setSearch,
    toggleForm,
    isFormOpen,
  } = useSearch();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Brand />
        {app.isMobile ? (
          <div className={styles.mobileSearchMenu}>
            <button className={styles.drawerToggler} onClick={toggleForm}>
              <FaSearch size={22} />
            </button>
            <button
              className={styles.drawerToggler}
              onClick={handleToggleDrawer}
            >
              <FaBars size={24} />
            </button>
          </div>
        ) : (
          <div className={styles.searchMenu}>
            <Search />
            <Menu />
          </div>
        )}
      </div>
      {isFormOpen && (
        <form className={styles.mobileSearchForm} autoComplete="off">
          <Controller
            name="search"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={styles.input}
                placeholder="Search..."
                onFocus={() => setIsInFocus(true)}
                onBlur={() => setIsInFocus(false)}
                onChange={(e) => {
                  field.onChange(e);
                  setSearch(e.target.value);
                }}
              />
            )}
          />
          <button className={styles.closeButton} onClick={toggleForm}>
            <FaPlus size={24} />
          </button>
        </form>
      )}
      {isSuccess &&
        isInFocus &&
        search.length > 0 &&
        data &&
        data?.length > 0 && (
          <ul
            className={styles.list}
            onMouseDown={(e) => e.preventDefault()}
            onFocus={() => setIsInFocus(true)}
            onBlur={() => setIsInFocus(false)}
          >
            {data?.map((vendor: any, index: number) => {
              const fullName = `${vendor.firstName} ${vendor.lastName}`;
              const hasKYC =
                vendor?.kyc &&
                vendor?.kyc?.length > 0 &&
                vendor?.kyc[0].status === 'VERIFIED';

              console.log({ vendorID: vendor.id });
              return (
                <li key={index} className={styles.listItem}>
                  <Link href={`/vendor/${vendor.id}`}>
                    <div
                      className={styles.initials}
                      style={{
                        backgroundColor: vendor.profileColor,
                      }}
                    >
                      {getInitials(vendor.firstName, vendor.lastName)}
                    </div>
                    <div className={styles.itemContent}>
                      <div className={styles.namesUsername}>
                        <div className={styles.namesVerified}>
                          <strong>{fullName}</strong>
                          {hasKYC && (
                            <span className={styles.check}>
                              <DynamicIcon iconName="FaCheck" size={12} />
                            </span>
                          )}
                        </div>
                        <span>{vendor.username}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
    </nav>
  );
};

export default NavigationBar;
