import { PureComponent } from 'react';
import { Col, Row } from 'antd';
import FeedCard from './FeedCard';

const columnLayout = {
  xs: 24,
  sm: 12,
  md: 8,
  style: { marginBottom: '30px' }
  // lg={6}
};

const rowLayout = {
  style: { padding: '30px' },
  gutter: 24,
  type: 'flex',
  justify: 'start'
};

export default class CardFeeds extends PureComponent {
  render() {
    const {
      feeds,
      onFeedChange,
      onScheduleClick,
      onActivitiesClick,
      onAddFeed
    } = this.props;
    return (
      <Row {...rowLayout}>
        {feeds.map(feed => (
          <Col key={feed.id} {...columnLayout}>
            <FeedCard
              feed={feed}
              onFeedChange={onFeedChange}
              onScheduleClick={onScheduleClick}
              onActivitiesClick={onActivitiesClick}
            />
          </Col>
        ))}
        <Col {...columnLayout}>
          <FeedCard
            // feed={feed}
            onAddFeed={onAddFeed}
          />
        </Col>
      </Row>
    );
  }
}
