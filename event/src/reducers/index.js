import {combineReducers} from 'redux';

import threat from './threat';
import modal from './modal';

export default combineReducers({
  threat,
  modal
});
