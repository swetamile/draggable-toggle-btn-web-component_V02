import ToggleDragModule from './main.js';

// Create instance of the element
let myBaseElement = new ToggleDragModule();

// Append to body (to run connectedCallback)
document.body.appendChild(myBaseElement);

/**
 *  Tests
 */
describe('Basic Element functionality', () => {
  test('Check if component status is connected', () => {
    expect(myBaseElement.status).toBe('connected');
  });

  test('Check component is a node of type Element', () => {
    expect(myBaseElement.nodeType).toBe(1);
  });

  test('Test tag name', () => {
    expect(myBaseElement.tagName).toBe(
      ToggleDragModule.elementName.toUpperCase()
    );
  });

  test('Test outerHTML matches', () => {
    expect(myBaseElement.outerHTML).toBe(
      '<' +
        ToggleDragModule.elementName +
        '></' +
        ToggleDragModule.elementName +
        '>'
    );
  });
});

describe('Element events', () => {
  test('disconnected event', () => {
    const handler = jest.fn();
    myBaseElement.addEventListener('disconnected', handler);
    document.body.removeChild(myBaseElement);
    expect(handler).toBeCalledTimes(1);
    myBaseElement.removeEventListener('disconnected', handler);
  });

  test('connected event', () => {
    myBaseElement.status = 'created';
    const handler = jest.fn();
    myBaseElement.addEventListener('connected', handler);
    document.body.appendChild(myBaseElement);
    expect(handler).toBeCalledTimes(1);
    myBaseElement.removeEventListener('connected', handler);
  });
});

describe('Element attributes', () => {
  test('Set direction attribute', () => {
    myBaseElement.direction = 'left';
    expect(myBaseElement.getAttribute('direction')).toBe('left');
    myBaseElement.removeAttribute('direction');

    myBaseElement.direction = '';
    expect(myBaseElement.getAttribute('direction')).toBe(null);
  });
});

describe('Element attributes', () => {});

describe('Element functionality', () => {});
