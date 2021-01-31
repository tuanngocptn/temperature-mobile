import { AUTH } from "../../constants/redux"
import { Action, AuthType } from "../../types/redux"
import axios from 'axios'
import { X_API_KEY } from "../../config"

const initialState = {
  accessToken: ''
}

interface ActionImpl extends Action {
  params: AuthType
}
const auth = (state: AuthType = initialState, action: ActionImpl) => {
  switch (action.type) {
    case AUTH:
      axios.defaults.headers.common['X-Api-Key'] = X_API_KEY;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.params;
      return action.params
    default:
      return state
  }
}

export default auth