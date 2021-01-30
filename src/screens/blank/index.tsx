import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { OVERLAY_LOADING } from '../../types/redux'
import { STYLES } from '../common/styles'

type Props = {
  navigation?: any
  route?: any
  isLoading: boolean
  setOverlayLoading: (boo: boolean) => void
}

const Blank = (props: Props) => {
  console.log(props.isLoading)
  return (
    <SafeAreaView style={STYLES.container}>
      <TouchableOpacity onPress={()=>{
        props.setOverlayLoading(true)
      }}>
        <Text>touch</Text>
      </TouchableOpacity>
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
export default connector(Blank)
