import { createStore, applyMiddleware, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

import { SagaStore } from 'types/store/saga';

function bindMiddleware(middleware: any[]) {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
}

function makeStore() {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, {}, bindMiddleware([sagaMiddleware]));

	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

	return store;
}

export const wrapper = createWrapper<SagaStore>(makeStore as any);
