import {DataVersion, NienowTab} from '../constants';

export const TestData = JSON.stringify({
  editor: NienowTab,
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
