// notificationApi.js
import axios from 'axios';
import { notifyFunctions }  from '../Store/Store';

export const callForNotificationApi = async (serial, token, dispatch) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  if (serial && token) {
    try {
      const response = await axios({
        url: `/getNewNotificationNumber/${serial}`,
        method: 'get',
      });

      if (response.data.message === 'success') {
        dispatch(notifyFunctions.setNewNotif(response.data.notificationTotal));
      }
    } catch (err) {
      throw err;
    }
  }
};
