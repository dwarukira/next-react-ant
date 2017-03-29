import { PureComponent } from 'react';
import {
  LocaleProvider,
  DatePicker,
  Button,
  Layout,
  Breadcrumb,
  Icon
} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import TopNav from './TopNav';

const { Header, Footer, Sider, Content } = Layout;

let styleHeader = { position: 'fixed', width: '100%', zIndex: 10 };
let styleContent = { marginTop: '64px', padding: '0 50px' };
let styleFooter = { textAlign: 'center' };
let styleBreadCrumb = { marginTop: '20px', marginBottom: '20px' };

export default class App extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout>
          <Header style={styleHeader}>
            <TopNav />
          </Header>
          <Content style={styleContent}>
            <Breadcrumb style={styleBreadCrumb}>
              <Breadcrumb.Item href="">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <span>{this.props.breadcrumb}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            {this.props.children}
          </Content>
          <Footer style={styleFooter}>Stock Sync © 2017</Footer>
        </Layout>
      </LocaleProvider>
    );
  }
}
