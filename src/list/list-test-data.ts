import {DataVersion, EditorData, NienowList} from './list-definitions';

const TestDataObject: EditorData = {
  editor: NienowList,
  version: DataVersion,
  fields: ['title', 'price'],
  items: [
    {title: 'One', price: 11.1},
    {title: 'Two', price: 2.22}
  ]
};

export const ListTestData = JSON.stringify(TestDataObject);
