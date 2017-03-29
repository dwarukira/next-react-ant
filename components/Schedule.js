import { PureComponent } from 'react';
import { Select, Modal, Button, Row, Col, TimePicker, Checkbox } from 'antd';
import moment from 'moment';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const format = 'HH:mm';

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

export default class Schedule extends PureComponent {
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
    return (
      <div>
        <Modal
          title="How frequent should this feed be run?"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
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

          <p>Frequency</p>
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
                // ref={c => this.frequencyType = c}
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
              <p>

                Start Time
              </p>
              <TimePicker
                value={moment(startTime, format)}
                format={format}
                onChange={this.onChangeStartTime}
              />
            </Col>
            <Col span={12}>
              <p>
                End Time
              </p>
              <TimePicker
                value={moment(endTime, format)}
                format={format}
                onChange={this.onChangeEndTime}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }

  handleOk = () => {
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
  };
  handleCancel = () => {
    const { onChange = () => {} } = this.props;
    console.log('Clicked cancel button:', onChange);
    onChange({
      popupScheduleVisible: false
    });
  };
  onChangeStartTime = startTime => {
    this.setState({ startTime });
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
