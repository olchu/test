import { Formik } from 'formik';
import { useState } from 'react';
import { FormSmsCodeInput } from './FormSmsCodeInput';

export const AuthSmsForm = () => {
  const [state, setState] = useState(false);
  const [code, setCode] = useState('');
  return (
    <div>
      {state ? (
        <div>
          it s ok
          <div> your code is {code}</div>
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            code: '',
          }}
          onSubmit={(values) => {
            setCode(values.code);
            setState(true);
          }}
        >
          {(formik) => {
            return (
              <form name="phone" onSubmit={formik.handleSubmit}>
                <FormSmsCodeInput
                  name="code"
                  label="code sms"
                  error={formik.errors.code}
                  autoComplete="one-time-code"
                  initInFocus
                  onConplete={() => {
                    console.log('formik.values.code', formik.values.code);
                    alert(`Привет папа ${formik.values.code}`);
                  }}
                />
                <button type="submit">отправить</button>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};
