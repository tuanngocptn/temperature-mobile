import axios, { AxiosRequestConfig } from 'axios'
import { SCOPE } from '../config'
import { URL_GET_TOKEN } from '../constants/urls'

export const getAccessToken = async () => {

  const header = {
    'grant_type': 'client_credentials',
    'scope': SCOPE
  }

  const config: AxiosRequestConfig = {
    method: 'post',
    headers: header,
    url: URL_GET_TOKEN
  }
  let result = await axios(config)
  return result.data.access_token
}