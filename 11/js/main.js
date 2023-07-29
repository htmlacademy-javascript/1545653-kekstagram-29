// import {allPosts} from './data.js';
import { renderImages } from './gallery.js';

// renderImages(allPosts);

import {renderModalForm} from './form.js';
// renderModalForm();

import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';
import {showAlert} from './util.js';

getData().then((picturesArray)=>{
  renderImages(picturesArray);
  renderModalForm(picturesArray);
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
