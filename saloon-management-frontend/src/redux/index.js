import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (_) => _
    )
)

sagaMiddleware.run(rootSaga)

export default store
