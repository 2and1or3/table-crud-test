import React, {
  useState,
  KeyboardEvent,
  useRef,
  useEffect, useCallback
} from 'react';
import Input from '../UI/Input';
import { RowId, RowModel } from '../../Models/row';
import Level from '../Level';
import { useRowCtx } from '../Table';

interface RowProps {
  className?: string;
  row: RowModel;
  setActiveRowPanel: ( rowId: RowId | null ) => void;
  isOpenPanel: boolean;
}

interface RowFields extends Required<Pick<RowModel, 'title' | 'unit' | 'price'>> {
  quantity: string;
  unitPrice: string;
}

const Row: React.FC<RowProps> = ( props ) => {
  const {
    className = '',
    row,
    setActiveRowPanel,
    isOpenPanel,
  } = props;
  const myClass = ['row', ...className.split(' ')].join(' ');
  const [stateIsEditing, setIsEditing] = useState<boolean>(row.isEditing);
  const { onSaveRow } = useRowCtx();

  const [stateRow, setRow] = useState<RowFields>({
    title: row.title || '',
    unit: row.unit || '',
    quantity: (row.quantity || 0).toString(),
    unitPrice: (row.unitPrice || 0).toString(),
    price: row.price,
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (row.type === 'level') return;

    const quantity = parseFloat(stateRow.quantity) || 0;
    const unitPrice = parseFloat(stateRow.unitPrice) || 0;

    setRow(prev => ({ ...prev, price: quantity * unitPrice }));
  }, [stateRow.quantity, stateRow.unitPrice, row.type]);

  useEffect(() => {
    setIsEditing(row.isEditing);
  }, [row.isEditing]);


  const onEnterHandler = ( evt: KeyboardEvent<HTMLTableRowElement> ) => {
    if (evt.code === 'Enter') {
      const saveRow = row.type === 'level' ? {
        id: row.id,
        title: stateRow.title,
        price: stateRow.price,
      } : {
        id: row.id,
        title: stateRow.title,
        unit: stateRow.unit,
        quantity: parseFloat(stateRow.quantity),
        unitPrice: parseFloat(stateRow.unitPrice),
        price: stateRow.price,
      };

      onSaveRow(saveRow);
      setIsEditing(false);
    }
  };

  const isCalcVisible = stateIsEditing && row.type === 'row';

  useEffect(() => {
    if (stateIsEditing && !!titleInputRef.current) titleInputRef.current.focus();
  }, [stateIsEditing]);

  useEffect(() => {
    setRow({
      title: row.title || '',
      unit: row.unit || '',
      quantity: (row.quantity || 0).toString(),
      unitPrice: (row.unitPrice || 0).toString(),
      price: row.price,
    });
  }, [row]);

  const setActiveRowPanelHandler = useCallback(( rowId: RowId | null ) => {
    setActiveRowPanel(stateIsEditing ? null : rowId);
  }, [stateIsEditing, setActiveRowPanel]);


  return (
    <tr className={myClass} onDoubleClick={() => setIsEditing(true)} onKeyDown={onEnterHandler}>
      <td className="row__cell row__cell--level">
        <Level
          level={row.level}
          type={row.type}
          rowId={row.id}
          isOpenPanel={isOpenPanel}
          setOpenPanel={setActiveRowPanelHandler}
        />
      </td>

      <td className={`row__cell row__cell--title${stateIsEditing ? ' row__cell--editing' : ''}`}>
        {stateIsEditing && (<Input
          ref={titleInputRef}
          value={stateRow.title}
          onChange={( evt ) => setRow({ ...stateRow, title: evt.target.value })}
          placeholder={'Статья работы'}
        />)}
        {!stateIsEditing && row.title}
      </td>

      <td className={`row__cell row__cell--unit${isCalcVisible ? ' row__cell--editing' : ''}`}>
        {isCalcVisible && (<Input
          value={stateRow.unit}
          onChange={( evt ) => setRow({ ...stateRow, unit: evt.target.value })}
          placeholder={'м3'}
        />)}
        {!isCalcVisible && row.unit}
      </td>

      <td className={`row__cell row__cell--quantity${isCalcVisible ? ' row__cell--editing' : ''}`}>
        {isCalcVisible && (<Input
          value={stateRow.quantity}
          onChange={( evt ) => setRow({ ...stateRow, quantity: evt.target.value })}
          placeholder={'100'}
        />)}
        {!isCalcVisible && row.quantity}
      </td>

      <td className={`row__cell row__cell--unit-price${isCalcVisible ? ' row__cell--editing' : ''}`}>
        {isCalcVisible && (<Input
          value={stateRow.unitPrice}
          onChange={( evt ) => setRow({ ...stateRow, unitPrice: evt.target.value })}
          placeholder={'1230'}
        />)}
        {!isCalcVisible && row.unitPrice}
      </td>
      <td className="row__cell row__cell--price">{stateRow.price}</td>
    </tr>
  );
};

export default React.memo(Row);
