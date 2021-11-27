import axios from 'axios';

const getWeather = () => {

};

const createEffect = () => {
  // console.log("here createEffect = ", num)
  const effect = document.createElement('i');
  let container = document.querySelector('.headerContainer')
  effect.classList.add('fas');
  effect.classList.add('fa-snowflake');
  effect.style.left = Math.random() * window.innerWidth + 'px';
  effect.style.animationDirection = Math.random()*3+2+'s';
  effect.style.fontSize=Math.random()+"rem";
  effect.style.opacity=Math.random();
  container.prepend(effect)
  setTimeout( () => { effect.remove() }, 5000 );

}


export {
  getWeather, 
  createEffect,
}