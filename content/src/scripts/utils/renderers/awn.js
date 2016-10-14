import _ from 'lodash';

const keys = {
  'CIDR': 'whois.cidr',
  'ASN Country Code': 'whois.asn-country-code'
};

export default (feed) => {
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
    header: 'AWN',
    info: (<tbody>{info}</tbody>)
  };
};
