import { AUTH } from "../../constants/redux"
import { Action, AuthType } from "../../types/redux"
import axios from 'axios'
import { X_API_KEY } from "../../config"
import { GRAPHQL_SERVER_URL } from "../../constants/urls"

const PREFIX_TOKEN = 'bearer '

const initialState = {
  accessToken: ''
}

interface ActionImpl extends Action {
  params: AuthType
}
const auth = (state: AuthType = initialState, action: ActionImpl) => {
  switch (action.type) {
    case AUTH:
      axios.defaults.baseURL = GRAPHQL_SERVER_URL
      axios.defaults.headers.common['X-Api-Key'] = X_API_KEY
      axios.defaults.headers.common['Authorization'] = PREFIX_TOKEN + action.params
      return action.params
    default:
      return state
  }
}

export default auth