import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from './colors'

const windowWidth = Dimensions.get('window').width;

export const STYLES = StyleSheet.create({
  supperContainer: {
    flex: 1,
    // backgroundColor: COLORS.PRIMARY_WHITE,
  },
  container: {
    // flexDirection: 'column',
    paddingHorizontal: 20,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TRANSPARENT_WHITE
  },
  panelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  panelHeader: {
    fontWeight: 'bold'
  },
  panelContainer: {
    backgroundColor: COLORS.PRIMARY_WHITE,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 5
  },
  homePanelArea: {
    paddingVertical: 15,
    flexDirection: 'row'
  },
  panel50Left: {
    width: windowWidth / 2 - 20,
    paddingRight: 5
  },
  panel50Right: {
    width: windowWidth / 2 - 20,
    paddingLeft: 5
  },
  panelTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1
  },
  closeIcon: {
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: COLORS.PRIMARY_WHITE
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: COLORS.TRANSPARENT_WHITE
  },
  modalBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10
  }
})
