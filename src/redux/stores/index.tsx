import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import prom from 'redux-promise'
import reducers from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, prom)),
)

export default store
