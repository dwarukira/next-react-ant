import { PureComponent } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import {
  ToggleFeedButton,
  FeedSettingsButton,
  DeleteFeedButton,
  RunNowButton,
  ScheduleButton,
  FeedScheduleInfo,
  Image
} from './FeedActions';

let styleHeader = {
  marginBottom: '15px'
};

let styleStatus = {
  fontWeight: '500'
};

let styleFeedType = {
  textAlign: 'center',
  width: '85%'
};

export default class RowFeeds extends PureComponent {
  render() {
    const {
      feeds,
      onScheduleClick,
      onFeedChange
    } = this.props;

    return (
      <div>
        {feeds.map(feed => (
          <Row
            key={feed.id}
            style={{
              padding: '15px 0'
            }}
            className="ant-border-bottom"
          >
            <Col span={8}>
              <div style={styleHeader}>
                <div style={styleStatus}>
                  {feed.title}
                </div>
              </div>
              <Row
                style={styleFeedType}
                type="flex"
                justify="space-around"
                align="middle"
              >
                <Col span={8}>
                  <Image size="huge" url={feed.from} />

                </Col>
                <Col span={8}>
                  <Icon
                    style={{
                      fontSize: '2rem'
                    }}
                    type="arrow-right"
                  />

                </Col>
                <Col span={8}>
                  <Image size="huge" url={feed.to} />

                </Col>
              </Row>
              <Row style={styleFeedType}>
                <Col span={24}>
                  {feed.fromType}
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <div style={styleHeader}>
                <div style={styleStatus}>
                  Status:
                  <span className="feed-status">
                    {` `}{feed.isRunning ? 'Running...' : 'Stopped'}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontSize: '.8rem'
                }}
              >
                <div className="feed-status">
                  {feed.status}
                </div>
                <div
                  style={{
                    marginBottom: '8px'
                  }}
                >
                  <FeedScheduleInfo feed={feed} />
                </div>
                <ToggleFeedButton feed={feed} onFeedChange={onFeedChange} />
                <FeedSettingsButton feed={feed} onFeedChange={onFeedChange} />
                <DeleteFeedButton />

                <RunNowButton />

                <ScheduleButton onClick={onScheduleClick} />

              </div>
            </Col>
          </Row>
        ))}

      </div>
    );
  }
}
