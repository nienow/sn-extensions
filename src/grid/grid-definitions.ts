export interface IGridData {
  editor: string;
  version: number;
  rows: number;
  columns: number;
  sections: SectionData[][];
}

export interface SectionData {
  title?: string;
  text?: string;
}
