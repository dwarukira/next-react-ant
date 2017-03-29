import { PureComponent } from 'react';

export default class Settings extends PureComponent {
  render() {
    const { feed: { title } } = this.props;
    return (
      <div>
        Settings for {title}
      </div>
    );
  }
}
