export type GetSensorsType = {
  name: string,
  serial: string,
  deviceId: string,
  fields: string
}

export type SensorsType = {
  deviceId: number,
  name: string,
  serial: string,
  // mac: null,
  region: string,
  longitude: number,
  latitude: number,
  floor: number,
  distance: number,
  remark: string,
  optional: string,
  active: true,
  date: string,
  // live: null,
  // battery: null,
  // humidity: null,
  // temperature: null,
  // height: null,
  // maxHeight: null,
  x: number,
  y: number,
  z: number,
  // tags: null,
  // deploymentDate: null,
  // compositionData: null,
  // unicastAddr: null,
  // meshStatus: null,
  // status: null,
  // error: null,
  // lockStatus: null,
  // network: null,
  // frequency: null,
  // server: null
}

export type DeviceCreateInput = {
  application: number,
  name: string,
  model: number,
  serial: string,
  mac: string,
  region: string,
  longitude: number,
  latitude: number,
  floor: number,
  distance: number,
  remark: string,
  optional: String,
  active: Boolean
  x: number,
  y: number,
  z: number,
  tags: string[]
}

export type DeviceUpdateInput = {
  deviceId: number,
  application: number,
  name: string,
  model: number,
  serial: string,
  mac: string,
  region: string,
  longitude: number,
  latitude: number,
  floor: number,
  distance: number,
  remark: string,
  optional: String,
  active: Boolean
  x: number,
  y: number,
  z: number,
  tags: string[]
}