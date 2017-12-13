import React,{Component} from 'react';
export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  toggleChange = () => {
    this.props.userSelected(!this.state.isChecked);
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
  render() {
    return (
        <input type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />
    );
  }
}