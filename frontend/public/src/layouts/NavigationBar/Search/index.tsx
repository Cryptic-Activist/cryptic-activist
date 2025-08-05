'use client';

import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { DynamicIcon } from '@/components';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { getInitials } from '@/utils';
import { searchVendors } from '@/services/users';
import styles from './index.module.scss';
import { useDebounce } from '@/hooks';
import { useMutation } from '@tanstack/react-query';

interface FormValues {
  search: string;
}

const Search = () => {
  const [search, setSearch] = useState('');
  const [isInFocus, setIsInFocus] = useState(true);

  const { control, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      search: '',
    },
  });

  const watchedValues = watch();

  const { mutate, data, isSuccess } = useMutation({
    mutationFn: (searchTerm: string) => searchVendors(searchTerm),
  });

  const debouncedSearch = useDebounce((search: string) => {
    mutate(search);
  }, 1000);

  const onSubmit = (data: FormValues) => {
    setSearch(data.search);
  };

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    }
  }, [search]);

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="search"
          control={control}
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
          <ul className={styles.list}>
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
