import axios from 'axios';
import { isNil } from 'lodash';

export default async function axiosFetcher(url: string) {
  let options: Record<string, object> = {};

  if(!isNil(localStorage.getItem("token"))) {
    const token = localStorage.getItem("token");

    options = { headers: { authorization: `Bearer ${token}`}};
  }
  
  return await axios.get(`${import.meta.env.VITE_BACKEND_API}${url}`, options).then(res => res.data);
}
