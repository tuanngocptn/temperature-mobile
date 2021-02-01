import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions, Modal, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { deleteDevice, getAccessToken, getSensorsWithIoT } from '../../api'
import { HOME_FIELD_SENSORS } from '../../constants'
import { AUTH, OVERLAY_LOADING } from '../../constants/redux'
import { SCREEN_DETAIL } from '../../navigation/screens'
import { GetSensorsType, SensorsType } from '../../types'
import { AuthType } from '../../types/redux'
import { STYLES } from '../common/styles'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

type Props = {
  navigation?: any
  route?: any
  isLoading: boolean
  setOverlayLoading: (boo: boolean) => void,
  auth: (state: AuthType) => void,
}

const Home = (props: Props) => {
  const [deleteDeviceId, setDeleteDeviceId] = useState<number>(0)
  const [data, setData] = useState<SensorsType[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await reloadData()
    setRefreshing(false)
  }, [])

  const reloadData = async () => {
    props.auth(await getAccessToken())
    const req: GetSensorsType = {
      deviceId: '',
      name: '',
      serial: '',
      fields: HOME_FIELD_SENSORS
    }
    setData(await getSensorsWithIoT(req))
  }

  useEffect(() => {
    props.setOverlayLoading(true)
    const init = async () => {
      props.auth(await getAccessToken())
      await reloadData()
      props.setOverlayLoading(false)
    }
    init()
  }, [])

  const doGoBack = async () => {
    props.setOverlayLoading(true)
    await reloadData()
    props.setOverlayLoading(false)
  }
  return (
    <>
      <SafeAreaView style={STYLES.supperContainer}>
        <View style={STYLES.container}>
          <View style={{ width: windowWidth - 40, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 20 }}>
            <TouchableOpacity style={STYLES.button}
              onPress={() => {
                props.navigation.navigate(SCREEN_DETAIL, { deviceId: '', title: 'Create sensor', doGoBack: () => { doGoBack() } })
              }}
            >
              <Text style={STYLES.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
            style={{ height: windowHeight - 200 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={STYLES.homePanelArea}>
              {data.map(
                (item, index) => <View key={index} style={index % 2 === 0 ? STYLES.panel50Left : STYLES.panel50Right}>
                  <View style={STYLES.panelContainer}>
                    <View style={STYLES.panelTop}>
                      <Text>{item.name}</Text>
                      <TouchableOpacity style={STYLES.closeIcon}
                        onPress={() => {
                          setDeleteDeviceId(item.deviceId)
                          setModalVisible(true)
                        }}
                      >
                        <Text>x</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate(SCREEN_DETAIL, { deviceId: item.deviceId, title: 'Sensor detail', doGoBack: () => { doGoBack() } })
                      }}
                    >
                      <View style={STYLES.panelRow}>
                        <Text style={STYLES.panelHeader}>Device ID:</Text>
                        <Text>{item.deviceId}</Text>
                      </View>
                      <View style={STYLES.panelRow}>
                        <Text style={STYLES.panelHeader}>Region:</Text>
                        <Text>{item.region}</Text>
                      </View>
                      <View style={STYLES.panelRow}>
                        <Text style={STYLES.panelHeader}>Serial:</Text>
                        <Text>{item.serial}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        }}
      >
        <TouchableOpacity style={STYLES.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={[STYLES.panelContainer, { padding: 20 }]}>
            <Text style={STYLES.panelHeader}>Are you sure remove</Text>
            <View style={STYLES.modalBody}>
              <TouchableOpacity
                style={STYLES.button}
                onPress={async () => {
                  setModalVisible(!modalVisible)
                  props.setOverlayLoading(true)
                  await deleteDevice(deleteDeviceId)
                  await reloadData()
                  props.setOverlayLoading(false)
                }}
              >
                <Text style={STYLES.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLES.button}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={STYLES.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
