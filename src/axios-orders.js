import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-71eba.firebaseio.com/'
});

export default instance;
