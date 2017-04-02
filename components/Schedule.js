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

const hours = [...new Array(24)].map((v, i) => {
  return (i + 1).toString();
});
const minutes = [...new Array(60)].map((v, i) => {
  return (i + 1).toString();
});

// Functional setState
const updateFrequencyValue = frequencyValue =>
  (state, props) => ({
    frequencyValue
  });

const updateFrequencyType = frequencyType =>
  (state, props) => ({ frequencyType, frequencyValue: '1' });

const showModalLoading = ModalText =>
  (state, props) => ({ confirmLoading: true, ModalText });

const hideModalLoading = () => (state, props) => ({ confirmLoading: false });

const updateDaysChange = (checkedList, plainOptions) =>
  (state, props) => ({
    checkedList,
    indeterminate: !!checkedList.length &&
      checkedList.length < plainOptions.length,
    checkAll: checkedList.length === plainOptions.length
  });

const updateAllDaysChange = (targetChecked, plainOptions) =>
  (state, props) => ({
    checkedList: targetChecked ? plainOptions : [],
    indeterminate: false,
    checkAll: targetChecked
  });

class Schedule extends PureComponent {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  };

  render() {
    const {
      visible = false,
      onChange = () => {},
      form: { getFieldDecorator, setFieldsValue = () => {} }
    } = this.props;
    const {
      startTime = '0',
      endTime = '0',
      frequencyType = 'minutes',
      frequencyValue = '1',
      confirmLoading,
      indeterminate,
      checkAll,
      checkedList
    } = this.state;
    const isFrequencyMinutes = frequencyType === 'minutes';

    return (
      <div>
        <Modal
          title="How frequent should this feed run?"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={onChange}
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
                    indeterminate={indeterminate}
                    onChange={e => {
                      this.setState(
                        updateAllDaysChange(e.target.checked, plainOptions)
                      );
                    }}
                    checked={checkAll}
                  >
                    Everyday
                  </Checkbox>
                </div>

                <CheckboxGroup
                  options={plainOptions}
                  value={checkedList}
                  onChange={checkedList => {
                    this.setState(updateDaysChange(checkedList, plainOptions));
                  }}
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
                    this.setState(updateFrequencyValue(frequencyValue));
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
                    this.setState(updateFrequencyType(frequencyType));
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
                  onChange={startTime => {
                    setFieldsValue({
                      startTime
                    });
                  }}
                />
              </Col>
              <Col span={12}>
                <TimePicker
                  label="End Time"
                  field="endTime"
                  getFieldDecorator={getFieldDecorator}
                  onChange={endTime => {
                    setFieldsValue({
                      endTime
                    });
                  }}
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
        this.setState(
          showModalLoading('The modal dialog will be closed after two seconds')
        );
        setTimeout(
          () => {
            onChange();
            this.setState(hideModalLoading);
          },
          2000
        );
      }
    });
  };
}

export default Form.create()(Schedule);
