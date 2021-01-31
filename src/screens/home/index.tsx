import React, { useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getAccessToken } from '../../api'
import { AUTH, OVERLAY_LOADING } from '../../constants/redux'
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

  useEffect(() => {
    props.setOverlayLoading(true)
    const init = async () => {
      const data = await getAccessToken()
      props.auth(data)
      props.setOverlayLoading(false)
    }
    init()
  }, [])

  return (
    <SafeAreaView style={STYLES.container}>
      <TouchableOpacity onPress={() => {

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
  setOverlayLoading: (state: boolean) => dispatch({ type: OVERLAY_LOADING, params: state }),
  auth: (state: AuthType) => (dispatch({ type: AUTH, params: state })),
})

const connector = connect(mapState, mapDispatchToProps)
export default connector(Home)
