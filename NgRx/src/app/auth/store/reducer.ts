import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import * as actions from "./auth.actions"
import { AuthState } from "./auth.state";

const initialState: AuthState = {
  user: null
}

export const authReducer = createReducer(
  initialState,
  on(actions.LoginSuccessfulAction, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(actions.LogoutAction, (state) => {
    return {
      ...state,
      user: null
    }
  }),
);
