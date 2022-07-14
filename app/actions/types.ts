import { ActionType } from 'typesafe-actions';
import * as actions from './index';

export type Actions = ActionType<typeof actions>;