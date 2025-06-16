'use client';

import { leaveAFeedbackResolver, moreEvidencesResolver } from './zod';
import { onSubmitFeedback, submitMoreEvidences } from '@/services/feedback';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { OnSubmitMoreEvidences } from '@/services/feedback/types';
import { Type } from '@/components/FeedbackSelector/types';
import { getTradeDetails } from '@/services/trade';
import { processFileToUpload } from '@/utils';
import { uploadFiles } from '@/services/uploads';
import useApp from '../useApp';
import { useForm } from 'react-hook-form';
import useNavigationBar from '../useNavigationBar';
import { useParams } from 'next/navigation';
import useUser from '../useUser';

const useFeedback = (enabled: boolean) => {
  const params = useParams();
  const id = params.id?.toString();
  const { setValue: setValueApp, app } = useApp();
  const { toggleModal } = useNavigationBar();
  const { user } = useUser();
  const uploaderRef = useRef<FileUploaderHandle>(null);

  const query = useQuery({
    queryKey: ['tradeDetails', id],
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
      if (data.ok) {
        query.refetch();
        toggleModal('feedback');
      }
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

  const {
    handleSubmit: handleSubmitMoreEvidences,
    getValues: getValuesMoreEvidences,
    setValue: setValueMoreEvidences,
  } = useForm({ resolver: moreEvidencesResolver });

  const [leftAFeedback, setLeftAFeedback] = useState(false);

  const submitMoreEvidencesMutation = useMutation({
    mutationKey: ['subMoreEvidences'],
    mutationFn: async (params: OnSubmitMoreEvidences) =>
      submitMoreEvidences(params),
    onSuccess: () => query.refetch(),
  });

  const handleEvidenceUpload = () => {
    uploaderRef.current?.upload();
  };

  const onUploadEvidences = async (files: File[]) => {
    if (query.data?.tradeDetails?.tradeDispute.id && user.id) {
      const formData = await processFileToUpload(files);
      const uploadedFiles = await uploadFiles(formData);

      submitMoreEvidencesMutation.mutate({
        disputeId: query.data?.tradeDetails?.tradeDispute?.id,
        userId: user.id,
        evidences: uploadedFiles,
      });
    }
  };

  const onSubmitMoreEvidences = () => {
    handleEvidenceUpload();
  };

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
    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.data && mutation.data.ok) {
      setLeftAFeedback(true);
    }
  }, [mutation.data]);

  const handleFeedbackType = (type: Type) => {
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
    onUploadEvidences,
    handleEvidenceUpload,
    handleSubmitMoreEvidences,
    getValuesMoreEvidences,
    setValueMoreEvidences,
    onSubmitMoreEvidences,
    uploaderRef,
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
