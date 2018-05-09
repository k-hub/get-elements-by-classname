const { JSDOM } = require('jsdom');

function getElementsByClassName(element, className) {
  const elementsWithClassNameOfInterest = []
  let queue = [];

  if (element) {
    queue.push(element);

    // This will only occur once upon initialization of queue.
    if (element.className.toString().indexOf(className) !== -1) {
      elementsWithClassNameOfInterest.push(element);
    }

    while (queue.length) {
      let currentElement = queue[0];

      for (let index = 0; index < currentElement.children.length; index++) {
        let childElement = currentElement.children[index];

        if (childElement.className.toString().indexOf(className) !== -1) {
          elementsWithClassNameOfInterest.push(childElement);
        }

        queue.push(childElement);
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
