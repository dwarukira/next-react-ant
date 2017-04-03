import { Button, Icon, Switch } from 'antd';

let styleButton = {
  marginRight: '8px'
};

const _ToggleFeedButton = (
  { feed, onFeedChange = () => {}, large, style = {} }
) => (
  <Button
    type="primary"
    {...large ? {} : { shape: 'circle' }}
    // shape="circle"
    icon={feed.isRunning ? 'pause' : 'play-circle'}
    style={{
      ...styleButton,
      ...(large
        ? {
            fontSize: '1.5rem',
            padding: '0 8px'
          }
        : {}),
      ...style
    }}
    size="large"
    onClick={() => onFeedChange(feed)}
  />
);

const ToggleFeedButton = ({ feed, onFeedChange = () => {}, style = {} }) => (
  <Switch
    size="small"
    checked={feed.enabled}
    onChange={() => onFeedChange(feed)}
    style={style}
  />
);

const FeedSettingsButton = ({ feed, style = {} }) => (
  <Button
    type="default"
    shape="circle"
    icon="setting"
    style={{ ...styleButton, ...style }}
    onClick={e => {
      window.location.href = `settings?id=${feed.id}`;
    }}
  />
);

const DeleteFeedButton = ({ feed }) => (
  <Button type="danger" shape="circle" icon="delete" style={styleButton} />
);

const RunNowButton = ({ size }) => (
  <Button type="default" style={styleButton} size={size}>Run Now</Button>
);

const ScheduleButton = ({ style = {}, onClick = () => {} }) => (
  <Button
    shape="circle"
    // type="dashed"
    icon="edit"
    style={{ ...styleButton, ...{ xborder: 0 }, ...style }}
    onClick={onClick}
  />
);

const FeedScheduleInfo = ({ feed, onClick }) => (
  <span>
    Schedule
    <ScheduleButton onClick={onClick} style={{ marginLeft: 5 }} />
    <br />{feed.schedule}

  </span>
);

const SIZES = {
  big: '2rem',
  large: '3rem',
  huge: '4rem',
  massive: '5rem'
};

const styleImage = size => ({ width: SIZES[size] || '100%' });

const Image = ({ size, url, style = {} }) => (
  <img style={{ ...styleImage(size), ...style }} src={url} />
);

export {
  ToggleFeedButton,
  FeedSettingsButton,
  DeleteFeedButton,
  RunNowButton,
  ScheduleButton,
  FeedScheduleInfo,
  Image
};
