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
