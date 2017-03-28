import { PureComponent } from 'react';
import { DatePicker, Button, Layout, Breadcrumb, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import TopNav from './TopNav';
import Dashboard from './Dashboard';

import { css } from 'glamor';

let rule = css({
  height: '1000px'
});

let cssHeader = css({ position: 'fixed', width: '100%', zIndex: 10 });
let cssContent = css({ marginTop: '64px', padding: '0 50px' });
let styleBreadCrumb = { marginTop: '20px', marginBottom: '20px' };

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Layout {...rule}>
          <Header {...cssHeader}>
            <TopNav />
          </Header>
          <Content {...cssContent}>
            <Breadcrumb style={styleBreadCrumb}>
              <Breadcrumb.Item href="">
                <Icon type="home" />
                <span>Dashboard</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <span>Feeds</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Dashboard />
          </Content>
          <Footer>Footer</Footer>
        </Layout>

      </div>
    );
  }
}
