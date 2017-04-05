import { fromJS, toJS } from 'immutable';
import moment from 'moment';
import {
  makeScheduleVisible,
  makeScheduleHidden,
  toggleFeedRunning,
  makeFeedActivitiesModalVisible,
  makeFeedActivitiesModalHidden,
  updateFeedScheduleInFeeds
} from './Dashboard.state';
import { feeds } from './util';

const state = {
  feeds
};
const feed = state.feeds[0];

test('make schedule visible', () => {
  expect(makeScheduleVisible(feed)(state)).toEqual({
    popupScheduleVisible: true,
    currentFeed: feed
  });
});

test('make schedule hidden', () => {
  expect(makeScheduleHidden()).toEqual({
    popupScheduleVisible: false
  });
});

test('make feed activities modal visible + feed prop', () => {
  expect(makeFeedActivitiesModalVisible(feed)(state)).toEqual({
    feedActivitiesModalVisible: true,
    feedForFeedActivitiesModal: feed
  });
});

test('make feed activities modal hidden', () => {
  expect(makeFeedActivitiesModalHidden()).toEqual({
    feedActivitiesModalVisible: false
  });
});

test('toggle feed running', () => {
  const feed = state.feeds[0];
  expect(toggleFeedRunning(feed)(state)).toEqual({
    feeds: fromJS(state.feeds).setIn([0, 'enabled'], true).toJS()
  });
});

test('update feed schedule', () => {
  const feed = state.feeds[0];
  const schedule = {
    startTime: moment(new Date('1-jan-2017')),
    timeZone: 'Pacific Time (US & Canada)'
  };
  expect(updateFeedScheduleInFeeds(feed, schedule)(state)).toEqual({
    feeds: fromJS(state.feeds).setIn([0, 'schedule'], schedule).toJS()
  });
});
