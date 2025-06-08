import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import { disputeRequestResolver } from './zod';
import { getDisputeTypes } from '@/services/trade';
import { getSocket } from '@/services/socket';
import { processFileToUpload } from '@/utils';
import { uploadFiles } from '@/services/uploads';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import useTrade from '../useTrade';
import useUser from '../useUser';

const useDisputeRequest = () => {
  const { trade } = useTrade();
  const { user } = useUser();
  const uploaderRef = useRef<FileUploaderHandle>(null);

  const { register, handleSubmit, getValues } = useForm({
    resolver: disputeRequestResolver,
  });

  const validateSubmitForm = async (_data: any) => {
    handleEvidenceUpload();
  };

  const disputeTypesQuery = useQuery({
    queryKey: ['disputeTypes'],
    queryFn: getDisputeTypes,
    enabled: !!trade.id,
  });

  const handleEvidenceUpload = () => {
    uploaderRef.current?.upload();
  };

  const onUploadEvidences = async (files: File[]) => {
    const socket = getSocket();
    if (socket.connected && trade.chat?.id && user.id) {
      const formData = await processFileToUpload(files);
      const uploadedFiles = await uploadFiles(formData);

      const from = user.id;
      const to =
        trade.vendor?.id === user.id ? trade.trader?.id : trade.vendor?.id;
      socket.emit('trade_set_disputed', {
        chatId: trade.chat.id,
        type: getValues('type'),
        reason: getValues('reason'),
        evidence: uploadedFiles,
        from,
        to,
      });
      console.log({ uploadedFiles });
    }
  };

  return {
    validateSubmitForm,
    register,
    handleSubmit,
    handleEvidenceUpload,
    onUploadEvidences,
    disputeTypesQuery,
    uploaderRef,
  };
};

export default useDisputeRequest;
