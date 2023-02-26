import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

  const [char, setChar] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
    // const timerId = setInterval(updateChar, 5000);
    // return () => {
    //   clearInterval(timerId);
    // }
  }, [])

  const onCharLoaded = (char) => {
    setChar(char);
  }
  
  // отдельный метод, получающий данные с сервера, запсывающий в состояние:
  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
        .then(onCharLoaded);
  }

    // для того, чтобы разместить большие условные выражения, лучше поместить их в перменные:
    // 1. если есть ошибка - выведется ошибка(компонент) или просто null(ничего) в противном случае
    const errorMessage = error ? <ErrorMessage/> : null;
    // 2. если идет загрузка - выводим спиннер(компонент) или просто null(ничего) в противном случае
    const spinner = loading ? <Spinner/> : null;
    // 3. и если у нас все нормально (например нет загрузки или нет ошибки) - выводим контент(компонент) или просто null(ничего)
    const content = !(error || loading || !char) ? <View char={char}/> : null;
    // null - ничего не рендерится

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
          <p className="randomchar__title">
              Random character for today!<br/>
              Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
              Or choose another one
          </p>
          <button onClick={updateChar} className="button button__main">
              <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}
// делим код на части (логику и обычную верстку)
// данная перменная будет динамиески поставляться, в противовес спиннеру 
// это простой рендареий компонент
const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki} = char;
  let imgStyle = {'objectFit' : 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {'objectFit' : 'contain'};
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/> 
      <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">
              {description}
          </p>
          <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                  <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                  <div className="inner">Wiki</div>
              </a>
          </div>
      </div>
  </div>
  );
}

export default RandomChar;