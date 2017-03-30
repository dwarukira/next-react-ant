import { PureComponent } from 'react';
import { Form, Select, Modal, Button, Row, Col, Checkbox } from 'antd';

import TimePicker from './TimePicker';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const defaultCheckedList = ['MON', 'FRI'];

const RowProps = {
  Gutter: 16
};

let styleFormControl = {
  width: '100%'
};

let styleRow = {
  marginBottom: '25px'
};

const styleCheckAll = {
  marginLeft: '10px'
};

class Schedule extends PureComponent {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  render() {
    const { visible = false } = this.props;
    const {
      startTime = '0',
      endTime = '0',
      frequencyType = 'minutes',
      frequencyValue = '1'
    } = this.state;
    const hours = [...new Array(24)].map((v, i) => {
      return (i + 1).toString();
    });
    const minutes = [...new Array(60)].map((v, i) => {
      return (i + 1).toString();
    });
    const isFrequencyMinutes = frequencyType === 'minutes';

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Modal
          title="How frequent should this feed run?"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>

            <Row gutter={RowProps.Gutter} style={styleRow}>
              <Col span={24}>
                <div
                  style={{
                    paddingBottom: '8px',
                    marginBottom: '8px'
                  }}
                  className="ant-border-bottom"
                >
                  Days{`   `}
                  <Checkbox
                    style={styleCheckAll}
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllDaysChange}
                    checked={this.state.checkAll}
                  >
                    Everyday
                  </Checkbox>
                </div>

                <CheckboxGroup
                  options={plainOptions}
                  value={this.state.checkedList}
                  onChange={this.onChangeDays}
                />
              </Col>
            </Row>

            <p style={{ marginBottom: '8px' }}>Frequency</p>
            <Row gutter={RowProps.Gutter} style={styleRow}>
              <Col span={12}>
                <Select
                  style={styleFormControl}
                  value={frequencyValue}
                  onChange={frequencyValue => {
                    this.setState({
                      frequencyValue
                    });
                  }}
                >
                  {isFrequencyMinutes
                    ? minutes.map(minute => (
                        <Option key={minute} value={minute}>{minute}</Option>
                      ))
                    : hours.map(hour => (
                        <Option key={hour} value={hour}>{hour}</Option>
                      ))}

                </Select>
              </Col>
              <Col span={12}>
                <Select
                  style={styleFormControl}
                  value={frequencyType}
                  onChange={frequencyType => {
                    this.setState({
                      frequencyType,
                      frequencyValue: '1'
                    });
                  }}
                >
                  <Option value="minutes">minute(s)</Option>
                  <Option value="hours">hours(s)</Option>
                </Select>
              </Col>
            </Row>
            <Row gutter={RowProps.Gutter} style={styleRow}>
              <Col span={12}>
                <TimePicker
                  label="Start Time"
                  field="startTime"
                  getFieldDecorator={getFieldDecorator}
                  onChange={this.onChangeStartTime}
                />
              </Col>
              <Col span={12}>
                <TimePicker
                  label="End Time"
                  field="endTime"
                  getFieldDecorator={getFieldDecorator}
                  onChange={this.onChangeEndTime}
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('err of form: ', err);
      console.log('Received values of form: ', values);
      if (!err) {
        const { onChange = () => {} } = this.props;
        this.setState({
          ModalText: 'The modal dialog will be closed after two seconds',
          confirmLoading: true
        });
        setTimeout(
          () => {
            onChange({
              popupScheduleVisible: false
            });
            this.setState({
              confirmLoading: false
            });
          },
          2000
        );
      } else {
      }
    });
  };
  handleCancel = () => {
    const { onChange = () => {} } = this.props;
    onChange({
      popupScheduleVisible: false
    });
  };
  onChangeStartTime = startTime => {
    // this.setState({ startTime });
    this.props.form.setFieldsValue({
      startTime
    });
  };
  onChangeEndTime = endTime => {
    this.setState({ endTime });
  };

  onChangeDays = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length &&
        checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllDaysChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };
}

export default Form.create()(Schedule);
