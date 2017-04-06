import { PureComponent } from 'react';
import { Upload, Icon, message } from 'antd';

const props = {
  name: 'file',
  // multiple: true,
  showUploadList: { showPreviewIcon: true, showRemoveIcon: false },
  action: '//jsonplaceholder.typicode.com/posts/'
};

const disableFileUpload = (state, props) => ({
  disabled: true
});

class FileUpload extends PureComponent {
  state = {
    disabled: false
  };
  render() {
    const { disabled } = this.state;
    return (
      <div
        style={{
          minHeight: 180
        }}
      >
        <Upload.Dragger
          {...props}
          disabled={disabled}
          onChange={info => {
            const status = info.file.status;
            if (status !== 'uploading') {
              console.log('info.file:', info.file);
              console.log('info.fileList:', info.fileList);
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
              // this.setState(disableFileUpload);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <div style={{ padding: '16px' }}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload
            </p>
          </div>
        </Upload.Dragger>
      </div>
    );
  }
}

export default FileUpload;
