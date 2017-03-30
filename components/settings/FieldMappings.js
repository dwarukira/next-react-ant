import { PureComponent } from 'react';
import { Form, Select, Input, Col } from 'antd';

const storeFields = [
  {
    required: true,
    value: 'sku',
    text: 'SKU'
  },
  {
    required: true,
    value: 'price',
    text: 'Price'
  },
  {
    required: true,
    value: 'title',
    text: 'Title'
  },
  {
    required: false,
    value: 'vendor',
    text: 'Vendor'
  }
];

class FieldMapping extends PureComponent {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      storeField: value.storeField,
      feedHeading: value.feedHeading
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    console.log('cwr > nextProps:', nextProps);
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  render() {
    const { storeField, feedHeading } = this.state;
    return (
      <div>
        <Input.Group compact>

          <Select
            value={storeField}
            placeholder="Select store field"
            style={{ width: '20%' }}
            onChange={this.handleStoreFieldChange}
          >
            {storeFields.map(field => (
              <Select.Option key={field.value} value={field.value}>
                {field.text}
              </Select.Option>
            ))}

          </Select>

          <Select
            value={feedHeading}
            placeholder="Select feed heading"
            style={{ width: '30%' }}
            onChange={this.handleFeedHeadingChange}
          >
            {storeFields.map(field => (
              <Select.Option key={field.value} value={field.value}>
                {field.text}
              </Select.Option>
            ))}

          </Select>
        </Input.Group>
      </div>
    );
  }

  handleStoreFieldChange = storeField => {
    if (!('value' in this.props)) {
      this.setState({ storeField });
    }
    this.triggerChange({ storeField });
  };
  handleFeedHeadingChange = feedHeading => {
    if (!('value' in this.props)) {
      this.setState({ feedHeading });
    }
    this.triggerChange({ feedHeading });
  };
  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };
}

export default class FieldMappings extends PureComponent {
  render() {
    console.log('FieldMappings render');
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    return (
      <Form.Item>
        {getFieldDecorator('field1', {
          initialValue: {},
          rules: [{ validator: this.checkField }]
        })(<FieldMapping />)}

      </Form.Item>
    );
  }
  checkField = (rule, value, callback) => {
    // console.log('checkField > rule:', rule);
    console.log('checkField > value:', value);
    const { storeField = '', feedHeading = '' } = value;
    if (storeField.length === 0) {
      callback('Please select a store field');
      return;
    }
    if (feedHeading.length === 0) {
      callback('Please select a feed heading');
      return;
    }
    callback();
  };
}
