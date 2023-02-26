import img from './giphy.gif';


const ErrorMessage = () => {
  return (
    <img src={img} alt='Error Message' />
  )
}

export default ErrorMessage;

    // статичные файлы должны находится папке public, и вот как их использовать
    // <img src={process.env.PUBLIC_URL + '/giphy.gif'} />