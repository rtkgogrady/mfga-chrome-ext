import React, {Component} from 'react';
import {connect} from 'react-redux';

import ThreatDetails from './ThreatDetails.jsx';
import ThreatService from '../../services/ThreatService';


const initialState = 0;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mouseup', (e) => {
      let selectedText = window.getSelection().toString().trim();
      if (_.isEmpty(selectedText)) return;
      window.getSelection().removeAllRanges();
      let target = e.target;
      ThreatService.getDetailsFor(selectedText)
        .then(res => {
          this.props.dispatch({
            type: 'TEXT_SELECTED',
            text: res.body
          }).then(() => {
            this.props.dispatch({
              type: 'OPEN_MODAL'
            });
          });
        });
    });
  }

  render() {
    return (
        <ThreatDetails threat={this.props.threat} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    threat: state.threat
  };
};

export default connect(mapStateToProps)(App);
