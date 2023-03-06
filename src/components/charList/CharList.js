import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

  const [charList, setCharList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false), // запускается при клике на кнопку
        [offset, setOffset] = useState(210), // отступ комиксов (при первичной загрузки)
        [charEnded, setCharEnded] = useState(false); // конец персонажей

  const {loading, error, getAllCharacters} = useMarvelService();

  // запрос на сервер, когда компонент был создан (useeffect - запускатеся после рендера)
  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  },[]) // пустой массив позволит функции запуститься лишь один раз

  // запрос на сервер, при нажатии на кнопки 
  const onRequest = (offset, init) => {
    init ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
  }

  // рендеринг новоо списка с учетом старого + нового списка
  const onCharListLoaded = (newCharList) => {
    let ended = false; // запишем рез-тат переменной, как состояние
    if (newCharList.length < 9) {
      ended = true;
    }
      setCharList(charList => [...charList, ...newCharList]); // используем I-й аргумнта, тк важно пред значение
      setNewItemLoading(newItemLoading => false);
      setOffset(offset => offset + 9); // при зарузки нового списка отспут будет увеличиться на 9-ть пунктов комиксов
      setCharEnded(charEnded => ended);
  }
  
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  // Этот метод создан для оптимизации, 
  // чтобы не помещать такую конструкцию в метод render
  const renderItems = (arr) => {
      const items =  arr.map((item, i) => {
          let imgStyle = {'objectFit' : 'cover'};
          if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
              imgStyle = {'objectFit' : 'unset'};
          }
          
          return (
              <li 
                  className="char__item"
                  tabIndex={0}
                  ref={el => itemRefs.current[i] = el}
                  key={item.id}
                  onClick={() => {
                      props.onCharSelected(item.id);
                      focusOnItem(i);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                  }}>
                      <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                      <div className="char__name">{item.name}</div>
              </li>
          )
      });
      // А эта конструкция вынесена для центровки спиннера/ошибки
      return (
          <ul className="char__grid">
              {items}
          </ul>
      )
  }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading} // при нажатии на кнопку, переключаем ее в нерабочее положении
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
              <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;