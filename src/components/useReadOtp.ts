/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-assign */
import { useEffect, useRef } from 'react';

interface Option {
  enabled?: boolean;
  onError?(err: Error): void;
}
interface State {
  abortController?: AbortController;
}

const isSupported = (): boolean => {
  return 'OTPCredential' in window && typeof AbortController !== 'undefined';
};

const readCode = async (controller: AbortController): Promise<string> => {
  const content: any = await navigator.credentials.get({
    signal: controller.signal,
    otp: { transport: ['sms'] },
  } as any);

  if (!content || !content.code) {
    throw new Error('Unable to read otp');
  }

  return content.code;
};

export const useReadOtp = (
  callback: (otp: string) => void,
  option: Option = {},
) => {
  const state = useRef<State>({});

  const abort = (): void => {
    state.current.abortController?.abort();
  };

  useEffect(() => {
    if (!isSupported()) {
      console.log('Not supported, exiting');
      return;
    }
    if (!(option.enabled ?? true)) {
      abort();
      return;
    }
    const controller = (state.current.abortController = new AbortController());

    readCode(controller)
      .then(otp => {
        abort();
        callback(otp);
      })
      .catch(err => {
        if (option.onError) {
          option.onError(err);
        }
        abort();
      });

    return abort;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option.enabled]);

  return abort;
};
