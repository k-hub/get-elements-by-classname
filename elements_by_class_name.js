const { JSDOM } = require('jsdom');

function getElementsByClassName(element, className) {
  const elementsWithClassNameOfInterest = []
  let queue = [];

  if (element) {
    queue.push(element);

    while (queue.length) {
      let currentElement = queue[0];
      for (let index = 0; index < currentElement.children.length; index++) {
        let childElement = currentElement.children[index];
        queue.push(childElement);
      }

      let elementToDequeue = queue[0];
      if (elementToDequeue.className.toString().indexOf(className) !== -1) {
        elementsWithClassNameOfInterest.push(elementToDequeue);
      }

      queue = queue.slice(1);
    }
  }

  return elementsWithClassNameOfInterest;
}


JSDOM.fromURL("https://developer.mozilla.org/en-US/docs/Web/API/Element").then(dom => {
  const docEl = dom.window.document.documentElement;

  const className = 'center';

  const specElements = docEl.getElementsByClassName(className);
  console.log('Spec:', specElements);

  const actualElements = getElementsByClassName(docEl, className);
  console.log('Actual:', actualElements);

  if (actualElements.length === specElements.length) {
    console.log('SUCCESS');
  } else {
    console.error('NOT YET');
  }
}).catch(e => console.error('Caught: ', e));
