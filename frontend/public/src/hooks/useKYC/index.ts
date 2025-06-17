'use client';

import {
  additionalDocumentsResolver,
  documentInformationResolver,
  documentUploadResolver,
  personalInformationResolver,
  selfieVerificationResolver,
  termsAndSubmitResolver,
} from './zod';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';

import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { UploadKYCFilesParams } from '@/services/uploads/types';
import { UploadedFiles } from './types';
import { processFileToUpload } from '@/utils';
import { uploadKYCFiles } from '@/services/uploads';
import { useForm } from 'react-hook-form';
import useUser from '../useUser';

const useKYC = () => {
  const { user } = useUser();

  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>([]);
  const documentFrontRef = useRef<FileUploaderHandle>(null);
  const documentBackRef = useRef<FileUploaderHandle>(null);
  const selfieRef = useRef<FileUploaderHandle>(null);
  const utilityBillRef = useRef<FileUploaderHandle>(null);
  const bankStatementRef = useRef<FileUploaderHandle>(null);

  const {
    handleSubmit: handleSubmitPersonalInformation,
    register: registerPersonalInformation,
    setValue: setValuePersonalInformation,
    watch: watchPersonalInformation,
  } = useForm({
    resolver: personalInformationResolver,
  });
  const {
    getValues: getValuesDocumentInformation,
    handleSubmit: handleSubmitDocumentInformation,
    register: registerDocumentInformation,
  } = useForm({
    resolver: documentInformationResolver,
  });
  const {
    handleSubmit: handleSubmitDocumentUpload,
    register: registerDocumentUpload,
    setValue: setValueDocumentUpload,
  } = useForm({
    resolver: documentUploadResolver,
  });
  const {
    handleSubmit: handleSubmitSelfieVerification,
    register: registerSelfieVerification,
  } = useForm({
    resolver: selfieVerificationResolver,
  });
  const {
    handleSubmit: handleSubmitAdditionalDocuments,
    register: registerAdditionalDocuments,
  } = useForm({
    resolver: additionalDocumentsResolver,
  });
  const {
    handleSubmit: handleSubmitTermsAndSubmit,
    register: registerTermsAndSubmit,
    watch: watchTermsAndSubmit,
    getValues: getValuesTermsAndSubmit,
    setValue: setValueTermsAndSubmit,
  } = useForm({
    resolver: termsAndSubmitResolver,
  });

  const onNextStep = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };

  const onPreviousStep = () => {
    setStep((prev) => {
      return prev - 1;
    });
  };

  const showBackDocument =
    getValuesDocumentInformation('documentType') &&
    !['PASSPORT', 'BIRTH_CERTIFICATE', 'SOCIAL_SECURITY_CARD'].includes(
      getValuesDocumentInformation('documentType')
    );
  const birthDate = watchPersonalInformation('birthDate');
  const agreeTerms = watchTermsAndSubmit('agreeTerms');
  const consentProcessing = watchTermsAndSubmit('consentProcessing');

  const onSelectBirthDate = (date?: Date) => {
    if (date) {
      setValuePersonalInformation('birthDate', date);
    }
  };

  const onCheckAgreeTerms = () => {
    const auxAgreeTerms = getValuesTermsAndSubmit('agreeTerms');
    setValueTermsAndSubmit('agreeTerms', !auxAgreeTerms);
  };

  const onCheckConsentProcessing = () => {
    const auxConsentProcessing = getValuesTermsAndSubmit('consentProcessing');
    setValueTermsAndSubmit('consentProcessing', !auxConsentProcessing);
  };

  const [nationalitiesListQuery, documentTypesListQuery] = useQueries({
    queries: [],
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
      setValueDocumentUpload('documentFront.url', uploaded[0].url);
    }
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
      setValueDocumentUpload('documentBack.url', uploaded[0].url);
    }
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
    }
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
    }
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
    }
  };

  const onSubmitPersonalInformation = (data: any) => {
    console.log({ data });
    onNextStep();
  };

  const onSubmitDocumentInformation = (data: any) => {
    console.log({ data });
    onNextStep();
  };

  const onSubmitDocumentUpload = (data: any) => {
    console.log({ data });
    onNextStep();
  };

  const onSubmitSelfieVerification = (data: any) => {
    console.log({ data });
    onNextStep();
  };

  const onSubmitAdditionalDocuments = (data: any) => {
    console.log({ data });
    onNextStep();
  };

  const onSubmitTermsAndSubmit = (data: any) => {
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
    step,
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
    onNextStep,
    onPreviousStep,
    handleSubmitPersonalInformation,
    handleSubmitDocumentInformation,
    handleSubmitDocumentUpload,
    handleSubmitSelfieVerification,
    handleSubmitAdditionalDocuments,
    handleSubmitTermsAndSubmit,
    onSubmitPersonalInformation,
    onSubmitDocumentInformation,
    onSubmitDocumentUpload,
    onSubmitSelfieVerification,
    onSubmitAdditionalDocuments,
    onSubmitTermsAndSubmit,
    registerAdditionalDocuments,
    registerDocumentInformation,
    registerDocumentUpload,
    registerPersonalInformation,
    registerSelfieVerification,
    registerTermsAndSubmit,
    onCheckAgreeTerms,
    onCheckConsentProcessing,
    onSelectBirthDate,
    uploadBankStatement,
    uploadDocumentBack,
    uploadDocumentFront,
    uploadSelfie,
    uploadUtilityBill,
  };
};

export default useKYC;
