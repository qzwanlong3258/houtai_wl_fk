const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    userInfo: state =>state.user,
    routers: state => state.routers.router
}

export default getters