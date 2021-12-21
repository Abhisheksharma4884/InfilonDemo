import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import mySaga from './sagas/saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

export default store;