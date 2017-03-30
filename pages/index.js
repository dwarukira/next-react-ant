import stylesheet from 'styles/index.scss';
import antStyle from 'styles/index.less';
import App from '../components/App';
import Dashboard from '../components/Dashboard';

// or, if you work with plain css
// import stylesheet from 'styles/index.css'

export default () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: antStyle }} />
    <App>
      <Dashboard />
    </App>
  </div>
);
