'use client';

import { Controller, useForm } from 'react-hook-form';
import { useDebounce, useSearch } from '@/hooks';
import { useEffect, useState } from 'react';

import { DynamicIcon } from '@/components';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { getInitials } from '@/utils';
import { searchVendors } from '@/services/users';
import styles from './index.module.scss';
import { useMutation } from '@tanstack/react-query';

const Search = () => {
  const { form, setIsInFocus, isInFocus, data, isSuccess, search, setSearch } =
    useSearch();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.container}
        onSubmit={form.handleSubmit(form.onSubmit)}
        autoComplete="off"
      >
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
        <button className={styles.button}>
          <FaSearch />
        </button>
      </form>
      {isSuccess &&
        isInFocus &&
        search.length > 0 &&
        data &&
        data?.length > 0 && (
          <ul className={styles.list} onMouseDown={(e) => e.preventDefault()}>
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
    </div>
  );
};

export default Search;
