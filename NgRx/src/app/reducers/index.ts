import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AuthActions } from '../auth/store';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];


function hydrationMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    if (action.type === INIT) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
