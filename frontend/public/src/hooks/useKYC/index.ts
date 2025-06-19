'use client';

import { Type, UploadedFiles } from './types';
import {
  getDocumentTypes,
  getNationalities,
  submitKYC,
} from '@/services/user/kyc';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';

import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { KYCFormResolver } from './zod';
import { SubmitKYCParams } from '@/services/user/kyc/types';
import { UploadKYCFilesParams } from '@/services/uploads/types';
import { processFileToUpload } from '@/utils';
import { uploadKYCFiles } from '@/services/uploads';
import { useForm } from 'react-hook-form';
import useUser from '../useUser';

const useKYC = () => {
  const { user, query } = useUser();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>([]);
  const selectedFileTypesRef = useRef<Set<Type>>(new Set());
  const [forceShowForm, setForceShowForm] = useState(false);

  const documentFrontRef = useRef<FileUploaderHandle>(null);
  const documentBackRef = useRef<FileUploaderHandle>(null);
  const selfieRef = useRef<FileUploaderHandle>(null);
  const utilityBillRef = useRef<FileUploaderHandle>(null);
  const bankStatementRef = useRef<FileUploaderHandle>(null);

  const { handleSubmit, register, setValue, getValues, watch } = useForm({
    resolver: KYCFormResolver,
  });

  const birthDate = watch('birthDate');
  const agreeTerms = watch('agreeTerms');
  const consentProcessing = watch('consentProcessing');
  const documentType = watch('documentType');

  const onSelectBirthDate = (date?: Date) => {
    if (date) {
      setValue('birthDate', date);
    }
  };

  const onCheckAgreeTerms = () => {
    const auxAgreeTerms = getValues('agreeTerms');
    setValue('agreeTerms', !auxAgreeTerms);
  };

  const onCheckConsentProcessing = () => {
    const auxConsentProcessing = getValues('consentProcessing');
    setValue('consentProcessing', !auxConsentProcessing);
  };

  const [nationalitiesListQuery, documentTypesListQuery] = useQueries({
    queries: [
      {
        queryKey: ['nationalities'],
        queryFn: getNationalities,
        enabled: !!user.id,
      },
      {
        queryKey: ['documentTypes'],
        queryFn: getDocumentTypes,
        enabled: !!user.id,
      },
    ],
  });

  const uploadDocumentFrontMutation = useMutation({
    mutationKey: ['uploadDocumentFront'],
    mutationFn: (params: UploadKYCFilesParams) => uploadKYCFiles(params),
  });

  const submitKYCMutation = useMutation({
    mutationKey: ['submitKYC'],
    mutationFn: async (params: SubmitKYCParams) => {
      if (user?.id) {
        const response = await submitKYC(params);
        return response;
      }
    },
    onSuccess: (data) => {
      console.log('KYC submitted successfully', data);
      if (data?.ok) {
        query.refetch();
      }
    },
  });

  const handleUploadAllFiles = () => {
    documentFrontRef.current?.upload();
    documentBackRef.current?.upload();
    selfieRef.current?.upload();
    utilityBillRef.current?.upload();
    bankStatementRef.current?.upload();
  };

  const onSelectDocumentFront = (files: File[]) => {
    setValue('documentFront.url', files[0].name);
    selectedFileTypesRef.current.add('DOCUMENT_FRONT');
  };

  const uploadDocumentFront = async (files: File[]) => {
    if (user?.id) {
      const formData = await processFileToUpload(files);
      const uploaded = await uploadDocumentFrontMutation.mutateAsync({
        formData,
        userId: user?.id,
      });
      setUploadedFiles((prev) => [
        ...prev,
        {
          type: 'DOCUMENT_FRONT',
          file: uploaded[0],
        },
      ]);
      setValue('documentFront.url', uploaded[0].url);
    }
  };

  const onSelectDocumentBack = (files: File[]) => {
    setValue('documentBack.url', files[0].name);
    selectedFileTypesRef.current.add('DOCUMENT_BACK');
  };

  const uploadDocumentBack = async (files: File[]) => {
    if (user?.id) {
      const formData = await processFileToUpload(files);
      const uploaded = await uploadDocumentFrontMutation.mutateAsync({
        formData,
        userId: user?.id,
      });
      setUploadedFiles((prev) => [
        ...prev,
        {
          type: 'DOCUMENT_BACK',
          file: uploaded[0],
        },
      ]);
      setValue('documentBack.url', uploaded[0].url);
    }
  };

  const onSelectSelfie = (files: File[]) => {
    setValue('selfie.url', files[0].name);
    selectedFileTypesRef.current.add('SELFIE');
  };

  const uploadSelfie = async (files: File[]) => {
    if (user?.id) {
      const formData = await processFileToUpload(files);
      const uploaded = await uploadDocumentFrontMutation.mutateAsync({
        formData,
        userId: user?.id,
      });
      setUploadedFiles((prev) => [
        ...prev,
        {
          type: 'SELFIE',
          file: uploaded[0],
        },
      ]);
      setValue('selfie.url', uploaded[0].url);
    }
  };

  const onSelectUtilityBill = (files: File[]) => {
    setValue('utilityBill.url', files[0].name);
    selectedFileTypesRef.current.add('UTILITY_BILL');
  };

  const uploadUtilityBill = async (files: File[]) => {
    if (user?.id) {
      const formData = await processFileToUpload(files);
      const uploaded = await uploadDocumentFrontMutation.mutateAsync({
        formData,
        userId: user?.id,
      });
      setUploadedFiles((prev) => [
        ...prev,
        {
          type: 'UTILITY_BILL',
          file: uploaded[0],
        },
      ]);
      setValue('utilityBill.url', uploaded[0].url);
    }
  };

  const onSelectBankStatement = (files: File[]) => {
    setValue('bankStatement.url', files[0].name);
    selectedFileTypesRef.current.add('BANK_STATEMENT');
  };

  const uploadBankStatement = async (files: File[]) => {
    if (user?.id) {
      const formData = await processFileToUpload(files);
      const uploaded = await uploadDocumentFrontMutation.mutateAsync({
        formData,
        userId: user?.id,
      });
      setUploadedFiles((prev) => [
        ...prev,
        {
          type: 'BANK_STATEMENT',
          file: uploaded[0],
        },
      ]);
      setValue('bankStatement.url', uploaded[0].url);
    }
  };

  const onSubmitKYC = (_data: any) => {
    handleUploadAllFiles();
  };

  const toggleForceShowForm = () => {
    setForceShowForm((prev) => !prev);
  };

  const showBackDocument =
    documentType &&
    documentTypesListQuery.data?.documentTypesWithBack.includes(documentType);

  const isKYCRejected = user?.kyc?.[0]?.status === 'REJECTED';
  const isKYCApproved = user?.kyc?.[0]?.status === 'VERIFIED';
  const isKYCPending = user?.kyc?.[0]?.status === 'PENDING';

  const showKYCForm = forceShowForm || !user?.kyc?.length;

  console.log({ forceShowForm, showKYCForm });

  useEffect(() => {
    if (showBackDocument && uploadedFiles.length < 3) {
      return;
    }
    if (!showBackDocument && uploadedFiles.length < 2) {
      return;
    }

    if (selectedFileTypesRef.current.size === uploadedFiles.length) {
      submitKYCMutation.mutate({
        files: uploadedFiles,
        fullName: getValues('fullName'),
        birthDate: getValues('birthDate').toString(),
        documentNumber: getValues('documentNumber'),
        documentType: getValues('documentType'),
        nationality: getValues('nationality'),
        agreeTerms: getValues('agreeTerms'),
        consentProcessing: getValues('consentProcessing'),
        additionalNotes: getValues('additionalNotes'),
        userId: user?.id || '',
      });
    }
  }, [showBackDocument, uploadedFiles, selectedFileTypesRef]);

  return {
    user,
    submitKYCMutation,
    showKYCForm,
    nationalitiesListQuery,
    documentTypesListQuery,
    showBackDocument,
    personalInformationValues: {
      birthDate,
    },
    termsAndSubmitValues: {
      agreeTerms,
      consentProcessing,
    },
    documentFrontRef,
    documentBackRef,
    selfieRef,
    utilityBillRef,
    bankStatementRef,
    uploadedFiles,
    isKYCApproved,
    isKYCRejected,
    isKYCPending,
    handleSubmit,
    register,
    setValue,
    watch,
    onSubmitKYC,
    onCheckAgreeTerms,
    onCheckConsentProcessing,
    onSelectBirthDate,
    uploadBankStatement,
    uploadDocumentBack,
    uploadDocumentFront,
    uploadSelfie,
    uploadUtilityBill,
    onSelectBankStatement,
    onSelectDocumentBack,
    onSelectDocumentFront,
    onSelectSelfie,
    onSelectUtilityBill,
    toggleForceShowForm,
  };
};

export default useKYC;
