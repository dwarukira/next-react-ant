import moment from 'moment';

const FEED_STATUS = {
  QUEUED: 'queued',
  PROCESSING: 'processing'
};

const feeds = [
  {
    id: '1',
    title: 'Feed 1',
    fromType: 'Spreadsheet',
    from: 'file-excel',
    to: 'file-excel',
    status: 'processing',
    schedule: 'Daily 10am-10pm, Every 45 minutes',
    logs: [
      {
        id: '1',
        date: new Date('31-Jan-2017').getTime() / 1000,
        total_variants: 15,
        status: 'Success'
      },
      {
        id: '2',
        date: new Date('29-Jan-2017').getTime() / 1000,
        total_variants: 5,
        status: 'Error'
      },

      {
        id: '3',
        date: new Date('28-Jan-2017').getTime() / 1000,
        total_variants: 3,
        status: 'Success'
      },

      {
        id: '4',
        date: new Date('21-Jan-2017').getTime() / 1000,
        total_variants: 3,
        status: 'Error'
      }
    ]
  },
  {
    id: '2',
    title: 'Feed 2',
    fromType: 'CSV',
    from: 'file-text',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'queued',
    enabled: true,
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  },
  {
    id: '3',
    title: 'Feed 3',
    fromType: 'CSV',
    from: 'file-pdf',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  },
  {
    id: '4',
    title: 'Feed 4',
    fromType: 'CSV',
    from: 'file-excel',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    enabled: true,
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  }
];

const DateTime = ({ datetime, style = {} }) => (
  <span style={style}>
    {moment.unix(datetime).format('DD-MMM-YYYY h:mm a')}
  </span>
);

export { feeds, DateTime, FEED_STATUS };
