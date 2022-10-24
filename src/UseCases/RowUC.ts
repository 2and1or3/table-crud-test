import { AppDispatch, } from '../Store';
import { ParentId, RowId, RowModel, } from '../Models/row';
import { Dictionary, nanoid } from '@reduxjs/toolkit';
import { rowsActions } from '../Store/Slices/Row';

type CreateRow = 'sibling' | 'child' | 'calc';

type CreateRowCmd = {
  rowId: RowId;
  type: CreateRow;
}

type UpdateRowCmd = {
  saveRow: RowOnSave;
}

type DeleteRowCmd = {
  rowId: RowId;
}

export type RowOnSave =
  Pick<RowModel, 'id' | 'title' | 'price'>
  | Pick<RowModel, 'id' | 'title' | 'unit' | 'quantity' | 'unitPrice' | 'price'>


function recalculation( parentID: ParentId, storage: RowModel[] ) {
  const rows: RowModel[] = JSON.parse(JSON.stringify(storage));
  const changedRows: RowModel[] = [];

  if (parentID == null) return changedRows;
  let currentParentIndex = rows.findIndex(( v ) => v.id === parentID);
  if (currentParentIndex === -1) return changedRows;

  do {
    const currentParent = rows[currentParentIndex];
    const children = rows.filter(( v ) => v.parent === currentParent.id);
    const newPrice = children.reduce(( acc, v ) => acc + v.price, 0);

    if (currentParent.price !== newPrice) {
      rows[currentParentIndex].price = newPrice;
      changedRows.push(rows[currentParentIndex]);

      currentParentIndex = rows.findIndex(( v ) => v.id === currentParent.parent);
      continue;
    }

    break;
  } while (currentParentIndex !== -1);

  return changedRows;
}

export const RowUC = (
  dispatch: AppDispatch,
  getEntities: () => Dictionary<RowModel>,
  getRowIds: () => RowId[],
  onSuccess: () => void,
  onError: ( err: unknown ) => void,
) => {

  return {
    createRow( cmd: CreateRowCmd ) {
      // . Check permissions
      // ...

      try {
        const { rowId, type } = cmd;
        const rowsEntities = getEntities();
        const currentRow = rowsEntities[rowId]!;

        let newRow: RowModel;

        switch (type) {
          case 'sibling':
            newRow = {
              id: nanoid(),
              title: '',
              price: 0,
              parent: currentRow.parent,
              type: 'level' as const,
              isEditing: true,
              level: currentRow.level,
            };
            break;

          case 'child':
            newRow = {
              id: nanoid(),
              title: '',
              price: 0,
              parent: rowId,
              type: 'level' as const,
              isEditing: true,
              level: currentRow.level + 1,
            };
            break;

          case 'calc':
            newRow = {
              id: nanoid(),
              title: '',
              unit: '',
              quantity: 0,
              unitPrice: 0,
              price: 0,
              parent: currentRow.type === 'level' ? rowId : currentRow.parent,
              type: 'row' as const,
              isEditing: true,
              level: currentRow.type === 'level' ? currentRow.level + 1 : currentRow.level,
            };
            break;
        }

        dispatch(rowsActions.addOne(newRow));
        onSuccess();
      } catch (e) {
        onError(e);
      }
    },

    updateRow( cmd: UpdateRowCmd ) {
      try {
        const { saveRow } = cmd;
        const entities = getEntities();
        const ids = getRowIds();

        // . Check permissions
        // ...

        // . Check if diff exist
        // ...

        // . Validate data
        // ...


        const row = {
          ...entities[saveRow.id]!,
          ...saveRow,
          isEditing: false,
        };

        const storage = ids.map(( id ) => {
          if (id === saveRow.id) return row;
          return entities[id]!;
        });

        const changedRows = recalculation(row.parent, storage);

        const rowsToUpdate = [
          { id: row.id, changes: row },
          ...changedRows.map(( row ) => ({
            id: row.id,
            changes: row,
          }))
        ];

        dispatch(rowsActions.updateMany(rowsToUpdate));

        onSuccess();
      } catch (e) {
        onError(e);
      }
    },

    deleteRow( cmd: DeleteRowCmd ) {

      // . Check permissions
      // ...

      try {
        const { rowId } = cmd;

        const entities = getEntities();
        const ids = getRowIds();
        const rowToDelete = entities[rowId]!;

        if (rowToDelete.type === 'level') {
          const idsToDelete = [rowId];
          const rows = ids.map(( id ) => entities[id]!);

          rows.forEach(( row ) => {
            let nextParentId = row.parent;

            while (!!nextParentId) {
              if (nextParentId === rowId) {
                idsToDelete.push(row.id);
                break;
              }

              nextParentId = entities[nextParentId]!.parent;
            }
          });


          const newIds = ids.filter(( id ) => !idsToDelete.includes(id));
          const storage = newIds.map(( id ) => entities[id]!);

          const changedRows = recalculation(rowToDelete.parent, storage);
          const rowsToUpdate = changedRows.map(( row ) => ({
            id: row.id,
            changes: row,
          }));

          dispatch(rowsActions.removeMany(idsToDelete));
          dispatch(rowsActions.updateMany(rowsToUpdate));

        } else {
          const newIds = ids.filter(( id ) => id !== rowId);
          const storage = newIds.map(( id ) => entities[id]!);

          const changedRows = recalculation(rowToDelete.parent, storage);
          const rowsToUpdate = changedRows.map(( row ) => ({
            id: row.id,
            changes: row,
          }));

          dispatch(rowsActions.removeOne(rowId));
          dispatch(rowsActions.updateMany(rowsToUpdate));
        }

        onSuccess();
      } catch (e) {
        onError(e);
      }
    },
  };
};
