import React from 'react';
import axios from 'axios';



  export const getQuestions = async ()=> {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    return response.data.results
  }


