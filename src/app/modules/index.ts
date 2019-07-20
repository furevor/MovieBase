import { AuthModule } from './auth/auth.module';
import { MoviesBaseModuleLazy } from './movies-base/movies-base.module';

export const APP_MODULES = [AuthModule];

export const APP_MODULES_LAZY = [MoviesBaseModuleLazy];
