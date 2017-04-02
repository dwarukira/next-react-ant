import { fromJS, toJS } from 'immutable';

const makeScheduleVisible = (state, props) => ({
  popupScheduleVisible: true
});
const makeScheduleHidden = (state, props) => ({
  popupScheduleVisible: false
});

const toggleFeedRunning = feed =>
  (state, props) => {
    const imFeeds = fromJS(state.feeds);
    const index = imFeeds.findIndex(f => f.get('id') === feed.id);
    return {
      feeds: imFeeds
        .setIn([index, 'isRunning'], !state.feeds[index].isRunning)
        .toJS()
    };
  };

export { makeScheduleVisible, makeScheduleHidden, toggleFeedRunning };
