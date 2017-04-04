import { PureComponent } from 'react';
import { Card, Col, Row, Badge, Tag, Icon } from 'antd';
import {
  ToggleFeedButton,
  FeedSettingsButton,
  DeleteFeedButton,
  RunNowButton,
  ScheduleButton,
  FeedScheduleInfo,
  Image
} from './FeedActions';
import FeedActivities from './FeedActivities';
import Divider from '../Divider';
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

const FeedStatus = ({ feed }) => (
  <div
    style={{
      fontWeight: '500'
    }}
  >
    <span className={feed.enabled ? 'feed-enabled' : ''}>
      {feed.enabled ? 'Enabled' : 'Disabled'}
    </span>
  </div>
);

const FeedSchedule = ({ feed, onFeedChange, onScheduleClick }) => (
  <div>
    <Row type="flex" justify="space-around" align="middle">

      <Col span={8} style={{ textAlign: 'center' }}>
        <ToggleFeedButton
          feed={feed}
          onFeedChange={onFeedChange}
          large
          style={{ marginRight: 0, marginBottom: 5 }}
        />
        <small>
          <FeedStatus feed={feed} />
        </small>

      </Col>
      <Col span={16}>
        <FeedScheduleInfo feed={feed} onClick={onScheduleClick} />
      </Col>
    </Row>
    <Divider />

  </div>
);

const DISABLE_IF_FEED_STATUSES = [FEED_STATUS.PROCESSING, FEED_STATUS.QUEUED];

export default class CardFeeds extends PureComponent {
  render() {
    const {
      feeds,
      onFeedChange,
      onScheduleClick,
      onShowFeedActivitiesClick
    } = this.props;
    return (
      <div style={{ padding: '30px' }}>
        <Row gutter={24} type="flex" justify="start">
          {feeds.map(feed => (
            <Col
              xs={24}
              sm={12}
              md={8}
              // lg={6}
              key={feed.id}
              style={{ marginBottom: '30px' }}
            >
              <Card
                className={FeedStatusBorderColor(feed.status)}
                style={{ borderWidth: 2 }}
                bodyStyle={{ padding: 0 }}
                title={
                  <span>
                    <Col span={17} style={{ textAlign: 'left' }}>
                      <Image
                        url={feed.from}
                        style={{
                          top: '3px',
                          position: 'relative',
                          marginRight: 8
                        }}
                      />
                      {feed.title}

                    </Col>

                  </span>
                }
                extra={
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
                }
              >

                <div style={{ padding: '16px 24px' }}>

                  <FeedActivities
                    count={1}
                    feed={feed}
                    onSeeMore={onShowFeedActivitiesClick}
                  />
                  {feed.logs &&
                    feed.logs.length > 0 &&
                    <Divider paddingTop={0} />}

                  <FeedSchedule
                    feed={feed}
                    onFeedChange={onFeedChange}
                    onScheduleClick={onScheduleClick}
                  />
                  <Row style={{ textAlign: 'center' }}>
                    <Col span={24}>
                      <RunNowButton
                        disabled={DISABLE_IF_FEED_STATUSES.includes(
                          feed.status
                        )}
                      />
                    </Col>
                  </Row>

                </div>
              </Card>

            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
