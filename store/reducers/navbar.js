const initialState = {
  showSideDrawer: false,
};

export default function navbar(state = initialState, action) {
  switch (action.type) {
    case 'CLOSE_SIDE_DRAWER':
      return {
        ...state,
        showSideDrawer: false,
      };
    case 'OPEN_SIDE_DRAWER':
      return {
        ...state,
        showSideDrawer: true,
      };
    default:
      return state;
  }
}
