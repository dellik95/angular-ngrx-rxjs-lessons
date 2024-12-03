import { InjectionToken } from "@angular/core";
import { IConfiguration } from "./configuration.interface";
import { environment } from './environment';

export const CONFIG_TOKEN = new InjectionToken<IConfiguration>("CONFIG_TOKEN", {
  factory: () => environment,
  providedIn: "root"
});
