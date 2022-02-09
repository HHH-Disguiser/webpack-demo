// import _ from 'lodash';
// import './style.css';
// import printMe from './print.js'

// function component() {
//     const element = document.createElement('div');

//     const btn = document.createElement('button');

//     element.innerHTML = _.join(['hello', 'webpack~~~~'], '');

//     btn.innerHTML = 'click';

//     btn.onclick = printMe;

//     element.appendChild(btn);

//     element.classList.add('hello');

//     return element;
// }

// document.body.appendChild(component());


// 异步导入的版本
async function getComponent() {
    const element = document.createElement('div');
    const { default: _ } = await import('lodash');

    element.innerHTML = _.join(['Hello', 'webpack','aaaa'], ' ');

    return element;
}

getComponent().then((component) => {
    document.body.appendChild(component)
})