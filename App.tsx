import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import store from './src/redux/stores'
import axios from 'axios'
import { showToast } from './src/utils/toast'
import { LogBox } from 'react-native'
declare const global: { HermesInternal: null | {} }

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  axiosConfig()
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

const axiosConfig = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.interceptors.request.use(request => {
    // console.log((request.method?.toUpperCase() + ':'), request.url ? request.url : null)
    return request
  })
  axios.interceptors.response.use(response => {
    const _response = { ...response.data }
    delete _response.data
    delete _response.debug
    if (![200, 201].includes(_response.status)) {
      // showToast(`${_response.status}: ${_response.msg}`)
    }
    // console.log('RES:', JSON.stringify(_response, null, 2).replace(/\n|\r|\s/g, ''))
    return response
  }, error => {
    // showToast(formatErrorText(error))
    console.log(formatErrorText(error))
    return Promise.reject(error)
  })
}

const formatErrorText = (error: any) => {
  return (`
ERR: ${error.message}
 - Host: ${error.config.baseURL}
 - Uri: ${error.config.url}
`)
}

export default App
