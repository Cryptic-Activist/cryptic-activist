import React, { FC, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import styles from './index.module.scss';
import type { FormProps } from './types';

const Form: FC<FormProps> = ({
  defaultValues,
  onSubmit,
  children,
  resolver,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues, resolver });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {Array.isArray(children)
        ? children.map((child, index) => {
            return (
              <Fragment key={index}>
                {child.props.name
                  ? React.createElement(child.type, {
                      ...{
                        ...child.props,
                        register,
                        key: child.props.name,
                      },
                    })
                  : child}
                {errors[child.props.name] && (
                  <span className={styles.errorMessage}>
                    {/* @ts-ignore */}
                    {errors[child.props.name]?.message}
                  </span>
                )}
              </Fragment>
            );
          })
        : children}
    </form>
  );
};

export default Form;
