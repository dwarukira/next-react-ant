import { PureComponent } from 'react';
import { Row, Col, Button } from 'antd';
// import { Image } from 'semantic-ui-react';

import { css } from 'glamor';

const SIZES = {
  big: '2rem',
  large: '3rem',
  huge: '4rem',
  massive: '5rem'
};

let cssImage = css({
  width: '100%'
  // borderRadius: '50%'
  // padding: '5px'
});
const Image = ({ size }) => (
  <img
    {...css(cssImage, css({ width: SIZES[size] }))}
    src="http://icons.iconarchive.com/icons/carlosjj/microsoft-office-2013/256/Excel-icon.png"
  />
);

let cssRow = css({
  padding: '15px 0'
});

export default class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Row {...cssRow} className="ant-border-bottom">
          <Col span={12}>
            <h4>
              Feed 1
            </h4>
            <Image size="huge" />
          </Col>
          <Col span={12}>
            <h4>
              Status
            </h4>

          </Col>
        </Row>
        <Row {...cssRow} className="ant-border-bottom">
          <Col span={12}>Feed 1</Col>
          <Col span={12}>Status</Col>
        </Row>

      </div>
    );
  }
}
