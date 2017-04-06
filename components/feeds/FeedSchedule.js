import { Row, Col, Icon } from 'antd';
import Divider from '../Divider';
import { ToggleFeedButton } from './FeedActions';

import FeedScheduleInfo from './FeedScheduleInfo';

const rowLayout = {
  type: 'flex',
  justify: 'space-around',
  align: 'middle'
};

const leftColumnLayout = {
  span: 8,
  style: { textAlign: 'center' }
};

const rightColumnLayout = {
  span: 16
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

const WithSchedule = ({ feed, onFeedChange, onScheduleClick }) => (
  <Row {...rowLayout}>
    <Col {...leftColumnLayout}>
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
    <Col {...rightColumnLayout}>
      <FeedScheduleInfo feed={feed} onClick={onScheduleClick} />
    </Col>
  </Row>
);

const NoSchedule = ({ onScheduleClick, feed }) => (
  <Row {...rowLayout}>
    <Col {...leftColumnLayout}>
      <Icon type="clock-circle-o" style={{ fontSize: 48 }} />
    </Col>
    <Col {...rightColumnLayout}>
      <FeedScheduleInfo feed={feed} onClick={onScheduleClick} />
    </Col>
  </Row>
);

const FeedSchedule = ({ feed, onFeedChange, onScheduleClick }) => (
  <div>
    {feed.schedule
      ? <WithSchedule
          feed={feed}
          onScheduleClick={onScheduleClick}
          onFeedChange={onFeedChange}
        />
      : <NoSchedule feed={feed} onScheduleClick={onScheduleClick} />}
    <Divider />

  </div>
);

export default FeedSchedule;
