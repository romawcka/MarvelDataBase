import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner'

import './singleComicPage.scss';

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams(),
        [data, setData] = useState(null),
        {loading, error, getComic, clearError, getCharacter} = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic':
        getComic(id).then(onDataLoaded);
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded);
    }
  }

  // загрузка удалась
  const onDataLoaded = (data) => {
    setData(data);
  }

  const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !data) ? <Component comic={data}/> : null;
  return (
      <>
        <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
      </>
  )
}

export default SinglePage;