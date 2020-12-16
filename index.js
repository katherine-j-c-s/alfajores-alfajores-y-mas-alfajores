(async function (){
  console.log('%c running!','color:yellow');

  const BASE_URL = 'http://localhost:3000'

  const ALFAJORES_ENDPOINT = '/alfajores';

  const CATEGORIES_ENDPOINT = '/categories';

  const getAllAlfajores = async () => {
    const response = await axios.get(`${BASE_URL}${ALFAJORES_ENDPOINT}`);
    return response.data;
  }

  const getAllCategories = async () => {
    const response = await axios.get(`${BASE_URL}${CATEGORIES_ENDPOINT}`);
    return response.data;
  }


  const alfajores = await getAllAlfajores();

  const categories = await getAllCategories();
  

  console.log('alfajores', alfajores);

  console.log('categories', categories);

}());