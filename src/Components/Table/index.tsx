import React, { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Store';
import { RowId, RowModel } from '../../Models/row';
import Row from '../Row';
import { RowOnSave, RowUC } from '../../UseCases/RowUC';


interface TableProps {
  rows: RowModel[];
}

type RowCtx = {
  onCreateSiblingFolder: ( rowId: RowId ) => void;
  onCreateChildFolder: ( rowId: RowId ) => void;
  onCreateCalc: ( rowId: RowId ) => void;
  onDeleteRow: ( rowId: RowId ) => void;
  onSaveRow: ( row: RowOnSave ) => void;
}

const RowContext = createContext<RowCtx>({} as RowCtx);

export const useRowCtx = () => useContext(RowContext);


const Table: FC<TableProps> = ( props ) => {
  const { rows } = props;
  const dispatch = useDispatch();
  const rowsEntities = useAppSelector(state => state.rows.entities);
  const rowIds = useAppSelector(state => state.rows.ids);
  const [stateActiveRowPanel, setActiveRowPanel] = useState<RowId | null>(null);


  const rowUC = useMemo(() => RowUC(
    dispatch,
    () => rowsEntities,
    () => rowIds,
    () => setActiveRowPanel(null),
    ( err ) => console.log(err),
  ), [dispatch, rowsEntities, rowIds, setActiveRowPanel]);

  const onCreateSiblingFolderHandler = useCallback(( rowId: RowId ) => rowUC.createRow({
    rowId,
    type: 'sibling'
  }), [rowUC]);
  const onCreateChildFolderHandler = useCallback(( rowId: RowId ) => rowUC.createRow({
    rowId,
    type: 'child'
  }), [rowUC]);
  const onCreateCalcHandler = useCallback(( rowId: RowId ) => rowUC.createRow({
    rowId,
    type: 'calc',
  }), [rowUC]);

  const onDeleteRowHandler = useCallback(( rowId: RowId ) => {
    rowUC.deleteRow({
      rowId,
    });
  }, [rowUC]);

  const onSaveRowHandler = useCallback(( row: RowOnSave ) => rowUC.updateRow({ saveRow: row }), [rowUC]);

  const ctxValue: RowCtx = useMemo(() => ({
    onCreateSiblingFolder: onCreateSiblingFolderHandler,
    onCreateChildFolder: onCreateChildFolderHandler,
    onCreateCalc: onCreateCalcHandler,
    onDeleteRow: onDeleteRowHandler,
    onSaveRow: onSaveRowHandler,
  }), [onCreateSiblingFolderHandler, onCreateChildFolderHandler, onCreateCalcHandler, onDeleteRowHandler, onSaveRowHandler]);

  return (
    <div className={'table-wrapper'}>
      <table className={'table text2'}>
        <thead>
        <tr className="table__row table__row--header">
          <th className="text2 table__cell table__cell--header table__cell--level">Уровень</th>
          <th className="text2 table__cell table__cell--header table__cell--title">Наименование работ</th>
          <th className="text2 table__cell table__cell--header table__cell--unit">Ед. изм.</th>
          <th className="text2 table__cell table__cell--header table__cell--quantity">Количество</th>
          <th className="text2 table__cell table__cell--header table__cell--unit-price">Цена за ед.</th>
          <th className="text2 table__cell table__cell--header table__cell--price">Стоимость</th>
        </tr>
        </thead>
        <tbody className="table__body">
        <RowContext.Provider value={ctxValue}>
          {rows.map(( row ) => (
            <Row
              key={row.id}
              className={'table__row'}
              row={row}
              isOpenPanel={row.id === stateActiveRowPanel}
              setActiveRowPanel={setActiveRowPanel}
            />
          ))}
        </RowContext.Provider>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
