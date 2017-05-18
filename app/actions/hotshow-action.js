/**
 * @author ling
 * @email helloworld3q3q@gmail.com
 * @create date 2017-05-12 04:56:43
 * @modify date 2017-05-12 04:56:43
 * @desc [description]
*/
import { HOTSHOW_BANNER, HOTSHOW_LIST } from './types';
import { hotshowFetch } from '../middleware/index-api';


export const addBanner = (data) => {
	return {
		type: HOTSHOW_BANNER,
		data
	}
}


export const addList = (data) => {
	return {
		type: HOTSHOW_LIST,
		data
	}
}

export const initHotshow = () => {
  return hotshowFetch(addList);
}