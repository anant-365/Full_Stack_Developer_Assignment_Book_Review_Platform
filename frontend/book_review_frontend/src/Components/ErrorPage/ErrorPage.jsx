import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  const handleRedirectToRoot = () => {
    navigate('/'); // Navigates to the root URL
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-lg mb-6">Sorry, an unexpected error has occurred.</p>
        <p className="text-sm italic text-gray-400">
          <i>{error.statusText || error.message}</i><br/>
          <i className='text-red-500'>DO NOT RELOAD THIS PAGE MANUALLY</i>
        </p>
        <button
          onClick={handleRedirectToRoot}
          className="mt-8 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
