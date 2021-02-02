import axios, { AxiosRequestConfig } from 'axios'
import { SCOPE } from '../config'
import { FULL_FIELD_SENSORS } from '../constants'
import { URL_GET_TOKEN } from '../constants/urls'
import { DeviceCreateInput, DeviceUpdateInput, GetSensorsType, SensorsType } from '../types'

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

export const getSensorsWithIoT = async (props: GetSensorsType): Promise<SensorsType[]> => {
  let search = '';
  if (props.name) {
    search = `(name: "${props.name}")`
  }
  if (props.serial) {
    search = `(serial: "${props.serial}")`
  }
  var data = JSON.stringify({
    query: `{ getSensorsWithIoT${search}{ ${props.fields} } }`,
    variables: {}
  });
  const config: AxiosRequestConfig = {
    method: 'post',
    data: data
  }
  let result = await axios(config)
  return result.data.data.getSensorsWithIoT
}

export const createDevice = async (item: DeviceCreateInput): Promise<boolean> => {
  // var data = JSON.stringify({
  //   query: `{ updateDevice${JSON.stringify(item)} }`,
  //   variables: {}
  // });
  // const config: AxiosRequestConfig = {
  //   method: 'post',
  //   data: data
  // }
  // let result = await axios(config)
  return true
}

export const updateDevice = async (item: DeviceUpdateInput): Promise<boolean> => {
  var data = JSON.stringify({
    query: `mutation {
        updateDevice(
            input:${parserQuery(item)}
        ){
            deviceId
        }
    }`,
    variables: {}
  });
  const config: AxiosRequestConfig = {
    method: 'post',
    data: data
  }
  console.log(data)
  let result = await axios(config)
  return true
}

const parserQuery = (obj: any) => {
  if (typeof obj === 'number') {
    return obj;
  }
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }
  let props: any = Object.keys(obj).map(key =>
    `${key}:${parserQuery(obj[key])}`
  ).join(',');
  return `{${props}}`;
}

export const deleteDevice = async (deviceId: number): Promise<boolean> => {
  // var data = JSON.stringify({
  //   query: `{ updateDevice${JSON.stringify(deviceId)} }`,
  //   variables: {}
  // });
  // const config: AxiosRequestConfig = {
  //   method: 'post',
  //   data: data
  // }
  // let result = await axios(config)
  return true
}


