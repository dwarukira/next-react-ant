import { PureComponent } from 'react';
import { LocaleProvider, DatePicker, Button, Layout } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import TopNav from './TopNav';

const { Header, Footer, Sider, Content } = Layout;

let styleHeader = { position: 'fixed', width: '100%', zIndex: 10 };
let styleContent = { marginTop: '64px', padding: '0 50px' };
let styleFooter = { textAlign: 'center' };

export default class App extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout>
          <Header style={styleHeader}>
            <TopNav />
          </Header>
          <Content style={styleContent}>
            {this.props.children}
          </Content>
          <Footer style={styleFooter}>Stock Sync © 2017</Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}
