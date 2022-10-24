import React, { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type?: 'button' | 'icon';
}

const Button: React.FC<ButtonProps> = ( props ) => {
  const { className = '', children, type = 'button' } = props;
  const myClass = [`button${type === 'icon' ? ' button--icon' : ''}`, ...className.split(' ')].join(' ');

  return (
    <button className={myClass}>
      {children}
    </button>
  );
};

export default React.memo(Button);
