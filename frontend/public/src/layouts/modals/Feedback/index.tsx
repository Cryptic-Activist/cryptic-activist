'use client';

import { Altcha, Button, FeedbackSelector } from '@/components';

import { Template } from '@/layouts/modals';
import { TextArea } from '@/components/forms';
import styles from './index.module.scss';
import { useFeedback } from '@/hooks';

const Feedback = () => {
  const { errors, handleSubmit, onSubmit, register, handleFeedbackType } =
    useFeedback(false);

  return (
    <Template width="26rem" heading="Leave a Feedback">
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FeedbackSelector
            errorMessage={errors['type']?.message}
            onChange={handleFeedbackType}
          />
          <TextArea
            id="message"
            name="message"
            required
            label="Message"
            placeholder="Message"
            register={register}
            errorMessage={errors['message']?.message}
            // value={values.message}
          />

          <Altcha />

          <Button type="submit" padding="1rem" fullWidth>
            Submit Feedback
          </Button>
        </form>
      </div>
    </Template>
  );
};

export default Feedback;
