import { PureComponent } from 'react';
import { Select, Input, Form, Col, Icon } from 'antd';

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
  },
  {
    required: false,
    value: 'barcode',
    text: 'Barcode'
  },
  {
    required: false,
    value: 'product_type',
    text: 'Product Type'
  }
];

const feedHeadings = [
  {
    value: 'name',
    text: 'name',
    content: 'Adidas Shoes'
  },
  {
    value: 'price',
    text: 'price',
    content: 'RM199.00'
  },
  {
    value: 'title',
    text: 'title',
    content: 'The one you cannot resist'
  },
  {
    value: 'category_path',
    text: 'category_path',
    content: '/mens/shoes'
  }
];

class _FieldMapping extends PureComponent {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      key: value.key,
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
    const { storeField, feedHeading, key } = this.state;
    const { storeFieldDisabled = false, onRemove } = this.props;
    console.log('FieldMapping > this.props:', this.props);
    // console.log('FieldMapping > onRemove:', onRemove);
    return (
      <div>
        <Input.Group compact style={{ width: '95%', display: 'inline-block' }}>

          <Select
            value={storeField}
            placeholder="Select store field"
            style={{ width: '40%', verticalAlign: 'top' }}
            onChange={this.handleStoreFieldChange}
            disabled={storeFieldDisabled}
            combobox={storeFieldDisabled}
          >
            {storeFields.map(field => (
              <Select.Option key={field.value} value={field.value}>
                {field.text}
              </Select.Option>
            ))}
          </Select>

          <Select
            showSearch
            value={feedHeading}
            placeholder="Select feed heading"
            style={{ width: '55%', verticalAlign: 'top' }}
            onChange={this.handleFeedHeadingChange}
          >
            {feedHeadings.map(field => (
              <Select.Option key={field.value} value={field.value}>
                <div style={{ fontWeight: 500, textAlign: 'left' }}>
                  {field.text}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <small>
                    {field.content}
                  </small>
                </div>
              </Select.Option>
            ))}

          </Select>

        </Input.Group>
        <div
          style={{
            width: '5%',
            paddingLeft: 5,
            cursor: 'pointer',
            position: 'relative',
            top: '-2px',
            verticalAlign: 'top',
            fontSize: '24px',
            transition: 'all .3s',
            display: 'inline-block'
          }}
        >
          {!storeFieldDisabled &&
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => onRemove(key)}
            />}
        </div>

      </div>
    );
  }

  handleStoreFieldChange = storeField => {
    if (!('value' in this.props)) {
      this.setState({ storeField, key: storeField });
    }
    const { value } = this.props;
    this.triggerChange({
      storeField,
      key: storeField,
      oldKey: value.key
    });
  };
  handleFeedHeadingChange = feedHeading => {
    if (!('value' in this.props)) {
      this.setState({ feedHeading });
    }
    this.triggerChange({ feedHeading });
  };
  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    console.log('Triggerchange > this.state:', this.state);
    console.log('Triggerchange > changedValue:', changedValue);
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };
}

class FieldMapping extends PureComponent {
  render() {
    const {
      form: { getFieldDecorator },
      checkField,
      initialValue = {},
      initialValue: { key }
    } = this.props;
    console.log('initialValue:', initialValue);
    return (
      <Col xs={{ span: 24 }}>
        <Form.Item style={{ marginBottom: 20 }}>
          {getFieldDecorator(key, {
            initialValue,
            rules: [{ validator: checkField }]
          })(<_FieldMapping {...this.props} />)}
        </Form.Item>
      </Col>
    );
  }
}

export default FieldMapping;