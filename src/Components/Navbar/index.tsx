import React from 'react';
import Select from '../UI/Select';
import NavbarLink from '../NavbarLink';

const OPTIONS = [
  {
    label: 'Название проекта',
    subLabel: 'Аббревиатура',
    value: '1',
  },
  {
    label: 'Название проекта',
    subLabel: 'Аббревиатура',
    value: '2',
  },
  {
    label: 'Название проекта',
    subLabel: 'Аббревиатура',
    value: '3',
  },
  {
    label: 'Название проекта',
    subLabel: 'Аббревиатура',
    value: '4',
  },
];
const LINKS = [
  { text: 'По проекту', active: false },
  { text: 'Объекты', active: false },
  { text: 'РД', active: false },
  { text: 'МТО', active: false },
  { text: 'CMP', active: true },
  { text: 'График', active: false },
  { text: 'МиМ', active: false },
  { text: 'Рабочие', active: false },
  { text: 'Капвложения', active: false },
  { text: 'Бюджет', active: false },
  { text: 'Финансирование', active: false },
  { text: 'Панорамы', active: false },
  { text: 'Камеры', active: false },
  { text: 'Поручения', active: false },
  { text: 'Контрагенты', active: false },
  { text: 'По проекту', active: false },
  { text: 'Объекты', active: false },
  { text: 'РД', active: false },
  { text: 'МТО', active: false },
  { text: 'CMP', active: false },
  { text: 'График', active: false },
  { text: 'МиМ', active: false },
  { text: 'Рабочие', active: false },
  { text: 'Капвложения', active: false },
  { text: 'Бюджет', active: false },
  { text: 'Финансирование', active: false },
  { text: 'Панорамы', active: false },
  { text: 'Камеры', active: false },
  { text: 'Поручения', active: false },
  { text: 'Контрагенты', active: false },
];

const Navbar = () => {
  return (
    <div className={'navbar'}>
      <Select options={OPTIONS} name={'select'}/>
      <ul className={'navbar__menu'}>
        {LINKS.map(( link, i ) => (
          <li key={i}>
            <NavbarLink {...link}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
