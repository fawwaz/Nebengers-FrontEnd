import { 
  RIDES_RETRIEVED,
  RIDE_DETAIL_RETRIEVE,
  RIDE_REQUEST_SUCCESS,
  USERRIDE_REQUEST_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  content: [],
  ride_detail : null,
  message: '',
  userride_request : null
};

export default function (state = INITIAL_STATE, action) {  
  console.log(action.type);
  console.log(action.payload);
  switch(action.type) {
    case RIDES_RETRIEVED:
      return { ...state, content: action.payload.data };
    case RIDE_DETAIL_RETRIEVE:
      return { ...state, ride_detail: action.payload.data };
    case RIDE_REQUEST_SUCCESS:
      return { ...state, message: action.payload.data.message };
    case USERRIDE_REQUEST_SUCCESS:
      return { ...state, userride_request: action.payload.data };
    default:
      return {state};
  }

  return state;
}