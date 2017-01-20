(function() {
  'use strict';

  const elmStatus = document.querySelector('#status');
  const elmStart = document.querySelector('#start');

  const UPDATE_INTERVAL = 1000; // Once a second
  const BEGIN_DELAY = 1000 * 3; // 3 seconds
  const PRECISION = 0; // Number of decimals
  const HOURS_GOOD = 11; // Good amount of hours sleep
  const HOURS_OK = 10; // OK amount of hours sleep

  let startTime;
  let iterationTimer;
  let beginTimer;

  const begin = () => {
    console.log('start');
    startTime = new Date;
    const hours = startTime.getHours();
    let minutes = `0${startTime.getMinutes()}`.substr(-2);
    elmStart.textContent = `${hours}:${minutes}`;
    document.body.classList.add('active');
    iterate();
  };

  const stop = () => {
    console.log('stop');
    clearTimeout(iterationTimer);
    startTime = null;
    elmStatus.textContent = 'Sömnig?';

    document.body.classList.remove('active');
    document.body.classList.remove('bad');
    document.body.classList.remove('ok');
    document.body.classList.remove('good');
  };

  const iterate = () => {
    const duration = (new Date) - startTime;
    const hours = (duration / 1000 / 60 / 60).toFixed(PRECISION);
    console.log(hours);
    elmStatus.textContent = hours;

    document.body.classList.toggle('bad', hours < HOURS_OK);
    document.body.classList.toggle('ok', hours >= HOURS_OK);
    document.body.classList.toggle('good', hours >= HOURS_GOOD);

    iterationTimer = setTimeout(iterate, UPDATE_INTERVAL);
  };

  const beginHandler = event => {
    event.preventDefault();
    beginTimer = setTimeout(() => {
      if (startTime) {
        stop();
      } else {
        begin();
      }
    }, BEGIN_DELAY);
  };
  const abortHandler = () => {
    clearTimeout(beginTimer);
  };

  document.body.addEventListener('touchstart', beginHandler);
  document.body.addEventListener('mousedown', beginHandler);
  document.body.addEventListener('touchend', abortHandler);
  document.body.addEventListener('mouseup', abortHandler);
}());
