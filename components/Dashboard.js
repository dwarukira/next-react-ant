import { PureComponent } from 'react';
import Breadcrumb from './Breadcrumb';
import Schedule from './Schedule';
import { RowFeeds, CardFeeds } from './feeds';
import { feeds } from './util';
import {
  makeScheduleVisible,
  makeScheduleHidden,
  toggleFeedRunning
} from './Dashboard.state';

export default class Dashboard extends PureComponent {
  state = {
    popupScheduleVisible: false,
    feeds
  };

  render() {
    const c = this;
    const { popupScheduleVisible, feeds } = c.state;

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
        />
        <Schedule
          visible={popupScheduleVisible}
          onChange={() => c.setState(makeScheduleHidden)}
        />
      </div>
    );
  }
}
