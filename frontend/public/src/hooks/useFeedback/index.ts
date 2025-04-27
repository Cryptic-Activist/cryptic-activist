'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Type } from '@/components/FeedbackSelector/types';
import { getTradeDetails } from '@/services/trade';
import { leaveAFeedbackResolver } from './zod';
import { onSubmitFeedback } from '@/services/feedback';
import useApp from '../useApp';
import { useForm } from 'react-hook-form';
import useNavigationBar from '../useNavigationBar';
import { useParams } from 'next/navigation';

const useFeedback = (enabled: boolean) => {
  const params = useParams();
  const id = params.id?.toString();
  const { setValue: setValueApp, app } = useApp();
  const { toggleModal } = useNavigationBar();

  const query = useQuery({
    queryKey: ['tradeDetails'],
    queryFn: async () => {
      if (id) {
        const details = await getTradeDetails(id);
        return details;
      }
    },
    enabled: !!id && enabled,
    retry: 3,
  });
  const mutation = useMutation({
    mutationKey: ['leaveFeedback'],
    mutationFn: onSubmitFeedback,
    onSuccess(data) {
      console.log({ dataSuccess: data });
    },
    retry: 3,
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: leaveAFeedbackResolver });

  const [leftAFeedback, setLeftAFeedback] = useState(false);

  useEffect(() => {
    if (query.data?.cryptocurrency) {
      setValueApp({
        defaults: {
          cryptocurrency: query.data?.cryptocurrency,
        },
      });
    }
    if (query.data?.fiat) {
      setValueApp({
        defaults: {
          fiat: query.data?.fiat,
        },
      });
    }
  }, [query.data?.cryptocurrency, query.data?.fiat]);

  const onSubmit = async (data: any) => {
    console.log({ data });
    const feedbackSubmit = await mutation.mutateAsync(data);

    if (feedbackSubmit.ok) {
      toggleModal('feedback');
    }
  };

  useEffect(() => {
    if (mutation.data && mutation.data.ok) {
      setLeftAFeedback(true);
    }
  }, [mutation.data]);

  const handleFeedbackType = (type: Type) => {
    console.log({ type });
    setValue('type', type);
  };

  useEffect(() => {
    if (id) {
      setValue('tradeId', id);
    }
  }, [id]);

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFeedbackType,
    values: {
      message: getValues('message'),
    },
    errors,
    query,
    mutation,
    leftAFeedback,
    app,
  };
};

export default useFeedback;
