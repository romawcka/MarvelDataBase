import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
  );

  // function App() {
  //   const [count, setCount] = useState(0);
  //   const [flag, setFlag] = useState(false);
  
  //   function handleClick() {
  //     // До React 18 следующие вызовы не батчились
  //     // Установка состояния происходит «после» события в колбэке асинхронного вызова
  //     fetchSomething().then(() => {
  //       setCount(c => c + 1); // Спровоцирует ререндер
  //       setFlag(f => !f); // Спровоцирует ререндер
  //     });
  
  //     // В React 18
  //     fetchSomething().then(() => {
  //       setCount(c => c + 1); // Не вызывает ререндер
  //       setFlag(f => !f); // Не вызывает ререндер
  // // React будет вызывать ререндер только один раз, в конце
  //     })
  //   }
  //   return (
  //   <div>
  //     <button onClick={handleClick}>Next</button>
  //     <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
  //   </div>
  //          );
  // }