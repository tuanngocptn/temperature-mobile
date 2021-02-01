import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, Text, View } from 'react-native'
import { Switch, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Value } from 'react-native-reanimated'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getSensorsWithIoT } from '../../api'
import { FULL_FIELD_SENSORS } from '../../constants'
import { OVERLAY_LOADING } from '../../constants/redux'
import { GetSensorsType, SensorsType } from '../../types'
import { COLORS } from '../common/colors'
import { STYLES } from '../common/styles'

const windowWidth = Dimensions.get('window').width;

type Props = {
  navigation?: any
  route?: any
  isLoading: boolean
  setOverlayLoading: (boo: boolean) => void
}

const Detail = (props: Props) => {
  const [data, setData] = useState<SensorsType>()
  useEffect(() => {
    props.setOverlayLoading(true)
    const init = async () => {
      if (!props.route.params.deviceId) {
        props.setOverlayLoading(false)
        return
      }
      const req: GetSensorsType = {
        deviceId: props.route.params.deviceId,
        name: '',
        serial: '',
        fields: FULL_FIELD_SENSORS
      }
      const _data = await getSensorsWithIoT(req)
      if (_data.length > 0) {
        setData(_data[0])
      }
      props.setOverlayLoading(false)
    }
    init()
  }, [])
  return (
    <SafeAreaView style={STYLES.container}>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: windowWidth / 2 - 25, marginRight: 5 }}>
          <Text style={STYLES.detailText}>Device ID:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput editable={false} style={STYLES.textInput} value={data?.deviceId?.toString()} />
          </View>
        </View>
        <View style={{ width: windowWidth / 2 - 25, marginLeft: 5 }}>
          <Text style={STYLES.detailText}>Serial:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput style={STYLES.textInput} value={data?.serial}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, serial: value })
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={STYLES.detailText}>Region:</Text>
        <View style={STYLES.textInputContainer}>
          <TextInput style={STYLES.textInput} value={data?.region}
            onChangeText={value => {
              //@ts-ignore
              setData({ ...data, region: value })
            }} />
        </View>
      </View>
      <View>
        <Text style={STYLES.detailText}>Device name:</Text>
        <View style={STYLES.textInputContainer}>
          <TextInput style={STYLES.textInput} value={data?.name}
            onChangeText={value => {
              //@ts-ignore
              setData({ ...data, name: value })
            }} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: windowWidth / 2 - 25, marginRight: 5 }}>
          <Text style={STYLES.detailText}>Latitude:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.latitude?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, latitude: parseFloat(value) })
              }} />
          </View>
        </View>
        <View style={{ width: windowWidth / 2 - 25, marginLeft: 5 }}>
          <Text style={STYLES.detailText}>Longitude:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.longitude?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, longitude: parseFloat(value) })
              }} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: windowWidth / 3 - 25, marginRight: 5 }}>
          <Text style={STYLES.detailText}>X:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.x?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, x: parseFloat(value) })
              }} />
          </View>
        </View>
        <View style={{ width: windowWidth / 3 - 10, marginHorizontal: 5 }}>
          <Text style={STYLES.detailText}>Y:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.y?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, y: parseFloat(value) })
              }} />
          </View>
        </View>
        <View style={{ width: windowWidth / 3 - 25, marginLeft: 5 }}>
          <Text style={STYLES.detailText}>Z:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.z?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, z: parseFloat(value) })
              }} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: windowWidth / 3 - 25, marginRight: 5 }}>
          <Text style={STYLES.detailText}>Distance:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.distance?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, distance: parseFloat(value) })
              }} />
          </View>
        </View>
        <View style={{ width: windowWidth / 3 - 10, marginHorizontal: 5 }}>
          <Text style={STYLES.detailText}>Floor:</Text>
          <View style={STYLES.textInputContainer}>
            <TextInput keyboardType='decimal-pad' style={STYLES.textInput} value={data?.floor?.toString()}
              onChangeText={value => {
                //@ts-ignore
                setData({ ...data, floor: parseFloat(value) })
              }} />
          </View>
        </View>
        <View style={{ width: windowWidth / 3 - 25, marginLeft: 5 }}>
          <Text style={STYLES.detailText}>Active:</Text>
          <View style={{ paddingLeft: 25 }}>
            <Switch
              trackColor={{ false: COLORS.SECONDARY_BLACK, true: COLORS.SECONDARY_BLACK }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor={COLORS.SECONDARY_BLACK}
              //@ts-ignore
              onValueChange={value => setData({ ...data, active: value })}
              value={data?.active?.toString() === 'true'}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-around' }}>
        {props?.route?.params?.deviceId ? <>
          <TouchableOpacity style={STYLES.button}
            onPress={() => {
              props.navigation.goBack()
            }}
          >
            <Text style={STYLES.buttonText}>BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={STYLES.button}>
            <Text style={STYLES.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </> : <>
            <TouchableOpacity style={STYLES.button}>
              <Text style={STYLES.buttonText}>CREATE</Text>
            </TouchableOpacity>
          </>}
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
  setOverlayLoading: (state: boolean) =>
    dispatch({ type: OVERLAY_LOADING, params: state }),
})

const connector = connect(mapState, mapDispatchToProps)
export default connector(Detail)
