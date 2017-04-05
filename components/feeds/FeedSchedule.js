import { Row, Col } from 'antd';
import Divider from '../Divider';
import { ToggleFeedButton, FeedScheduleInfo } from './FeedActions';

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

export default FeedSchedule;
