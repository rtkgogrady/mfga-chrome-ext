import _ from 'lodash';
import React, {Component} from 'react';
import {Button, Tabs, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import FeedUtil from '../../utils/FeedUtil';
import ThreatService from '../../services/ThreatService';

const initialState = 0;

class ThreatDetails extends Component {
  self;
  constructor(props) {
    super(props);
    self = this;
  }

  close() {
    self.props.dispatch({
      type: 'CLOSE_MODAL'
    });
  }

  open() {
    self.props.dispatch({
      type: 'OPEN_MODAL'
    });
  }

  makeFeeds(feeds) {
    let feedTabs = _.chain(feeds)
      .filter(feed => feed.threat)
      .map(FeedUtil.renderTab)
      .value();
    return (
      <Tabs defaultActiveKey={0} id='threat-tab'>
        {feedTabs}
      </Tabs>
    );
  }


  render() {
    if (!this.props.threat) return null;
    let {position} = this.props;
    let {threat} = this.props.threat;

    let feeds = this.makeFeeds(threat.feeds);

    return (
      <Modal bsSize='lg' show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Threat Details: {threat.target}<a target='_blank' style={{float: 'right'}} href={threat.dive}>Deep Dive</a></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {feeds}
        </Modal.Body>
        <Modal.Footer>
          <div className="pull-right">
            <Button onClick={this.close}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.modal,
    position: state.position
  };
};

export default connect(mapStateToProps)(ThreatDetails);
