import React, { ReactNode } from 'react';

interface NavLinkProps {
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  href?: string;
}

const NavLink: React.FC<NavLinkProps> = ( props ) => {
  const { className = '', children, isActive = false, href } = props;
  const myClass = [`nav-link text1${isActive ? ' nav-link--active' : ''}`, ...className.split(' ')].join(' ');

  return (
    <a className={myClass} href={href}>
      {children}
    </a>
  );
};

export default React.memo(NavLink);
