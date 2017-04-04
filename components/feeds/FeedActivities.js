import { Timeline, Icon, Badge } from 'antd';
// import Divider from '../Divider';
import { DateTime } from '../util';

const LogBackgroundColor = (status = '') => {
  const cn = {
    success: 'bg-success',
    error: 'bg-error'
  };
  return cn[status.toLowerCase()];
};

const LogActivity = ({ log, style = {} }) => (
  <Timeline.Item
    dot={<Icon type="clock-circle-o" style={{ fontSize: '.9rem' }} />}
  >
    <DateTime datetime={log.date} />
    <Badge
      className={LogBackgroundColor(log.status)}
      count={`${log.total_variants} Variants`}
      style={{ fontSize: '.7rem', marginLeft: 8 }}
    />
  </Timeline.Item>
);

const FeedActivities = ({ feed = {}, count, onSeeMore }) => {
  const { logs = [] } = feed;
  // console.log('logs:', logs);
  const recentLogs = count
    ? logs.filter((log, i) => i <= count - 1)
    : [...logs];
  // console.log('recentLogs:', recentLogs);
  return (
    <div>
      {recentLogs.length > 0 &&
        <div>
          <Timeline
            pending={
              onSeeMore
                ? <a href="#" onClick={() => onSeeMore(feed)}>
                    See more
                  </a>
                : ''
            }
          >
            {recentLogs.map(log => <LogActivity log={log} key={log.id} />)}
          </Timeline>
        </div>}
    </div>
  );
};

export default FeedActivities;
