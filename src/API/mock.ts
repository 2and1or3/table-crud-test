import { BackendRowModel } from '../Models/row';

export const MOCK_ROWS: BackendRowModel[] = [
  {
    id: 1,
    title: 'Южная строительная площадка from mocks',

    price: 700,
    parent: null,
    type: 'level',
  },
  {
    id: 2,
    title: 'Фундаментальные работы',
    price: 700,
    parent: 1,
    type: 'level',
  },
  {
    id: 3,
    title: 'Статья работы № 1',
    unit: 'м3',
    quantity: 36,
    unitPrice: 10,
    price: 360,

    parent: 2,
    type: 'row',
  },
  {
    id: 4,
    title: 'Статья работы № 2',
    unit: 'л',
    quantity: 0,
    unitPrice: 0,
    price: 0,

    parent: 2,
    type: 'row',
  },

  {
    id: 5,
    title: 'Фундаментальные работы 333',
    price: 340,
    parent: 2,
    type: 'level',
  },

  {
    id: 6,
    title: 'Статья работы № 331',
    unit: 'м3',
    quantity: 36,
    unitPrice: 10,
    price: 340,

    parent: 5,
    type: 'row',
  },
  {
    id: 7,
    title: 'Статья работы № 332',
    unit: 'л',
    quantity: 0,
    unitPrice: 0,
    price: 0,

    parent: 5,
    type: 'row',
  },
];
