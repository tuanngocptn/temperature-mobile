
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
import {SCREEN_DETAIL, SCREEN_HOME } from './screens'
import home from '../screens/home'
import detail from '../screens/detail'

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
      <ModalStack.Navigator
        screenOptions={STACK_STYLE}
      >
        {modalScreen()}
      </ModalStack.Navigator>
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
    <ModalStack.Screen name={SCREEN_HOME} component={home} options={{ title: 'List of sensors' }} />
    {/* @ts-ignore */}
    <ModalStack.Screen name={SCREEN_DETAIL} component={detail} options={({ route }) => ({ title: route?.params?.title })} />
  </>
}

const STACK_STYLE = {
  headerBackTitleVisible: false,
  headerTintColor: COLORS.PRIMARY_BLACK,
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
