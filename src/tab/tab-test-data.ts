import {DataVersion, NienowGrid} from './tab-definitions';

export const TestData = JSON.stringify({
  editor: NienowGrid,
  version: DataVersion,
  tabs: [
    {
      title: 'One',
      text: 'One'
    },
    {
      title: 'Two',
      text: 'Two'
    }
  ]
});
