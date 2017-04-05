import { PureComponent } from 'react';
import { Form, TimePicker } from 'antd';

const format = 'HH:mm';

const timePickerLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const _TimePicker = (
  { getFieldDecorator, onChange, label, field, initialValue }
) => (
  <Form.Item {...timePickerLayout} label={label}>
    {getFieldDecorator(field, {
      initialValue,
      rules: [
        {
          type: 'object',
          required: true,
          message: 'Required'
        }
      ],
      onChange
    })(<TimePicker format={format} style={{ width: '100%' }} />)}

  </Form.Item>
);

export default _TimePicker;
