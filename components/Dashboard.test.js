import { fromJS, toJS } from 'immutable';
import {
  makeScheduleVisible,
  makeScheduleHidden,
  toggleFeedRunning
} from './Dashboard.state';

test('make schedule visible', () => {
  expect(makeScheduleVisible()).toEqual({
    popupScheduleVisible: true
  });
});

test('make schedule hidden', () => {
  expect(makeScheduleHidden()).toEqual({
    popupScheduleVisible: false
  });
});

test('toggle feed running', () => {
  const state = {
    feeds: [{ id: '1' }]
  };
  const feed = state.feeds[0];
  expect(toggleFeedRunning(feed)(state)).toEqual({
    feeds: fromJS(state.feeds).setIn([0, 'enabled'], true).toJS()
  });
});
