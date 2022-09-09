import Category from 'pages/Category'
import Chart from 'pages/Chart'
import DetailCategory from 'pages/DetailCategory'
import DetailPlaylist from 'pages/DetailPlaylist'
import Home from 'pages/Home/Home'
import NewMusic from 'pages/NewMusic'
import Radio from 'pages/Radio'
import SearchResult from 'pages/SearchResult'
import Top100 from 'pages/Top100'
import WeekChartDetail from 'pages/WeekChartDetail'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/chart',
        component: Chart
    },
    {
        path: '/radio',
        component: Radio
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/top100',
        component: Top100
    },
    {
        path: '/newmusic',
        component: NewMusic
    },
    {
        path: '/playlist/:name/:id',
        component: DetailPlaylist
    },
    {
        path: '/album/:name/:id',
        component: DetailPlaylist
    },
    {
        path: '/hub/:name/:id',
        component: DetailCategory
    },
    {
        path: '/search/:keyword',
        component: SearchResult
    },
    {
        path: '/:weekchart/:area/:id',
        component: WeekChartDetail
    }
    // {
    //     path: '/nghe-si/:name',
    //     component: Artist,
    // },
    // {
    //     path: '/:artist',
    //     component: Artist,
    // },
    // {

]
export default routes