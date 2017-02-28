import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  

import authReducer from './auth_reducer';
import ridesReducer from './rides_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
  form: formReducer,
  rides: ridesReducer
});

export default rootReducer;