import React from 'react';
import { ReactComponent as File } from '../../assets/images/file.svg';
import { MouseEvent } from 'react';

interface NavbarLinkProps {
  className?: string;
  text: string;
  to?: string;
  active?: boolean;
}

const NavbarLink: React.FC<NavbarLinkProps> = ( props ) => {
  const { className = '', text, to = '#', active = false } = props;
  const myClass = ['navbar-link', ...className.split(' ')].join(' ');

  return (
    <a
      className={`${myClass}${active ? ' navbar-link--active' : ''} text1`}
      href={active ? undefined : to}
      onClick={( evt: MouseEvent<HTMLAnchorElement> ) => {
        evt.preventDefault();
        // navigate(to);
      }}
    >
      <File className={'navbar-link__icon'}/>
      {text}
    </a>
  );
};

export default React.memo(NavbarLink);
