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

import { FEED_STATUS, SOURCE_TYPES } from '../util';

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

const SOURCE_TYPES_WITH_NO_SCHEDULE = [
  SOURCE_TYPES.uploaded_file,
  SOURCE_TYPES.email
];

const FeedCard = (
  {
    feed = {},
    onFeedChange,
    onScheduleClick,
    onActivitiesClick
  }
) => {
  const hasFeed = Object.keys(feed).length > 0;
  const { sourceType = '' } = feed;
  const isEmailOrFileUpload = SOURCE_TYPES_WITH_NO_SCHEDULE.includes(
    sourceType
  );
  console.log('SOURCE_TYPES_WITH_NO_SCHEDULE:', SOURCE_TYPES_WITH_NO_SCHEDULE);
  console.log('sourceType:', sourceType);
  console.log('FeedCard > isEmailOrFileUpload:', isEmailOrFileUpload);
  return (
    <Card
      className={FeedStatusBorderColor(feed.status)}
      style={{ borderWidth: 2 }}
      bodyStyle={{ position: 'relative', padding: '16px 24px', minHeight: 312 }}
      title={
        <span>
          <Col span={17} style={{ textAlign: 'left' }}>

            {feed.title}
            {sourceType.length > 0 &&
              <span>
                {` - `}
                {feed.sourceType}

              </span>}

          </Col>

        </span>
      }
      {...hasFeed && {
        extra: <CardExtra feed={feed} onFeedChange={onFeedChange} />
      }}
    >

      <div
        style={{
          // backgroundColor: 'salmon',
          transform: 'translate(-50%,-50%)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '85%'
        }}
      >

        {feed.logs &&
          feed.logs.length > 0 &&
          <span>
            <FeedActivities
              count={1}
              feed={feed}
              onSeeMore={onActivitiesClick}
            />
            <Divider paddingTop={0} />
          </span>}

        {hasFeed &&
          !isEmailOrFileUpload &&
          <FeedSchedule
            feed={feed}
            onFeedChange={onFeedChange}
            onScheduleClick={onScheduleClick}
          />}

        <div style={{ textAlign: 'center' }}>
          {hasFeed
            ? <span>
                {isEmailOrFileUpload &&
                  <div style={{ marginBottom: 8 }}>
                    Click button to start feed
                  </div>}
                <RunNowButton
                  disabled={DISABLE_IF_FEED_STATUSES.includes(feed.status)}
                />
              </span>
            : <AddFeedButton />}
        </div>
      </div>
      <Row>
        <Col span={24} />
      </Row>

    </Card>
  );
};

export default FeedCard;
