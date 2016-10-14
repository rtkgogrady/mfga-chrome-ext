import {Tab} from 'react-bootstrap';

import whois_renderer from './renderers/whois';
import awn_renderer from './renderers/awn';
import emerging_threats_renderer from './renderers/emerging-threats';

const PUBLISHERS = {
  ALIENVAULTS: 'alienvault',
  AWN: 'awn',
  EMERGING_THREATS: 'emerging-threats',
  WHOIS: 'whois'
};

const renderers = {
  [PUBLISHERS.ALIENVAULTS]: feed => {
    let info = null;
    return {
      header: 'Alien Vault',
      info: info
    };
  },

  [PUBLISHERS.AWN]: awn_renderer,

  [PUBLISHERS.EMERGING_THREATS]: emerging_threats_renderer,

  [PUBLISHERS.WHOIS]: whois_renderer
};

class FeedUtil {
  static renderThreat(threat) {
    console.log('render');
    threat.publisher ? delete threat.publisher : null;
    let threatInfo =
      _.chain(threat)
        .entries()
        .map((val, i) => (
          <tr key={i}>
            <td className="key">{val[0]}</td>
            <td>{val[1]}</td>
          </tr>
          )
        ).value();

    return (<tbody>{threatInfo}</tbody>);
  }

  static renderTab(feed, index) {
    let data =
      _.get(renderers,
            feed.threat.publisher,
            () => null)(feed);
    if (!data) return null;
    let common = FeedUtil.renderThreat(feed.threat);
    return (
      <Tab eventKey={index} title={data.header} key={index}>
        <table>
          <thead><tr><td><strong>Common</strong></td></tr></thead>
          {common}
          <thead><tr><td><strong>Specific</strong></td></tr></thead>
          {data.info}
          {data.object || null}
          {data.refs || null}
          {data.exposure || null}
        </table>
      </Tab>
      );
  }
}

export default FeedUtil;
