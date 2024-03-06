import * as olProj from 'ol/proj'
import { Control } from 'ol/control';

export default class MapControlRecenter extends Control {
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = 'Recenter';

    const element = document.createElement('div');
    element.className = 'recenter ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target
    });

    button.addEventListener('click', this.recenter.bind(this), false);
  }

    recenter() {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.getMap().getView().setCenter(olProj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
        this.getMap().getView().setZoom(15);
      });
    }

  }
