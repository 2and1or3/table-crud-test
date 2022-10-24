export interface BackendRowModel {
  title: string; // Наименование работ
  unit?: string; // Ед. изм.
  quantity?: number; // Количество
  unitPrice?: number; // Цена за ед.
  price: number; // Стоимость

  parent: ParentId; // id уровня, в котором находится (либо null для первого уровня)
  type: RowType;
  id: RowId;
}

export interface NewRowModel {
  title: string;
  unit?: string;
  quantity?: number;
  unitPrice?: number;
  price: number;

  parent: ParentId;
  type: RowType;

  isEditing: boolean;
  level: number;
}

export interface RowModel extends NewRowModel {
  id: RowId;
}

export type RowId = number | string;
export type ParentId = RowId | null;
export type RowType = 'level' | 'row';

export type ProjectId = number | string;
