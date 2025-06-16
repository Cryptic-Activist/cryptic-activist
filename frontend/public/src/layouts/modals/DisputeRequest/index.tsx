'use client';

import { FileUploader, Select, TextArea } from '@/components/forms';

import { Button } from '@/components';
import { Template } from '@/layouts/modals';
import { formatEnum } from '@/utils';
import styles from './index.module.scss';
import useDisputeRequest from '@/hooks/useDisputeRequest';

const DisputeRequest = () => {
  const {
    handleSubmit,
    validateSubmitForm,
    register,
    onUploadEvidences,
    disputeTypesQuery,
    uploaderRef,
  } = useDisputeRequest();

  return (
    <Template width="45rem" heading="Dispute Request">
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(validateSubmitForm)}
          className={styles.form}
        >
          <div className={styles.columns}>
            <div className={styles.column}>
              <Select
                id="type"
                name="type"
                register={register}
                label="Dispute Type"
                options={[
                  { label: '-----------------', value: '' },
                  ...(disputeTypesQuery.data
                    ? disputeTypesQuery.data?.map((filter: any) => ({
                        label: formatEnum(filter),
                        value: filter,
                      }))
                    : []),
                ]}
              />
              <TextArea
                id="reason"
                name="reason"
                register={register}
                placeholder="Reason for dispute"
                required
                label="Reason"
              />
            </div>
            <div className={styles.column}>
              <FileUploader
                allowMultiple
                allowedFileTypes={[
                  'image/jpeg',
                  'image/png',
                  'image/webp',
                  // 'application/pdf',
                ]}
                maxFileSize={2 * 1024 * 1024} // 1MB
                maxFiles={4}
                label="Upload Evidence"
                onUpload={onUploadEvidences}
                ref={uploaderRef}
              />
            </div>
          </div>
          <Button type="submit" padding="1rem" fullWidth>
            Request Dispute
          </Button>
        </form>
      </div>
    </Template>
  );
};

export default DisputeRequest;
