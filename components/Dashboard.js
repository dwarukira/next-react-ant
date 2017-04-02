import { PureComponent } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import Breadcrumb from './Breadcrumb';
import Schedule from './Schedule';
import { feeds } from './util';
import { fromJS, toJS } from 'immutable';

const SIZES = {
  big: '2rem',
  large: '3rem',
  huge: '4rem',
  massive: '5rem'
};

let styleHeader = {
  marginBottom: '15px',
  fontWeight: '500'
};

const styleImage = size => ({ width: SIZES[size] });

let styleButton = {
  marginRight: '8px'
};

let styleFeedType = {
  textAlign: 'center',
  width: '85%'
};

const Image = ({ size, url }) => <img style={styleImage(size)} src={url} />;

// Functional setState
const makeScheduleVisible = (state, props) => ({
  popupScheduleVisible: true
});

const makeScheduleHidden = (state, props) => ({
  popupScheduleVisible: false
});

const toggleFeedRunning = feed =>
  (state, props) => {
    const imFeeds = fromJS(state.feeds);
    const index = imFeeds.findIndex(f => f.get('id') === feed.id);
    return {
      feeds: imFeeds
        .setIn([index, 'isRunning'], !state.feeds[index].isRunning)
        .toJS()
    };
  };

export default class Dashboard extends PureComponent {
  state = {
    popupScheduleVisible: false,
    feeds
  };

  render() {
    const { popupScheduleVisible, feeds } = this.state;

    return (
      <div>
        <Breadcrumb crumbs={[{ title: 'Feeds' }]} />
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
                {feed.title}
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
                Status:
                <span className="feed-status">
                  {` `}{feed.isRunning ? 'Running...' : 'Stopped'}
                </span>
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
                  {` `}Schedule <Icon type="arrow-right" />
                  {` `}{feed.schedule}
                </div>
                <Button
                  type="primary"
                  shape="circle"
                  icon={feed.isRunning ? 'pause' : 'play-circle'}
                  style={styleButton}
                  onClick={() => {
                    this.setState(toggleFeedRunning(feed));
                  }}
                />

                <Button
                  type="default"
                  shape="circle"
                  icon="edit"
                  style={styleButton}
                  onClick={e => {
                    window.location.href = `settings?id=${feed.id}`;
                  }}
                />
                <Button
                  type="danger"
                  shape="circle"
                  icon="delete"
                  style={styleButton}
                />
                <Button type="default" style={styleButton}>Run Now</Button>
                <Button
                  type="default"
                  icon="calendar"
                  style={styleButton}
                  onClick={() => {
                    this.setState(makeScheduleVisible);
                  }}
                >
                  Schedule
                </Button>
                <Schedule
                  visible={popupScheduleVisible}
                  onChange={() => {
                    this.setState(makeScheduleHidden);
                  }}
                />
              </div>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}
