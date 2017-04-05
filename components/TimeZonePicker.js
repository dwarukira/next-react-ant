import { PureComponent } from 'react';
import { Form, Select } from 'antd';

import { TIME_ZONES } from './util';

const format = 'HH:mm';

const layout = {
  labelCol: {
    lg: { span: 24 }
    // sm: { span: 24 }
  },
  wrapperCol: {
    lg: { span: 24 }
    // sm: { span: 24 }
  }
};

const TimeZonePicker = (
  { getFieldDecorator, onChange, label, field, initialValue }
) => (
  <Form.Item {...layout} label={label}>
    {getFieldDecorator(field, {
      initialValue,
      rules: [
        {
          required: true,
          message: 'Required'
        }
      ],
      onChange
    })(
      <Select
        showSearch
        filterOption={(input, option) =>
          option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {TIME_ZONES.map(tz => {
          const key = Object.keys(tz)[0];
          return (
            <Select.Option key={key} value={key}>
              {tz[key]}
            </Select.Option>
          );
        })}

      </Select>
    )}

  </Form.Item>
);

export default TimeZonePicker;
