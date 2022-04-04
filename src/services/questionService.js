import React from 'react';
import axios from 'axios';



  export const getQuestions = async ()=> {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    return response.data.results
  }


// export const getQuestionImage = async()=>{

//   const response = await axios.get("https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0&api_key=ac0c3ce0492f706919e3b916daabbb3fed01b262cf1e059189edb562db77117f")
//   return response.data
// }