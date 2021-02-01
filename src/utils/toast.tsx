import Toast from 'react-native-root-toast';

export const showToast = (message: string) => {
  Toast.show(message, {
    duration: 20000,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    textStyle: { textAlign: 'left' },
    delay: 0,
    hideOnPress: true,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });
  // setTimeout(function () {
  //   Toast.hide(toast);
  // }, 500);
}
