import React, { FC, Fragment } from 'react';

import type { FormProps } from './types';
import styles from './index.module.scss';
import { useForm } from 'react-hook-form';

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
                {/* @ts-ignore */}
                {child.props.name
                  ? React.createElement(child.type, {
                      ...{
                        // @ts-ignore
                        ...child.props,
                        register,
                        // @ts-ignore
                        key: child.props.name,
                      },
                    })
                  : child}
                {/* @ts-ignore */}
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
