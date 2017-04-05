import { Card, Row, Col } from 'antd';

import Divider from '../Divider';

import {
  RunNowButton,
  Image,
  FeedSettingsButton,
  AddFeedButton
} from './FeedActions';
import FeedSchedule from './FeedSchedule';
import FeedActivities from './FeedActivities';

import { FEED_STATUS } from '../util';

const FeedStatusTextColor = (status = '') => {
  const cn = {
    [FEED_STATUS.QUEUED]: 'feed-queued-text',
    [FEED_STATUS.PROCESSING]: 'feed-processing-text'
  };
  return cn[status.toLowerCase()];
};

const FeedStatusBorderColor = (status = '') => {
  const cn = {
    [FEED_STATUS.QUEUED]: 'feed-queued-border',
    [FEED_STATUS.PROCESSING]: 'feed-processing-border'
  };
  return cn[status.toLowerCase()];
};

const DISABLE_IF_FEED_STATUSES = [FEED_STATUS.PROCESSING, FEED_STATUS.QUEUED];

const CardExtra = ({ feed, onFeedChange }) => (
  <div
    style={{
      top: '-4px',
      position: 'relative',
      textTransform: 'capitalize'
    }}
  >
    {feed.status &&
      feed.status.length > 0 &&
      <span
        style={{
          fontSize: '.85rem',
          fontWeight: 500,
          marginRight: 5
        }}
        className={FeedStatusTextColor(feed.status)}
      >
        {feed.status}
      </span>}
    <FeedSettingsButton
      feed={feed}
      onFeedChange={onFeedChange}
      style={{ marginRight: 0 }}
    />
  </div>
);

const FeedCard = (
  {
    feed = {},
    onFeedChange,
    onScheduleClick,
    onActivitiesClick
  }
) => {
  const hasFeed = Object.keys(feed).length > 0;
  return (
    <Card
      className={FeedStatusBorderColor(feed.status)}
      style={{ borderWidth: 2 }}
      bodyStyle={{ padding: 0 }}
      title={
        <span>
          <Col span={17} style={{ textAlign: 'left' }}>

            {feed.title}

          </Col>

        </span>
      }
      {...hasFeed && {
        extra: <CardExtra feed={feed} onFeedChange={onFeedChange} />
      }}
    >

      <div style={{ padding: '16px 24px' }}>

        <FeedActivities count={1} feed={feed} onSeeMore={onActivitiesClick} />
        {feed.logs && feed.logs.length > 0 && <Divider paddingTop={0} />}
        {feed.schedule &&
          <FeedSchedule
            feed={feed}
            onFeedChange={onFeedChange}
            onScheduleClick={onScheduleClick}
          />}
        <Row style={{ textAlign: 'center' }}>
          <Col span={24}>
            {hasFeed
              ? <RunNowButton
                  disabled={DISABLE_IF_FEED_STATUSES.includes(feed.status)}
                />
              : <AddFeedButton />}
          </Col>
        </Row>

      </div>
    </Card>
  );
};

export default FeedCard;
