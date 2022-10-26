import {DataVersion, NienowGrid} from '../constants';
import {IGridData} from './grid-definitions';

const data: IGridData = {
  editor: NienowGrid,
  version: DataVersion,
  rows: 2,
  columns: 2,
  sections: [
    [
      {title: 'Section 1', text: 'Text 1'},
      {title: 'Section 2', text: 'Text 2'}
    ], [
      {title: 'Section 3', text: 'Text 3'},
      {title: 'Section 4', text: 'Text 4'}
    ]]
};

export const GridTestData = JSON.stringify(data);
