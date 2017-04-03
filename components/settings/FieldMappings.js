import { PureComponent } from 'react';
import { Form, Button, Icon, Row } from 'antd';

import FieldMapping from './FieldMapping';

const FIELD_MAPPINGS = 'FIELD_MAPPINGS';

const requiredFields = [
  {
    key: 'SKU',
    storeField: 'SKU',
    required: true
  },
  {
    key: 'Price',
    storeField: 'Price',
    required: true
  },
  {
    key: 'Title',
    storeField: 'Title',
    required: true
  }
];

export default class FieldMappings extends PureComponent {
  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    getFieldDecorator('fieldMappings', {
      initialValue: requiredFields
    });
    const fieldMappings = getFieldValue('fieldMappings');
    console.log(
      'RENDER fieldMappings:',
      JSON.stringify(fieldMappings, null, 2)
    );

    const formItems = fieldMappings.map(fm => {
      return (
        <div key={fm.key}>
          <FieldMapping
            initialValue={fm}
            checkField={this.checkField}
            form={form}
            storeFieldDisabled={fm.required}
            onRemove={this.remove}
          />
        </div>
      );
    });
    return (
      <div>
        <Row>
          {formItems}
        </Row>
        <Row>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
          <Form.Item style={{ textAlign: 'right' }} />
        </Row>
      </div>
    );
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const fieldMappings = form.getFieldValue('fieldMappings');
    // console.log('fieldMappings:', fieldMappings);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      fieldMappings: [...fieldMappings, { key: new Date().toString() }]
    });
  };

  remove = keyToRemove => {
    const { form } = this.props;
    // can use data-binding to get
    const fieldMappings = form.getFieldValue('fieldMappings');
    // We need at least one field
    if (fieldMappings.length === requiredFields.length) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      fieldMappings: fieldMappings.filter(fm => fm.key !== keyToRemove)
    });
  };

  checkField = (rule, value, callback) => {
    // console.log('checkField > rule:', rule);
    console.log('checkField > value:', value);
    const { storeField = '', feedHeading = '', key, oldKey } = value;

    const { form } = this.props;
    const fieldMappings = form.getFieldValue('fieldMappings');
    form.setFieldsValue({
      fieldMappings: fieldMappings.map(fm => {
        // console.log('key:', key);
        // console.log('oldKey:', oldKey);
        // updateStoreFieldInFieldMapping
        if (key !== oldKey && fm.key === oldKey) {
          fm = { key, storeField };
        }
        // updateFeedHeadingInFieldMapping
        if (fm.key === key && feedHeading.length > 0) {
          fm.feedHeading = feedHeading;
        }
        return fm;
      })
    });
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
