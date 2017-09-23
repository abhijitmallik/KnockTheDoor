import React , {Component} from 'react';
import Admin from '../containers/admin';
import '../../stylesheets/style.css';

export default class App extends Component{
	render(){
		return(
          <div className='main-container'>
             <Admin />
          </div>
		)
	}
}

