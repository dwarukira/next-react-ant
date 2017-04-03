import moment from 'moment';

const feeds = [
  {
    id: '1',
    title: 'Feed 1',
    fromType: 'Spreadsheet',
    from: 'http://s7d9.scene7.com/is/image/minesafetyappliances/excel-icon?fmt=png-alpha',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'processing',
    schedule: 'Daily 10am-10pm, Every 45 minutes',
    logs: [
      {
        id: '1',
        date: new Date().getTime() / 1000,
        total_variants: 15
      }
    ]
  },
  {
    id: '2',
    title: 'Feed 2',
    fromType: 'CSV',
    from: 'https://upload.wikimedia.org/wikipedia/lb/7/7e/CSV_Logo.jpg',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'queued',
    enabled: true,
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  },
  {
    id: '3',
    title: 'Feed 3',
    fromType: 'CSV',
    from: 'https://upload.wikimedia.org/wikipedia/lb/7/7e/CSV_Logo.jpg',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  },
  {
    id: '4',
    title: 'Feed 4',
    fromType: 'CSV',
    from: 'https://upload.wikimedia.org/wikipedia/lb/7/7e/CSV_Logo.jpg',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'Running...',
    enabled: true,
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  }
];

const DateTime = ({ datetime }) => (
  <span>{moment.unix(datetime).format('DD-MMM-YYYY, h:mm a')}</span>
);

export { feeds, DateTime };
