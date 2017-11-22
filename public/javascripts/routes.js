import {Route, Switch} from 'react-router-dom';
import App from './component/app.js';
import Employees from './containers/employees';
const routes=(
      <Switch >
       <Route path="/employee" component={Employees}/>
       <Route path="/" component={App} />
      </Switch >
)
export default routes;