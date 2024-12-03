import { User } from '../model/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';

export * as AuthActions from "./auth.actions";
export * from "./auth.state"
import * as state from './reducer';


export const authFeature = createFeature({
  name: "auth",
  reducer: state.authReducer,
  extraSelectors: ({ selectUser }) => ({
    selectUserIsLoggedOut: createSelector(selectUser, x => !x),
    selectUserIsLoggedIn: createSelector(selectUser, x => !!x)
  })
});
