import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner'

import './singleComicPage.scss';

const SingleComicPage = () => {
  const {comicId} = useParams(),
        [comic, setComic] = useState(null),
        {loading, error, getComic, clearError} = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId])

  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded)
  }

  // загрузка удалась
  const onComicLoaded = (comics) => {
    setComic(comics);
  }

  const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !comic) ? <View comic={comic}/> : null;
  return (
      <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
      </>
  )
}

const View = ({comics}) => {
  const {title, description, pageCount, thumbnail, language, price}  = comics;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img"/>
      <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">{pageCount}</p>
          <p className="single-comic__descr">Language: {language}</p>
          <div className="single-comic__price">{price}</div>
      </div>
      <Link to={"/comics"} className="single-comic__back">Back to all</Link>
      </div>
    )
}

export default SingleComicPage;