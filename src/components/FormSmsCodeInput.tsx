import React from 'react';
import { Input, InputProps } from './Input';
import { useField, useFormikContext } from 'formik';
import { useReadOtp } from './useReadOtp';

export const FormSmsCodeInput = ({
  name,
  error,
  initInFocus,
  disabled,
  onConplete,
  ...props
}: Omit<InputProps, 'name' | 'onChange' | 'onBlur' | 'value'> & {
  name: string;
  error?: string;
  onConplete: () => void;
}) => {
  const { isSubmitting, submitCount, setValues, submitForm } =
    useFormikContext();
  const [field, meta] = useField({ name });

  const handleOnChange = field.onChange;

  const handleReadOtp = (code: string) => {
    if (code.length === 0) {
      return;
    }
    alert(`handleReadOtp ${code}`);
    setValues({ [name]: code });
    submitForm();
  };

  useReadOtp(handleReadOtp, {
    enabled: true,
    // enabled: !disabled && !value,
  });

  return (
    <div>
      <Input
        {...props}
        {...field}
        onChange={handleOnChange}
        initInFocus={initInFocus}
        name={name}
        error={
          error || (submitCount > 0 || !!field.value ? meta.error : undefined)
        }
        disabled={disabled || isSubmitting}
      />
      <br />
      <br />
      <br />
      <br />
      <div onClick={() => handleReadOtp('123')}>test handle</div>
      <br />
      <br />
      <br />
    </div>
  );
};
