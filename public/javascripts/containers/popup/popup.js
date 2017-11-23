import React, {Component} from 'react';
import './popup.css';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export default class PopUp extends Component
{
	render(){
		const template = this.props.template;
         return(  <div className='popup'>
				    <div className='popup_inner'>
				      <h1>{ReactHtmlParser(template)}</h1>
				      <button>close me</button>
				    </div>
				  </div> );
		}
}

