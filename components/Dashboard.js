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
  makeFeedActivitiesModalHidden
} from './Dashboard.state';

export default class Dashboard extends PureComponent {
  state = {
    popupScheduleVisible: false,
    feedActivitiesModalVisible: false,
    feedForFeedActivitiesModal: {},
    feeds
  };

  render() {
    const c = this;
    const {
      popupScheduleVisible,
      feeds,
      feedActivitiesModalVisible,
      feedForFeedActivitiesModal
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
          onScheduleClick={() => c.setState(makeScheduleVisible)}
          onShowFeedActivitiesClick={feed =>
            c.setState(makeFeedActivitiesModalVisible(feed))}
        />
        <Schedule
          visible={popupScheduleVisible}
          onChange={() => c.setState(makeScheduleHidden)}
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
