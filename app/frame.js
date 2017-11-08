import React, {Component} from 'react';

import {
    Icon,
} from 'yrui';

import './frame.less';

export default class Frame extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = ({
      
    });
  }
 
  render() {
    return (
      <div className="frame">
        这是主页
        {this.props.children}
      </div>
    );
  }
}
