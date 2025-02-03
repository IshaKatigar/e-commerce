import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store/configureStore";

// manage the redux store value
const useRedux = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, appSelector };
};

export default useRedux;
