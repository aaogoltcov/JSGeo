'use strict';

export default class Geo {
  constructor() {
    this.addContainer();
    this.geoStatus();
    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.querySelector('.geo-status').textContent = "";
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.showInputTextArea();
      }, (error) => {
          document.querySelector('.geo-status').textContent = "";
          this.fillCoordinates();
          console.log(error);
      });
    }
  }

  // events
  newCommentAddEventListener() {
    this.commentTextArea = document.querySelector('.geo-comment');
    document.querySelector('.geo-button').addEventListener('click', event => {
      event.preventDefault();
      if ( this.commentTextArea.value.length > 0 ) {
        this.addNewOneComment( this.commentTextArea.value, this.latitude, this.longitude )
      }
    })
  }

  coordinatesValidation( value ) {
    return /\[{0,1}\-{0,1}\d{1,3}\.\d{5}\,\s{0,1}\-{0,1}\d{1,3}\.\d{5}\]{0,1}/g.test( value );
  }

  manuallyCoordinatesAddEventListener() {
    document.querySelector('button.geo-manually-coordinates').addEventListener('click', event => {
      event.preventDefault();
      this.geoManuallyCoordinatesInput = document.querySelector('input.geo-manually-coordinates');
      if ( this.geoManuallyCoordinatesInput.value.length > 0 ) {
        if ( this.coordinatesValidation( this.geoManuallyCoordinatesInput.value ) ) {
          const coordinates = this.geoManuallyCoordinatesInput.value.match( /\-{0,1}\d{1,3}\.\d{5}/g );
          this.latitude = parseFloat( coordinates[0] );
          this.longitude = parseFloat( coordinates[1] );
          this.geoManuallyCoordinatesInput.value = "";
          document.querySelector('form.geo-manually-coordinates').classList.toggle('hidden');
          this.showInputTextArea();
        } else {
          this.geoManuallyCoordinatesInput.value = "";
          document.querySelector('small.geo-manually-coordinates').classList.toggle('hidden');
        }
      }
    })
  }

  // ui
  addContainer() {
    document.body.insertAdjacentHTML('beforeend',
      `
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-4 geo-container">
            </div>
          </div>
        </div>
      </div>
      `
    )
    this.geoContainer = document.querySelector('.geo-container');
  }

  geoStatus() {
    this.geoContainer.insertAdjacentHTML('beforeend',
      `
      <p class="geo-status">Please wait...</p>
      `)
  }

  showInputTextArea() {
    this.geoContainer.insertAdjacentHTML('beforeend',
      `
      <form>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Please make your comment</label>
          <textarea class="form-control geo-comment" id="exampleFormControlTextarea1" rows="3" required></textarea>
        </div>
        <button type="button" class="btn btn-primary mb-2 geo-button">Save</button>
      </form>`
    )
    this.newCommentAddEventListener();
  }

  addNewOneComment( message, latitude, longitude) {
    this.geoContainer.insertAdjacentHTML('beforeend',
      `
      <div class="second py-2 px-2"> <span class="text1">${ message }</span>
        <div class="d-flex justify-content-between py-1 pt-2">
           <a class="text2" href="https://www.openstreetmap.org/#map=18/${ latitude }/${ longitude }">Message geopostion</a>
        </div>
      </div>`
    )
    this.commentTextArea.value = "";
  }

  fillCoordinates() {
    this.geoContainer.insertAdjacentHTML('beforeend',
      `
      <form class="geo-manually-coordinates">
        <div class="form-group">
          <label for="inputCoordinates">Coordinates</label>
          <input type="text" class="form-control geo-manually-coordinates" id="inputCoordinates" aria-describedby="coordinatesHelp" placeholder="Please fill your coordinates like that: 51.50851, −0.12572" required>
          <small id="coordinatesHelp" class="form-text text-muted geo-manually-coordinates hidden">Your coordinates are wrong, pleas try again...</small>
        </div>
        <button type="button" class="btn btn-primary geo-manually-coordinates">Save</button>
      </form>
      `
    )
    this.manuallyCoordinatesAddEventListener();
  }
}
