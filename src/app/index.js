import _ from 'lodash';
import './styles.css';
// import Print from '../print/print';
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var br = document.createElement('br');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'Click me and check the console!';
  element.appendChild(br);
  element.appendChild(btn);
  // element.onclick = Print.bind(null, 'Hello webpack!');
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn.onclick = e => import(/* webpackChunkName: "print" */ '../print/print').then(module => {
    var print = module.default;

    print('Hello webpack!');
  });
  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

// if (module.hot) {
//   module.hot.accept('../print/print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element); 
//   })
// }