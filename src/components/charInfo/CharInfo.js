import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo = (props) => {

  const [char, setChar] = useState(null),
        {loading, error, getCharacter} = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId])

  const updateChar = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }
    getCharacter(charId)
      .then(onCharLoaded)
  }

  // загрузка удалась
  const onCharLoaded = (char) => {
    setChar(char);
  }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    // 1. если есть ошибка - выведется ошибка(компонент) или просто null(ничего) в противном случае
    const errorMessage = error ? <ErrorMessage/> : null;
    // 2. если идет загрузка - выводим спиннер(компонент) или просто null(ничего) в противном случае
    const spinner = loading ? <Spinner/> : null;
    // 3. и если у нас все нормально (например нет загрузки или нет ошибки) - выводим контент(компонент) или просто null(ничего)
    const content = !(error || loading || !char) ? <View char={char}/> : null;
    // null - ничего не рендерится

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;

  let imgStyle = {'objectFit' : 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {'objectFit' : 'contain'};
  }
  
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    <div className="char__descr">{description}</div>
    <div className="char__comics">Comics:</div>
    <ul className="char__comics-list">
      {comics.lenght > 0 ? comics : 'There are no comics here'}
      {
         comics.map((item, i) => {
          let comicsFromCharInfo = item.resourceURI.replace(/\D/g, '').slice(1);
          // eslint-disable-next-line
          if (i > 9) return;
          return (
              <li className="char__comics-item" key={i}>
          <Link to = {`/comics/${comicsFromCharInfo}`}>
                  {item.name}
           </Link>
          </li>
         )
      })
      }
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;


