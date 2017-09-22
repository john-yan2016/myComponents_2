import React, {
    Component,
} from 'react';

export default class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="test" style={{height:'700px',marginTop:'0px',padding:'20px'}}>
        建设中。。。
      </div>
    );
  }
}
