import React from 'react';
import { ReactComponent as Folder } from '../../assets/images/folder.svg';

interface FolderIconProps {
  className?: string;
  level: number;
  numberColorHex: string;
}

const levelColors = ['#5F98F5', '#95FFAC', '#F5F18F', '#F7D681', '#F7A286', '#C286F7'];

const getLevelColor = ( level: number ): string => {
  if (level < 1) throw new Error('Уровень не может быть меньше 1');
  const colorIndex = (level - 1) % levelColors.length;
  return levelColors[colorIndex];
};

const FolderIcon: React.FC<FolderIconProps> = ( props ) => {
  const { className = '', level, numberColorHex } = props;
  const myClass = ['folder-icon', ...className.split(' ')].join(' ');

  const color = getLevelColor(level);

  return (
    <span className={myClass} style={{ color, }}>
      <Folder/>
      <span style={{ color: numberColorHex }} className={'folder-icon__number text1--small'}>{level}</span>
    </span>
  );
};

export default React.memo(FolderIcon);
