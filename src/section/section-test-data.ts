import {DataVersion, NienowSection} from '../constants';

export const TestData = JSON.stringify({
  editor: NienowSection,
  version: DataVersion,
  sections: [
    {
      text: 'One'
    },
    {
      text: 'Two'
    }
  ]
});
