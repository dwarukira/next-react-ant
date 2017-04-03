import { PureComponent } from 'react';
import { Card, Col, Row, Badge } from 'antd';
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
  <Row style={style}>
    <Col span={22}>
      <DateTime datetime={log.date} key={log.id} />
    </Col>
    <Col span={2}>
      <Badge count={log.total_variants} style={style} />
    </Col>
  </Row>
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
                style={{ width: 240 }}
                bodyStyle={{ padding: 0 }}
                title={
                  <span>
                    <Col span={5}>
                      <Image
                        url={feed.from}
                        style={{
                          top: '5px',
                          position: 'relative'
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      {feed.title}
                    </Col>

                  </span>
                }
                extra={
                  <FeedSettingsButton
                    feed={feed}
                    onFeedChange={onFeedChange}
                    style={{ marginRight: 0, top: '-4px' }}
                  />
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
                  <Row type="flex" justify="space-around" align="middle">
                    <Col
                      span={24}
                      style={{
                        // textAlign: 'left'
                      }}
                    >
                      {feed.logs &&
                        feed.logs.length > 0 &&
                        feed.logs.map(log => (
                          <LogActivity log={log} key={log.id} />
                        ))}
                    </Col>
                  </Row>
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
                      <small>
                        <FeedScheduleInfo
                          feed={feed}
                          onClick={onScheduleClick}
                        />
                      </small>

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
