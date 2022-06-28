import React, { FC, FormEvent, InputHTMLAttributes, ReactNode } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  label?: string;
  error?: string | ReactNode;
  initInFocus?: boolean;
  icon?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
};

export const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  error,
  disabled,
  className = '',
  initInFocus = false,
  inputRef,
  icon,
  onChange,
  ...props
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const ownInputRef = React.useRef<HTMLInputElement>(null);
  const localInputRef = inputRef || ownInputRef;

  const idError = `input-${props.name}-error`;

  React.useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  React.useEffect(() => {
    if (isMounted && initInFocus && localInputRef.current) {
      localInputRef.current.focus();
    }
  }, [localInputRef, isMounted, initInFocus]);

  return (
    <div>
      <div>
        <label>
          <span>{label}</span>
          <input
            {...props}
            ref={localInputRef}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            aria-invalid={!!error}
          />
        </label>
        {icon && <span>{icon}</span>}
      </div>
      {!disabled && error && (
        <div role="alert" id={idError}>
          {error}
        </div>
      )}
    </div>
  );
};
