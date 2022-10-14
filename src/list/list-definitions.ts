export interface IListData {
  editor: string;
  version: number;
  fields: string[];
  items: IListItemData[];
}

export interface IListItemData {
  title?: string;
  comments?: string;
  date?: string;
  price?: number;
  number?: number;
}

export const NienowList = 'nienow.list';
export const DataVersion = 1;
