import { ScheduleButton } from './FeedActions';
import { Time, DAYS } from '../util';

const noSchedule = (schedule = {}) => Object.keys(schedule).length === 0;

const ScheduleHeader = () => <span style={{ fontWeight: 600 }}>Schedule</span>;

const ScheduleInfo = ({ schedule = {} }) => {
  const { timeZone, startTime, days = [], frequencyValue } = schedule;
  return (
    <div style={{ fontSize: '.8rem' }}>
      <span>
        {days.length === DAYS.length
          ? 'Every day'
          : days.map(day => day).join(', ')}
        <div>
          {`at ${Time(startTime)}, Every ${frequencyValue} hours`}
        </div>
        <div>{timeZone}</div>
      </span>
    </div>
  );
};

const NoScheduleInfo = ({ onClick, feed }) => (
  <span>
    Add schedule
    <ScheduleButton onClick={() => onClick(feed)} style={{ marginLeft: 5 }} />
  </span>
);

const FeedScheduleInfo = ({ feed = {}, onClick = () => {} }) => {
  return (
    <span>
      {noSchedule(feed.schedule)
        ? <NoScheduleInfo onClick={onClick} feed={feed} />
        : <span>
            <ScheduleHeader />
            <ScheduleButton
              onClick={() => onClick(feed)}
              style={{ marginLeft: 5 }}
            />
            <ScheduleInfo schedule={feed.schedule} />
          </span>}

    </span>
  );
};
export default FeedScheduleInfo;
