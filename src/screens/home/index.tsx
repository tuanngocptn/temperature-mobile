import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getAccessToken, getSensorsWithIoT } from '../../api'
import { HOME_FIELD_SENSORS } from '../../constants'
import { AUTH, OVERLAY_LOADING } from '../../constants/redux'
import { GetSensorsType, SensorsType } from '../../types'
import { AuthType } from '../../types/redux'
import { STYLES } from '../common/styles'

type Props = {
  navigation?: any
  route?: any
  isLoading: boolean
  setOverlayLoading: (boo: boolean) => void,
  auth: (state: AuthType) => void,
}

const Home = (props: Props) => {
  const [data, setData] = useState<SensorsType[]>([]);
  useEffect(() => {
    props.setOverlayLoading(true)
    const init = async () => {
      props.auth(await getAccessToken())
      const sensorsType: GetSensorsType = {
        name: '',
        serial: '',
        fields: HOME_FIELD_SENSORS
      }
      setData(await getSensorsWithIoT(sensorsType))
      props.setOverlayLoading(false)
    }
    init()
  }, [])
  return (
    <SafeAreaView style={STYLES.supperContainer}>
      <View style={STYLES.container}>
        <View style={STYLES.homePanelArea}>
          {data.map(
            (item, index) => <View key={index} style={index % 2 === 0 ? STYLES.panel50Left : STYLES.panel50Right}>
              <View style={STYLES.panelContainer}>
                <View style={STYLES.panelRow}>
                  <Text style={STYLES.panelHeader}>Device ID:</Text>
                  <Text>{item.deviceId}</Text>
                </View>
                <View style={STYLES.panelRow}>
                  <Text style={STYLES.panelHeader}>Name:</Text>
                  <Text>{item.name}</Text>
                </View>
                <View style={STYLES.panelRow}>
                  <Text style={STYLES.panelHeader}>Region:</Text>
                  <Text>{item.region}</Text>
                </View>
                <View style={STYLES.panelRow}>
                  <Text style={STYLES.panelHeader}>Serial:</Text>
                  <Text>{item.serial}</Text>
                </View>
              </View>
            </View>)}
        </View>
      </View>
    </SafeAreaView>
  )
}

interface State {
  isLoading: boolean
}

const mapState = (state: State) => ({
  isLoading: state.isLoading,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOverlayLoading: (state: boolean) => dispatch({ type: OVERLAY_LOADING, params: state }),
  auth: (state: AuthType) => (dispatch({ type: AUTH, params: state })),
})

const connector = connect(mapState, mapDispatchToProps)
export default connector(Home)
