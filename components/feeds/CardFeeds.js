import { PureComponent } from 'react';
import { Card, Col, Row, Badge, Tag, Timeline, Icon } from 'antd';
import {
  ToggleFeedButton,
  FeedSettingsButton,
  DeleteFeedButton,
  RunNowButton,
  ScheduleButton,
  FeedScheduleInfo,
  Image
} from './FeedActions';
import Divider from '../Divider';
import { DateTime } from '../util';

const FeedStatus = ({ feed }) => (
  <div
    style={{
      fontWeight: '500'
    }}
  >
    <span className="feed-status">
      {feed.enabled ? 'Enabled' : 'Disabled'}
    </span>
  </div>
);

const LogActivity = ({ log, style = {} }) => (
  <Timeline>
    <Timeline.Item
      dot={<Icon type="clock-circle-o" style={{ fontSize: '.9rem' }} />}
    >
      <DateTime
        // style={{ fontSize: '.8rem' }}
        datetime={log.date}
        // key={log.id}
      />
      {' '}
      <Badge
        count={`${log.total_variants} variants`}
        style={{ fontSize: '.7rem' }}
      />
    </Timeline.Item>
  </Timeline>
);

export default class CardFeeds extends PureComponent {
  render() {
    const { feeds, onFeedChange, onScheduleClick } = this.props;
    return (
      <div style={{ padding: '30px' }}>
        <Row gutter={40}>
          {feeds.map(feed => (
            <Col span={8} key={feed.id} style={{ marginBottom: '30px' }}>
              <Card
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
                      <Tag
                        style={{
                          fontSize: '.75rem',
                          position: 'relative',
                          top: '-2px'
                        }}
                        color="green"
                      >
                        {feed.status}
                      </Tag>}
                    <FeedSettingsButton
                      feed={feed}
                      onFeedChange={onFeedChange}
                      style={{ marginRight: 0 }}
                    />
                  </div>
                }
              >

                <div style={{ padding: '16px 24px' }}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col
                      span={24}
                      style={{
                        textAlign: 'center',
                        textTransform: 'capitalize'
                      }}
                    >
                      {feed.status}
                    </Col>
                  </Row>
                  <Divider />
                  {feed.logs &&
                    feed.logs.length > 0 &&
                    feed.logs.map(log => (
                      <LogActivity log={log} key={log.id} />
                    ))}
                  <Divider />
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
                  <Row style={{ textAlign: 'center' }}>
                    <Col span={24}>
                      <RunNowButton />
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
