import { PureComponent } from 'react';
import { Breadcrumb, Icon } from 'antd';
let styleBreadCrumb = { marginTop: '20px', marginBottom: '20px' };

const _Breadcrumb = ({ crumbs = [] }) => (
  <Breadcrumb style={styleBreadCrumb}>
    <Breadcrumb.Item href="/">
      <Icon type="home" />
    </Breadcrumb.Item>
    {crumbs.length > 0 &&
      crumbs.map(crumb => (
        <Breadcrumb.Item key={crumb} href="">
          <span>{crumb.title}</span>
        </Breadcrumb.Item>
      ))}
  </Breadcrumb>
);

export default _Breadcrumb;
