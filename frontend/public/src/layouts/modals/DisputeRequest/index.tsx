'use client';

import { Select, TextArea } from '@/components/forms';

import { Button } from '@/components';
import { Template } from '@/layouts/modals';
import { formatEnum } from '@/utils';
import styles from './index.module.scss';
import useDisputeRequest from '@/hooks/useDisputeRequest';

const DisputeRequest = () => {
  const { handleSubmit, submitDisputeRequest, register, disputeTypesQuery } =
    useDisputeRequest();

  return (
    <Template width="20rem" heading="Dispute Request">
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(submitDisputeRequest)}
          className={styles.form}
        >
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

          <Button type="submit" padding="1rem" fullWidth>
            Request Dispute
          </Button>
        </form>
      </div>
    </Template>
  );
};

export default DisputeRequest;
