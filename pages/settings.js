import stylesheet from 'styles/index.scss';
import antStyle from 'styles/index.less';
import App from '../components/App';
import Settings from '../components/settings/Settings';
// or, if you work with plain css
// import stylesheet from 'styles/index.css'

import { feeds } from '../components/util';

export default props => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: antStyle }} />
    <App>
      <Settings {...props} />
    </App>
  </div>
);
