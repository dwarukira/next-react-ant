import { Button, Icon, Switch, Tooltip } from 'antd';

let styleButton = {
  marginRight: '8px'
};

const ToggleFeedButton = ({ feed, onFeedChange = () => {}, style = {} }) => (
  <Switch
    size="small"
    checked={feed.enabled}
    onChange={() => onFeedChange(feed)}
    style={style}
  />
);

const FeedSettingsButton = ({ feed, style = {} }) => (
  <Tooltip title="Feed settings" overlayStyle={{ fontSize: '.8rem' }}>
    <Button
      type="default"
      shape="circle"
      icon="setting"
      style={{ ...styleButton, ...{ border: 0 }, ...style }}
      onClick={e => {
        window.location.href = `settings?id=${feed.id}`;
      }}
    />
  </Tooltip>
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
    <span style={{ fontWeight: 600 }}>Schedule</span>
    <ScheduleButton onClick={onClick} style={{ marginLeft: 5 }} />
    <br /><span style={{ fontSize: '.8rem' }}>{feed.schedule}</span>
  </span>
);

const SIZES = {
  normal: '1.5rem',
  big: '2rem',
  large: '3rem',
  huge: '4rem',
  massive: '5rem'
};

const styleImage = size => ({ fontSize: SIZES[size] });

const Image = ({ size = 'normal', url, style = {} }) => (
  <Icon style={{ ...styleImage(size), ...style }} type={url} />
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
