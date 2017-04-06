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

const AddFeedButton = ({ feed }) => (
  <span>

    <Button
      type="dashed"
      icon="plus-square-o"
      style={{ fontSize: '5rem', padding: '0 1.4rem' }}
    />
    <div style={{ fontSize: '1rem', marginTop: '1rem' }}>
      Add Feed
    </div>
  </span>
);

const RunNowButton = ({ size, disabled = false }) => (
  <Button type="default" style={styleButton} size={size} {...{ disabled }}>
    Run Now
  </Button>
);

const ScheduleButton = ({ style = {}, onClick }) => (
  <Button
    shape="circle"
    icon="edit"
    style={{ ...styleButton, ...style }}
    onClick={onClick}
  />
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
  Image,
  AddFeedButton
};
