import { PureComponent } from 'react';
import { Menu, Icon, Affix } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const styles = {
  root: {
    lineHeight: '64px',
    height: '65px'
  }
};

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
        style={styles.root}
      >
        <Menu.Item key="home">
          <a href="/">
            <Icon type="home" />Dashboard
          </a>
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
