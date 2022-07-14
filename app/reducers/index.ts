import { combineReducers } from 'redux';
import workspaceReducer from './workspace-reducer';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    workspace: workspaceReducer,
    routing: routerReducer
});