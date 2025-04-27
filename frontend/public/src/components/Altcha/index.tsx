'use client';

import { BACKEND, IS_DEVELOPMENT } from '@/constants';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { AltchaProps } from './types';

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(
  ({ onStateChange }, ref) => {
    const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(
      null
    );
    const [value, setValue] = useState<string | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          get value() {
            return value;
          },
        };
      },
      [value]
    );

    useEffect(() => {
      const handleStateChange = (ev: Event | CustomEvent) => {
        if ('detail' in ev) {
          setValue(ev.detail.payload || null);
          onStateChange?.(ev);
        }
      };

      const { current } = widgetRef;

      if (current) {
        current.addEventListener('statechange', handleStateChange);
        return () =>
          current.removeEventListener('statechange', handleStateChange);
      }
    }, [onStateChange]);

    useEffect(() => {
      import('altcha');
    }, []);

    /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/website-integration/#using-altcha-widget  */
    return (
      <altcha-widget
        ref={widgetRef}
        style={{
          '--altcha-max-width': '100%',
        }}
        debug={IS_DEVELOPMENT}
        test={IS_DEVELOPMENT}
        floating
        challengeurl={`${BACKEND}/altcha/challenge`}
      ></altcha-widget>
    );
  }
);

Altcha.displayName = 'Altcha';

export default Altcha;
