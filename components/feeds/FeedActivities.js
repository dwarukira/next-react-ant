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

const TimelineDotColor = (status = '') => {
  const cn = { success: 'success', error: 'error' };
  return cn[status.toLowerCase()];
};

const LogActivity = ({ log, style = {} }) => (
  <Timeline.Item
    dot={<Badge status={TimelineDotColor(log.status)} className="no-text" />}
  >
    {DateTime(log.date)}
    <div>
      {`${log.total_variants} Variants`}
    </div>
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
    <div style={{ paddingTop: 16, xpaddingBottom: 16 }}>
      {recentLogs.length > 0 &&
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
        </Timeline>}
    </div>
  );
};

export default FeedActivities;
