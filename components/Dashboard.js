import { PureComponent } from 'react';
import Breadcrumb from './Breadcrumb';
import Schedule from './Schedule';
import { RowFeeds, CardFeeds, FeedActivitiesModal } from './feeds';
import { feeds } from './util';
import {
  makeScheduleVisible,
  makeScheduleHidden,
  toggleFeedRunning,
  makeFeedActivitiesModalVisible,
  makeFeedActivitiesModalHidden,
  updateFeedScheduleInFeeds
} from './Dashboard.state';

export default class Dashboard extends PureComponent {
  state = {
    popupScheduleVisible: false,
    feedActivitiesModalVisible: false,
    feedForFeedActivitiesModal: {},
    feeds,
    currentFeed: {}
  };

  render() {
    const c = this;
    const {
      popupScheduleVisible,
      feeds,
      feedActivitiesModalVisible,
      feedForFeedActivitiesModal,
      currentFeed
    } = c.state;

    return (
      <div>
        <Breadcrumb crumbs={[{ title: 'Feeds' }]} />
        {/*
          <RowFeeds
          feeds={feeds}
          onFeedChange={feed => c.setState(toggleFeedRunning(feed))}
          onScheduleClick={() => c.setState(makeScheduleVisible)}
          />
          */}
        <CardFeeds
          feeds={feeds}
          onFeedChange={feed => c.setState(toggleFeedRunning(feed))}
          onScheduleClick={feed => c.setState(makeScheduleVisible(feed))}
          onActivitiesClick={feed =>
            c.setState(makeFeedActivitiesModalVisible(feed))}
        />
        <Schedule
          feed={currentFeed}
          visible={popupScheduleVisible}
          onChange={(feed, schedule) => {
            console.log('onChange > schedule:', schedule);
            c.setState(updateFeedScheduleInFeeds(feed, schedule));
            c.setState(makeScheduleHidden);
          }}
        />
        <FeedActivitiesModal
          visible={feedActivitiesModalVisible}
          onCancel={() => c.setState(makeFeedActivitiesModalHidden)}
          feed={feedForFeedActivitiesModal}
        />

      </div>
    );
  }
}
