const feeds = [
  {
    id: '1',
    title: 'Feed 1',
    fromType: 'Spreadsheet',
    from: 'http://s7d9.scene7.com/is/image/minesafetyappliances/excel-icon?fmt=png-alpha',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'Update completed. Refresh to see status',
    schedule: 'Daily 10am-10pm, Every 45 minutes'
  },
  {
    id: '2',
    title: 'Feed 2',
    fromType: 'CSV',
    from: 'https://upload.wikimedia.org/wikipedia/lb/7/7e/CSV_Logo.jpg',
    to: 'https://www.avalara.com/wp-content/uploads/2016/04/shopify_icon.png',
    status: 'Running...',
    schedule: 'Mon, Fri, Sat 10am-10pm, Every 4 hours'
  }
];

export { feeds };
