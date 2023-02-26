import { Route, Routes} from "react-router-dom";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
  return (
    <>
      <AppBanner/>
      <Routes>
        <Route path="/" element={<ComicsList/>}/>
      </Routes>
    </>
  )
}

export default ComicsPage;