export interface IGridData {
  editor: string;
  version: number;
  rows: number;
  columns: number;
  sections: IGridSectionData[][];
}

export interface IGridSectionData {
  title?: string;
  text?: string;
}
