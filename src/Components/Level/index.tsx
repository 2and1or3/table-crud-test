import React from 'react';
import { ReactComponent as Doc } from '../../assets/images/doc.svg';
import FolderIcon from '../FolderIcon';
import { RowId } from '../../Models/row';
import LevelActions from '../LevelActions';

interface LevelProps {
  className?: string;
  level: number;

  numberColorHex?: string;
  type: 'row' | 'level';
  isOpenPanel: boolean;
  setOpenPanel: ( rowId: RowId | null ) => void;
  rowId: RowId;
}


const Level: React.FC<LevelProps> = ( props ) => {
  const {
    className = '',
    level,
    numberColorHex = '#202124',
    type,
    isOpenPanel,
    setOpenPanel,
    rowId,
  } = props;
  const myClass = ['level', ...className.split(' ')].join(' ');


  return (
    <>
      {isOpenPanel && <div className={'backdrop'} onClick={() => setOpenPanel(null)}/>}
      <div style={{ width: `${22 * level}px`, display: 'flex' }}>
        <div
          className={`${myClass}${level > 1 ? ' level--have-parent' : ''}`}
          style={{ marginLeft: 'auto' }}
          onClick={() => setOpenPanel(rowId)}
        >
          {type === 'level' && <FolderIcon level={level} numberColorHex={numberColorHex}/>}
          {type === 'row' && <Doc/>}
          {isOpenPanel && (
            <LevelActions
              className={'level__panel'}
              level={level}
              type={type}
              rowId={rowId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Level);
