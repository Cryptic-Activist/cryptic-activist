'use client';

import React, { useEffect, useState } from 'react';

import { FormValues } from './types';
import { searchVendors } from '@/services/users';
import useDebounce from '../useDebounce';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [isInFocus, setIsInFocus] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    }
  }, [search]);

  console.log({ isFormOpen });

  return {
    data,
    isSuccess,
    search,
    setSearch,
    isInFocus,
    setIsInFocus,
    toggleForm,
    isFormOpen,
    form: {
      control,
      handleSubmit,
      onSubmit,
      watchedValues,
      reset,
    },
  };
};

export default useSearch;
