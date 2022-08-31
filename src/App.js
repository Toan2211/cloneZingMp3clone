import { React } from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from 'routes'
import { Provider } from 'react-redux'
import store from 'redux/store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.component
                            {
                                /* console.log(route.component) */
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <MainLayout>
                                            <Page />
                                        </MainLayout>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App
