export interface EditorData {
  editor: string;
  version: number;
  fields: string[];
  items: ItemData[];
}

export interface ItemData {
  title?: string;
  comments?: string;
  date?: string;
  price?: number;
  number?: number;
}

export const NienowList = 'nienow.list';
export const DataVersion = 1;
