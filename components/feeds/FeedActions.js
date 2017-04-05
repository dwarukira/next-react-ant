import { Button, Icon, Switch, Tooltip } from 'antd';
import { Time, DAYS } from '../util';
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

const AddFeedButton = ({ feed }) => (
  <Button type="primary" icon="add" style={styleButton}>Add Feed</Button>
);

const RunNowButton = ({ size, disabled = false }) => (
  <Button type="default" style={styleButton} size={size} {...{ disabled }}>
    Run Now
  </Button>
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

const FeedScheduleInfo = ({ feed = {}, onClick }) => {
  const { schedule = {} } = feed;
  const { timeZone, startTime, days = [], frequencyValue } = schedule;
  console.log('FeedScheduleInfo > schedule:', schedule);
  return (
    <span>
      <span style={{ fontWeight: 600 }}>Schedule</span>
      <ScheduleButton onClick={() => onClick(feed)} style={{ marginLeft: 5 }} />
      <div style={{ fontSize: '.8rem' }}>
        {days.length === DAYS.length
          ? 'Every day'
          : days.map(day => day).join(', ')}
        <div>
          {`at ${Time(startTime)}, Every ${frequencyValue} hours`}
        </div>
        <div>{timeZone}</div>
      </div>
    </span>
  );
};

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
  Image,
  AddFeedButton
};
