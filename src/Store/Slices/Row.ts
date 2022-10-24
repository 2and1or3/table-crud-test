import { createEntityAdapter, createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { BackendRowModel, ProjectId, RowModel } from '../../Models/row';
import RowService from '../../API/RowService';

export const rowsAdapter = createEntityAdapter<RowModel>();

const initialState: ReturnType<typeof rowsAdapter.getInitialState> = {
  ids: [1],
  entities: {
    1: {
      id: 1,
      title: '',
      price: 0,
      parent: null,
      type: 'level',
      isEditing: true,
      level: 1,
    },
  }
};

const fetchRowsByProjectId = createAsyncThunk(
  'rows/fetchRowsByProjectId',
  async ( projectId: ProjectId ): Promise<RowModel[]> => {
    const backRows = await RowService.fetchRowsByProjectId(projectId);

    const entities: Record<string, BackendRowModel> = backRows.reduce(( acc, row ) => ({
      ...acc,
      [row.id]: row,
    }), {});


    return backRows.map(( row ) => {
      let level = 1;
      let nextParentId = row.parent;

      while (!!nextParentId) {
        level++;
        nextParentId = entities[nextParentId]?.parent;
      }
      return { ...row, level, isEditing: false };
    });
  });

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addMany: rowsAdapter.addMany,
    updateOne: rowsAdapter.updateOne,
    updateMany: rowsAdapter.updateMany,
    removeOne: rowsAdapter.removeOne,
    removeMany: rowsAdapter.removeMany,

    addOne( state, action: PayloadAction<RowModel> ) {
      const { id, parent } = action.payload;
      if (!parent) {
        state.ids.push(id);
      } else {
        const idx = state.ids.findIndex(( parentId ) => parentId === parent);
        state.ids.splice(idx + 1, 0, id);
      }

      state.entities[id] = { ...action.payload };
    }
  },
  extraReducers: ( builder ) => {
    builder.addCase(fetchRowsByProjectId.fulfilled, ( state, action: PayloadAction<RowModel[]> ) => {
      rowsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchRowsByProjectId.rejected, ( state, action ) => {
      // . handle err
      // ...
    });
    builder.addCase(fetchRowsByProjectId.pending, ( state, action ) => {
      // . handle loading
      // ...
    });
  },
});

export const rowsSelectors = rowsAdapter.getSelectors<RootState>(( state ) => state.rows);
export const rowsActions = { ...rowsSlice.actions, fetchRowsByProjectId };
export const rowsReducer = rowsSlice.reducer;
