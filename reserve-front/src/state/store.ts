import { createStore } from 'redux';

import rootReducer from './reducers';

const store = createStore(rootReducer);

export type RootReducerType = ReturnType<typeof rootReducer>

export default store;
