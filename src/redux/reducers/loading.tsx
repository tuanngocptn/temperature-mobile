import { OVERLAY_LOADING } from '../../types/redux'

export default function (state = false, action: any) {
  switch (action.type) {
    case OVERLAY_LOADING:
      return action.params
    default:
      return state
  }
}
