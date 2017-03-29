import stylesheet from 'styles/index.scss';
import antStyle from 'styles/index.less';
import App from '../components/App';
import Settings from '../components/Settings';
// or, if you work with plain css
// import stylesheet from 'styles/index.css'

import { feeds } from '../components/util';

export default () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: antStyle }} />
    <App breadcrumb="Feed Settings">
      <Settings feed={feeds[0]} />
    </App>
  </div>
);
