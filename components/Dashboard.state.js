import { fromJS, toJS } from 'immutable';

const makeScheduleVisible = currentFeed =>
  (state, props) => ({
    currentFeed,
    popupScheduleVisible: true
  });
const makeScheduleHidden = (state, props) => ({
  popupScheduleVisible: false
});

const makeFeedActivitiesModalVisible = feed =>
  (state, props) => ({
    feedForFeedActivitiesModal: feed,
    feedActivitiesModalVisible: true
  });

const makeFeedActivitiesModalHidden = (state, props) => ({
  feedActivitiesModalVisible: false
});

const toggleFeedRunning = feed =>
  (state, props) => {
    const imFeeds = fromJS(state.feeds);
    const index = imFeeds.findIndex(f => f.get('id') === feed.id);
    return {
      feeds: imFeeds
        .setIn([index, 'enabled'], !state.feeds[index].enabled)
        .toJS()
    };
  };

const updateFeedScheduleInFeeds = (feed, schedule) =>
  (state, props) => {
    const imFeeds = fromJS(state.feeds);
    const index = imFeeds.findIndex(f => f.get('id') === feed.id);
    return {
      feeds: imFeeds.setIn([index, 'schedule'], schedule).toJS()
    };
  };

export {
  makeScheduleVisible,
  makeScheduleHidden,
  toggleFeedRunning,
  makeFeedActivitiesModalVisible,
  makeFeedActivitiesModalHidden,
  updateFeedScheduleInFeeds
};
