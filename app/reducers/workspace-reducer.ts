import { Constants } from '../actions';
import { Actions } from '../actions/types';

export default (state = [], action: Actions) => {
    switch (action.type) {
        case Constants.FILE_SELECTED:
            return {file: action.payload.file};
        default:
            return state;
    }
};