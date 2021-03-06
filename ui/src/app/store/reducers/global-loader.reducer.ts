import { GlobalLoaderState, initGlobalLoaderState } from 'src/app/store/state/global-loader.state';
import { GlobalLoaderActions, GlobalLoaderTypes } from 'src/app/store/actions/global-loader.action';

export function globalLoaderReducer(state = initGlobalLoaderState, action: GlobalLoaderActions): GlobalLoaderState {
  switch (action.type) {
    case GlobalLoaderTypes.StartLoading:
      return { loading: true };
    case GlobalLoaderTypes.StopLoading:
      return { loading: false };
    default:
      return state;
  }
}
