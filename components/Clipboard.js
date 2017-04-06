import { PureComponent } from 'react';
import _Clipboard from 'clipboard';

import { Input, Button, Tooltip } from 'antd';

const getInputId = id => `input-${id}`;
const getButtonId = id => `button-${id}`;
const TOOLTIP_TEXT = 'Copied to clipboard!';

class Clipboard extends PureComponent {
  state = {
    tooltipVisible: false
  };
  componentDidMount() {
    const { id } = this.props;
    const inputId = getInputId(id);
    const buttonId = getButtonId(id);
    this.cb = new _Clipboard(`#${buttonId}`, {
      target: () => document.getElementById(inputId)
    }).on('success', () => {
      this.setState({
        tooltipVisible: true
      });
    });
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.cb.destroy();
  }
  render() {
    const { id, defaultValue = 'Text to copy' } = this.props;
    const { tooltipVisible } = this.state;
    return (
      <div>
        <Input
          id={getInputId(id)}
          readOnly={true}
          style={{ textAlign: 'center', marginBottom: 16 }}
          defaultValue={defaultValue}
        />

        <Tooltip
          title={TOOLTIP_TEXT}
          trigger="hover"
          visible={tooltipVisible}
          onVisibleChange={visible => {
            this.setState({
              tooltipVisible: false
            });
          }}
        >
          <Button id={getButtonId(id)}>
            Copy to Clipboard
          </Button>
        </Tooltip>
      </div>
    );
  }
}

export default Clipboard;
