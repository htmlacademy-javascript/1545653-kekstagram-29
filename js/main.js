import { renderImages } from './gallery.js';
import {renderModalForm} from './form.js';
import {getData} from './api.js';
import {setUserFormSubmit, addFileChooserListener} from './form.js';
import {showAlert} from './util.js';
import {showFilters} from './sort.js';


getData().then((picturesArray)=>{
  renderImages(picturesArray);
  showFilters(picturesArray);
  renderModalForm(picturesArray);
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
addFileChooserListener();

