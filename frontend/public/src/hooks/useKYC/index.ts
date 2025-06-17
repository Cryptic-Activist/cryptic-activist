'use client';

import { getDocumentTypes, getNationalities } from '@/services/user/kyc';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';

import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { KYCFormResolver } from './zod';
import { UploadKYCFilesParams } from '@/services/uploads/types';
import { UploadedFiles } from './types';
import { processFileToUpload } from '@/utils';
import { uploadKYCFiles } from '@/services/uploads';
import { useForm } from 'react-hook-form';
import useUser from '../useUser';

const useKYC = () => {
  const { user } = useUser();

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>([]);
  const documentFrontRef = useRef<FileUploaderHandle>(null);
  const documentBackRef = useRef<FileUploaderHandle>(null);
  const selfieRef = useRef<FileUploaderHandle>(null);
  const utilityBillRef = useRef<FileUploaderHandle>(null);
  const bankStatementRef = useRef<FileUploaderHandle>(null);

  const { handleSubmit, register, setValue, getValues, watch } = useForm({
    resolver: KYCFormResolver,
  });

  const showBackDocument =
    getValues('documentType') &&
    !['PASSPORT', 'BIRTH_CERTIFICATE', 'SOCIAL_SECURITY_CARD'].includes(
      getValues('documentType')
    );
  const birthDate = watch('birthDate');
  const agreeTerms = watch('agreeTerms');
  const consentProcessing = watch('consentProcessing');

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

  const handleUploadAllFiles = () => {
    documentFrontRef.current?.upload();
    documentBackRef.current?.upload();
    selfieRef.current?.upload();
    utilityBillRef.current?.upload();
    bankStatementRef.current?.upload();
  };

  const onSelectDocumentFront = (files: File[]) => {
    setValue('documentFront.url', files[0].name);
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

  const onSubmitKYC = (data: any) => {
    console.log({ data });
    handleUploadAllFiles();
  };

  useEffect(() => {
    if (showBackDocument && uploadedFiles.length < 5) {
      return;
    }
    if (!showBackDocument && uploadedFiles.length < 4) {
      return;
    }
    console.log({ uploadedFiles });
  }, [showBackDocument, uploadedFiles]);

  return {
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
  };
};

export default useKYC;
