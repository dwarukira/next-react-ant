import { PureComponent } from 'react';
import { Steps, Button, message, Icon, Form, Affix } from 'antd';
import Breadcrumb from '../Breadcrumb';
import FieldMappings from './FieldMappings';
import { feeds } from '../util';

const steps = ({ step, form } = {}) => {
  const _steps = [
    {
      title: 'Field Mappings',
      content: <FieldMappings form={form} />
    },
    {
      title: 'Source File',
      content: 'Add file'
    },
    {
      title: 'Advanced',
      content: 'Advanced settings'
    },
    {
      title: 'Summary',
      content: 'Email me when done'
    }
  ];
  // if (step) console.log('steps > step :', step);
  // if (step) console.log('steps > form :', form);
  return step >= 0 ? _steps[step] : _steps;
};

const WrapperForm = Form.create()(({ steps, step, form }) => (
  <Form style={{ padding: '20px 30px', minHeight: '200px' }}>
    {steps({ step, form }).content}
  </Form>
));

export default class Settings extends PureComponent {
  state = {
    current: 0
  };
  render() {
    const { url: { query: { id } } } = this.props;
    const { current, status } = this.state;
    const feed = feeds.filter(feed => feed.id === id);
    const { title = '' } = (feed.length > 0 && feed[0]) || {};

    return (
      <div>
        <Breadcrumb crumbs={[{ title: 'Feed Settings' }, { title }]} />

        <div style={{ padding: '20px' }}>
          <Affix offsetTop={65} style={{}} />
          <Steps
            current={current}
            status={status || undefined}
            style={{
              padding: '8px 0'
            }}
          >
            {steps().map(item => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div
            className="steps-content"
            style={{
              textAlign: 'center',
              marginTop: '24px',
              minHeight: 300
            }}
          >
            <WrapperForm
              ref={c => this.stepForm = c}
              steps={steps}
              step={current}
            />
          </div>
          <div
            style={{
              marginTop: '24px',
              textAlign: 'right'
            }}
          >
            {this.state.current > 0 &&
              <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>}

            {this.state.current < steps().length - 1 &&
              <Button type="primary" onClick={this.next}>Next</Button>}
            {this.state.current === steps().length - 1 &&
              <Button
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>}
          </div>
        </div>
      </div>
    );
  }
  next = e => {
    e.preventDefault();
    // console.log('this.stepForm:', this.stepForm);
    this.stepForm.validateFields((err, values) => {
      console.log('err of form: ', err);
      // console.log('Received values of form: ', values);
      if (!err) {
        console.log('Validate OK');
        const current = this.state.current + 1;
        this.setState({ status: 'finish' });
        this.setState({ current, status: 'process' });
      } else {
        this.setState({ status: 'error' });
        console.log('Validate FAIL');
      }
    });
  };
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
}
