import { 
    FETCH_TAGS,
    FETCH_PROMOTION,
    FETCH_DETAIL
} from '../actions/homeAction.js';

const INITIAL_STATE = {
    tags: [],
    promotions: [],
    detailedData:[]
}
const homeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TAGS:
            return {
                ...state,
               tags: action.payload
            }
        case FETCH_PROMOTION:
            return {
                ...state,
                promotions: action.payload
            }
        case FETCH_DETAIL:
            return {
                ...state,
                detailedData: action.payload
            }   
        default:
            return state;
    }
}
export default homeReducer