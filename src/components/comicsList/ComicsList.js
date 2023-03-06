import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
  
  const [comicsList, setcomicsList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(0), // отступ 
        [comicsEnded, setComicsEnded] = useState(false); // конец списка комиксов

  const {loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true)
    // eslint-disable-next-line
  }, [])

  const onRequest = (offset, init) => {
    init ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    } 
    setcomicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {items}
        </ul>
    )
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
              disabled={newItemLoading}
              style={{'display' : comicsEnded ? 'none' : 'block'}}
              className="button button__main button__long"
              onClick={() => onRequest(offset)}>
              <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;