import axiosClient from './axiosClient'

const audioApi = {
    getNewMusic() {
        const url = '/chart/new-release'
        return axiosClient.get(url)
    },
    getAudio(songId) {
        const url = `/song/${songId}`
        return axiosClient.get(url)
    },
    getTop100() {
        const url = '/top100'
        return axiosClient.get(url)
    },
    getHomeData() {
        const url = '/home'
        return axiosClient.get(url)
    },
    getDetailPlayList(id) {
        const url = `/playlist/${id}`
        return axiosClient.get(url)
    },
    getCategoryData() {
        const url = '/category'
        return axiosClient.get(url)
    },
    getCategoryDetail(id) {
        const url = `/category/${id}`
        return axiosClient.get(url)
    },
    getDataChartPage() {
        const url = '/chart/home'
        return axiosClient.get(url)
    },
    getResultSearch(params) {
        return axiosClient.get('/search', { params: params } )
    }
}
export default audioApi
