import React from 'react';
import Button from '../UI/Button';
import { ReactComponent as Menu } from '../../assets/images/menu.svg';
import { ReactComponent as Back } from '../../assets/images/back.svg';
import Avatar from '../../assets/images/avatar.png';
import NavLink from '../UI/NavLink';
import ProfileToggle from '../ProfileToggle';

const Header = () => {
  return (
    <header className="header">
      <div className="header__btns">
        <Button type={'icon'}><Menu/></Button>
        <Button type={'icon'}><Back/></Button>
      </div>
      <div className="header__links">
        <NavLink isActive>Просмотр</NavLink>
        <NavLink>Управление</NavLink>
      </div>

      <ProfileToggle className={'header__profile-toggle'} text="Антон Петров" img={Avatar}/>
    </header>
  );
};

export default React.memo(Header);
