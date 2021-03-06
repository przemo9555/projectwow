import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalLoaderState } from 'src/app/store/state/global-loader.state';

const getGlobalLoaderFeatureState = createFeatureSelector<GlobalLoaderState>('globalLoader');

export const getGlobalLoaderLoading = createSelector(
  getGlobalLoaderFeatureState,
  state => state.loading
);
