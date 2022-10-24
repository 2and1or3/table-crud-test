import React, { Fragment, useCallback, useState } from 'react';
import { ReactComponent as ArrowDown } from '../../../assets/images/arrow-down.svg';


interface SelectOption {
  label: string;
  subLabel?: string;
  value: string;
}

interface SelectProps {
  className?: string;
  options: SelectOption[];
  name: string;
}

const Select: React.FC<SelectProps> = ( props ) => {
  const { className = '', options, name } = props;
  const myClass = ['select', ...className.split(' ')].join(' ');

  const [stateSelect, setSelect] = useState<SelectOption>(options[1]);
  const [stateIsOpen, setIsOpen] = useState<boolean>(false);

  const optionClickHandler = useCallback(( option: SelectOption ) => {
    setSelect(option);
    setIsOpen(false);
  }, []);

  const toggleHandler = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <>
      {stateIsOpen && (<div className="select-click-away" onClick={toggleHandler}/>)}
      <div className={`${myClass} text1 ${stateIsOpen ? 'select--active' : ''}`}>
        <button type="button" className="select__title" onClick={toggleHandler}>
          {stateSelect.label}
          <span className="select__abbr text1--small">
                  {stateSelect.subLabel}
          </span>
        </button>
        <div className={`select__content ${stateIsOpen ? '' : 'visually-hidden'}`}>
          {options.map(( option ) => (
            <Fragment key={option.value}>
              <input id={option.value} className="select__input visually-hidden" type="radio" name={name}
                     value={option.value}
                     defaultChecked={option.value === stateSelect.value}/>
              <label htmlFor={option.value} className="select__label text1--small"
                     onClick={() => optionClickHandler(option)}>
                {option.label}
                <span className="select__abbr text1--small">
                  {option.subLabel}
                </span>
              </label>
            </Fragment>
          ))}
        </div>
        <ArrowDown className={'select__arrow'}/>
      </div>
    </>
  );
};

export default React.memo(Select);
