import { User } from '../model/user.model';
import { createAction, props } from "@ngrx/store";

export const LoginSuccessfulAction = createAction("[AUTH MODULE] Login Successful", props<{user: User}>());
export const LogoutAction = createAction("[AUTH MODULE] Perform logout");
