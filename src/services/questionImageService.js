import axios from 'axios';

const API_KEY = 'AIzaSyDidwteBwMsDZqCEbmukDy9L-F9BdTL5jg';
const SEARCH_ENGIN_ID = 'd9b9403051b4b1dad';
const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';

async function google_search(searchTerm){
  const response = await axios({
    method:'GET',
    url:GOOGLE_API_URL,
    params:{
      q:searchTerm,
      cx: SEARCH_ENGIN_ID,
      num:2,
      searchType:'image',
      key:API_KEY,
    }
  });
  return response;
}
          
export default google_search