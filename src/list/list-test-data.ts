import {DataVersion, IListData, NienowList} from './list-definitions';

const TestDataObject: IListData = {
  editor: NienowList,
  version: DataVersion,
  fields: ['title', 'price'],
  items: [
    {title: 'One', price: 11.1, date: '2022-10-05'},
    {title: 'Two', price: 2.22, date: '2022-10-06'}
  ]
};

export const ListTestData = JSON.stringify(TestDataObject);
