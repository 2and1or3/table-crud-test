import React from 'react';
import { ReactComponent as ArrowDown } from '../../assets/images/arrow-down.svg';

interface ProfileToggleProps {
    className?: string;
    text: string;
    img: string;
}

const ProfileToggle: React.FC<ProfileToggleProps> = (props) => {
 const {className = '', text, img} = props;
   const myClass = ['profile-toggle', ...className.split(' ')].join(' ');

 return (
  <button className={myClass}>
    <img className={'profile-toggle__img'} src={img} alt="avatar"/>
    <span className={'profile-toggle__text'}>
      {text}
    </span>
    <ArrowDown/>
  </button>
 );
};

export default React.memo(ProfileToggle);
