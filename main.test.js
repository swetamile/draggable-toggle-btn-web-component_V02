import ToggleButtonModule from './main.js';

let myBaseElement = new ToggleButtonModule();

document.body.appendChild(myBaseElement);

describe('Basic Element functionality', () => {
  test('Check if component status is connected', () => {
    expect(myBaseElement.status).toBe('connected');
  });

  test('Check component is a node of type Element', () => {
    expect(myBaseElement.nodeType).toBe(1);
  });

  test('Test tag name', () => {
    expect(myBaseElement.tagName).toBe(
      ToggleButtonModule.elementName.toUpperCase()
    );
  });

  test('Test outerHTML matches', () => {
    expect(myBaseElement.outerHTML).toBe(
      '<' +
        ToggleButtonModule.elementName +
        ' leftdirection="true"></' +
        ToggleButtonModule.elementName +
        '>'
    );
  });
});

describe('Element attributes', () => {
  test('Default leftDirection attribute', () => {
    myBaseElement.leftDirection = true;
    expect(myBaseElement.leftDirection).toBe(true);
  });

  test('Set leftDirection', () => {
    myBaseElement.leftDirection = true;
    expect(myBaseElement.leftDirection).toBe(true);
    myBaseElement.leftDirection = false;
    expect(myBaseElement.leftDirection).toBe(false);
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

  test('onMouseDown event', () => {
    myBaseElement.onMouseDown({ preventDefault: () => {} });
  });

  test('onMouseUp event', () => {
    myBaseElement.onMouseUp();
  });

  test('onMouseMove event', () => {
    const event = { x: 0 };
    myBaseElement.onMouseMove(event);
    event.x = 21;
    myBaseElement.onMouseMove(event);
  });

  test('onLeftClick event', () => {
    myBaseElement.onLeftClick();
  });

  test('onRightClick event', () => {
    myBaseElement.onRightClick();
  });
});

describe('Element attributes', () => {});

describe('Element functionality', () => {});
