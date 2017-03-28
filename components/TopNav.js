import { PureComponent } from 'react';
import { Menu, Icon, Affix } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { css } from 'glamor';

const styles = {
  root: {
    lineHeight: '64px',
    height: '65px'
  }
};
let cssRoot = css(styles.root);

export default class TopNav extends PureComponent {
  state = {
    current: 'mail'
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        // theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        // {...cssRoot}
        // className={cssRoot}
        style={styles.root}
      >
        <Menu.Item key="home">
          <Icon type="home" />Dashboard
        </Menu.Item>

        <Menu.Item key="logout" style={{ float: 'right' }}>
          Logout
        </Menu.Item>
        <Menu.Item key="plans" style={{ float: 'right' }}>
          Plans
        </Menu.Item>

      </Menu>
    );
  }
}
