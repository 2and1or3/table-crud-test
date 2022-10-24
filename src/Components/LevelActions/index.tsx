import React from 'react';
import FolderIcon from '../FolderIcon';
import { ReactComponent as Doc } from '../../assets/images/doc.svg';
import { ReactComponent as Trash } from '../../assets/images/trash.svg';
import { RowId, RowType } from '../../Models/row';
import { useRowCtx } from '../Table';

interface LevelActionsProps {
  className?: string;
  level: number;
  type: RowType;
  rowId: RowId;
}

const LevelActions: React.FC<LevelActionsProps> = ( props ) => {
  const {
    className = '',
    level,
    type,
    rowId,
  } = props;
  const myClass = ['level-actions', ...className.split(' ')].join(' ');
  const {
    onCreateSiblingFolder,
    onCreateChildFolder,
    onCreateCalc,
    onDeleteRow,
  } = useRowCtx();

  return (
    <div className={myClass}>
      {type === 'level' && (
        <>
          <button className={'level-actions__btn'} onClick={( evt ) => {
            evt.stopPropagation();
            onCreateSiblingFolder(rowId);
          }}>
            <FolderIcon level={level} numberColorHex={'#414144'}/>
          </button>
          <button className={'level-actions__btn'} onClick={( evt ) => {
            evt.stopPropagation();
            onCreateChildFolder(rowId);
          }}>
            <FolderIcon level={level + 1} numberColorHex={'#414144'}/>
          </button>
        </>
      )}
      <button className={'level-actions__btn'} onClick={( evt ) => {
        evt.stopPropagation();
        onCreateCalc(rowId);
      }}><Doc/></button>
      <button className={'level-actions__btn'} onClick={( evt ) => {
        evt.stopPropagation();
        onDeleteRow(rowId);
      }}><Trash/></button>
    </div>
  );
};

export default React.memo(LevelActions);
