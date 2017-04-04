import { PureComponent } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import FeedActivities from './FeedActivities';

class FeedActivitiesModal extends PureComponent {
  state = {};

  render() {
    const {
      visible = false,
      onCancel = () => {},
      feed = {}
    } = this.props;
    const {} = this.state;

    return (
      <div>
        <Modal
          title="Feed Activities"
          visible={visible}
          onCancel={onCancel}
          onOk={this.handleOk}
          footer={[
            <Button key="back" size="large" onClick={onCancel}>
              Close
            </Button>
          ]}
        >

          <Row type="flex" justify="center">
            <Col span={12}>

              <FeedActivities feed={feed} />
            </Col>
          </Row>

        </Modal>
      </div>
    );
  }

  handleOk = e => {
    e.preventDefault();
    const { onCancel = () => {} } = this.props;
    onCancel();
  };
}

export default FeedActivitiesModal;
