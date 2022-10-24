import React, { ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  onChange: ( evt: ChangeEvent<HTMLInputElement> ) => void;
  ref?: ForwardedRef<HTMLInputElement | null>
}

const Input: React.FC<InputProps> = forwardRef(( props, ref: ForwardedRef<HTMLInputElement | null> ) => {
  const { className = '', value, onChange, ...rest } = props;
  const myClass = ['input', ...className.split(' ')].join(' ');

  return (
    <input
      {...rest}
      className={`${myClass} text2`}
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default React.memo(Input);
