import axios from 'axios';



// export const getQuestionImage = async ()=> {
//     console.log("&&&&&&")
//     try {
//     const response = await axios.get('https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0&api_key=ac0c3ce0492f706919e3b916daabbb3fed01b262cf1e059189edb562db77117f',
//         {
//             headers:{
//                         'Access-Control-Allow-Origin': '*', 
//                         'Access-Control-Allow-Headers':'X-Requested-With'
//             }
//         } )
//     console.log(response)
//     return response
// } catch(e){
//         console.log(e);
        
//     }

//     }    

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
      num:3,
      searchType:'image',
      key:API_KEY,
    }
  });
  return response;
}
          
export default google_search