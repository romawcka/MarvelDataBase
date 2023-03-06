import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404')),
      MainPage = lazy(() => import('../pages/MainPage')),
      ComicsPage = lazy(() => import('../pages/ComicsPage')),
      SinglePage = lazy(() => import('../pages/SinglePage')),
      SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout')),
      SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));


const App = () => {
  return (
  <Router>
    <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics/*" element={<ComicsPage/>}/>
            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
          </Suspense>
        </main>
    </div>
  </Router>
  )
}

export default App;