import _ from 'lodash';

const keys = {
  'CIDR': 'whois.cidr',
  'ASN Country Code': 'whois.asn-country-code'
};

export default (feed) => {
  let refs = _.chain(feed)
              .get('snort.refs')
    .map((ref, i) => {
      let url = ref.url.replace(/^https?:\/\//, '');
      url = `http://${url}`;
      return (<a key={i} target='_blank' href={url}>{ref.display || 'Ref'}</a>);
    })
              .value();
  let info =
    _.chain(keys)
      .map(keys, (key, title) => {
        let val = _.get(feed, key, null);
        if (!val) return null;
        return (
          <tr>
            <td className="key">{title}</td>
            <td>{val}</td>
          </tr>
        );
      }).filter(val => !_.isNull(val))
    .value();

  return {
    header: 'Emerging Threats',
    info: (<tbody>{info}</tbody>),
    refs: (<tr><td>Refs</td><td>{refs}</td></tr>)
  };
};
