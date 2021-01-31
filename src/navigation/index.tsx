
import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { COLORS } from '../screens/common/colors'
import { STYLES } from '../screens/common/styles'
import { OVERLAY_LOADING } from '../constants/redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SCREEN_HOME } from './screens'
import home from '../screens/home'

const RootStack = createStackNavigator()
const ModalStack = createStackNavigator()
const Tab = createBottomTabNavigator()

type Props = {
  navigation?: any
  route?: any
  isLoading: boolean
  setOverlayLoading: (boo: boolean) => void
}

const Navigation = (props: Props) => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' translucent />
      <RootStack.Navigator
        mode="modal"
        screenOptions={STACK_STYLE}
      >
        {modalScreen()}
      </RootStack.Navigator>
      {props.isLoading &&
        <View style={STYLES.loading}>
          <ActivityIndicator size='large' color={COLORS.PRIMARY_BLACK} />
        </View>
      }
    </NavigationContainer>
  )
}

const modalScreen = () => {
  return <>
    <RootStack.Screen name={SCREEN_HOME} component={home} options={{ title: 'Home' }} />
  </>
}

const STACK_STYLE = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderBottomColor: COLORS.PRIMARY_WHITE,
    shadowColor: COLORS.TRANSPARENT,
    shadowRadius: 0
  },
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
export default connector(Navigation)
