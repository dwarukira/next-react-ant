import { PureComponent } from 'react';
import {
  Form,
  Select,
  Modal,
  Button,
  Row,
  Col,
  Checkbox,
  Icon,
  InputNumber
} from 'antd';

import TimePicker from './TimePicker';
import TimeZonePicker from './TimeZonePicker';
import { DAYS, DateTimeMoment } from './util';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

// Functional setState
const updateFrequencyValue = frequencyValue =>
  (state, props) => ({
    frequencyValue
  });

const showModalLoading = ModalText =>
  (state, props) => ({ confirmLoading: true, ModalText });

const hideModalLoading = (state, props) => ({ confirmLoading: false });

const updateFeedSchedule = schedule => (state, props) => ({ schedule });

const FeedFrequency = (
  { getFieldDecorator, initialValue = 1, onChange = () => {} }
) => (
  <div>
    {getFieldDecorator('frequencyValue', {
      initialValue,
      rules: [
        {
          required: true,
          message: 'Required'
        }
      ],
      onChange
    })(<InputNumber min={1} max={24} />)}
  </div>
);

class Schedule extends PureComponent {
  state = {};

  componentWillReceiveProps(nextProps) {
    const {
      feed = {},
      feed: { schedule = {} }
    } = nextProps;
    // console.log('schedule:', schedule);
    this.setState(updateFeedSchedule(schedule));
  }

  render() {
    const {
      visible = false,
      onChange = () => {},
      onCancel = () => {},
      feed,
      form: { getFieldDecorator, setFieldsValue = () => {} }
    } = this.props;
    const {
      schedule = {},
      confirmLoading,
      checkedList
    } = this.state;
    const { timeZone, frequencyValue, days } = schedule;
    const startTime = DateTimeMoment(schedule.startTime);

    return (
      <div>
        <Modal
          title={
            <span>
              {feed.title}
              {' '}
              <Icon type="arrow-right" />
              {' '}
              How frequent should this feed run?
            </span>
          }
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form>

            <Row>
              <Col span={24}>
                <div
                  style={{
                    paddingBottom: '8px',
                    marginBottom: '8px'
                  }}
                  className="ant-border-bottom"
                >
                  Days{`   `}

                </div>

                <Form.Item label="">
                  {getFieldDecorator('days', {
                    initialValue: days,
                    rules: [
                      {
                        required: true,
                        message: 'Required'
                      }
                    ]
                  })(<CheckboxGroup options={DAYS} />)}
                </Form.Item>

              </Col>
            </Row>

            <p style={{ marginBottom: '8px' }}>Frequency</p>
            <Row>
              <Col span={12}>
                <Form.Item label="">

                  <Row
                    // gutter={16}
                    type="flex"
                    justify="space-around"
                    align="middle"
                  >
                    <Col xs={5}>
                      <small>
                        Every
                      </small>
                    </Col>
                    <Col xs={10}>
                      <FeedFrequency
                        getFieldDecorator={getFieldDecorator}
                        onChange={frequencyValue => {
                          this.setState(updateFrequencyValue(frequencyValue));
                        }}
                        initialValue={frequencyValue}
                      />
                    </Col>
                    <Col span={6}>
                      <small>
                        hours
                      </small>
                    </Col>
                  </Row>
                </Form.Item>

              </Col>
              <Col span={12}>
                <TimePicker
                  label="Start Time"
                  field="startTime"
                  initialValue={startTime}
                  getFieldDecorator={getFieldDecorator}
                  onChange={startTime => {
                    setFieldsValue({
                      startTime
                    });
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <TimeZonePicker
                  label="Time Zone"
                  field="timeZone"
                  initialValue={timeZone}
                  getFieldDecorator={getFieldDecorator}
                  onChange={timeZone => {
                    setFieldsValue({
                      timeZone
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
    const { form, feed } = this.props;
    const { getFieldsValue } = form;
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
            this.setState(hideModalLoading);
            onChange(feed, values);
          },
          10
        );
      }
    });
  };
}

export default Form.create()(Schedule);
