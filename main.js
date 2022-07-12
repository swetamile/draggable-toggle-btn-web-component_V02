import ToggleDragTemplate from './js/template.js';

export default class ToggleDragModule extends HTMLElement {
  static elementName = 'toggle-drag';

  #leftButtonWidth = 0;
  #rightButtonWidth = 0;
  #leftButtonStartPixel = 0;
  #rightButtonStartPixel = 0;
  #leftDirection = 'left';
  #rightDirection = 'right';
  #defaultRightButtonLeft = '0px';
  #leftButton;
  #rightButton;
  #btn;
  strings = {
    timelinePlaybackLive: {
      playback: 'PLAYBACK',
      live: 'LIVE',
    },
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.addEventListener('destroy', this.destroy);
    this.addEventListener('render', this.render);
    this.status = 'created';
  }

  get direction() {
    return this.getAttribute('direction');
  }

  set direction(value) {
    if (value) {
      this.setAttribute('direction', value);
    } else {
      this.removeAttribute('direction');
    }
  }

  connectedCallback() {
    if (this.status !== 'destroyed') {
      this.status = 'connected';

      this.dispatchEvent(
        new CustomEvent('connected', {
          bubbles: true,
          composed: true,
          detail: { component: ToggleDragModule.elementName },
        })
      );

      this.addMutationsObserver();
      this.render();
    }
  }

  addMutationsObserver() {
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          this.shadowLoaded();
        }
      });
    });
    observer.observe(this.shadow, { childList: true });
  }

  shadowLoaded() {
    this.#leftButton = this.shadow.querySelector('.leftButton');
    this.#rightButton = this.shadow.querySelector('.rightButton');
    this.#btn = this.shadow.querySelector('.btn');

    this.#leftButton.addEventListener('click', this.onLeftClick);
    this.#rightButton.addEventListener('click', this.onRightClick);
    this.#leftButton.addEventListener('mousedown', this.onMouseDown);
    this.#rightButton.addEventListener('mousedown', this.onMouseDown);

    this.#leftButtonWidth = this.#leftButton.getBoundingClientRect().width;
    this.#rightButtonWidth = this.#rightButton.getBoundingClientRect().width;
    this.#leftButtonStartPixel = this.#leftButton.getBoundingClientRect().x;
    this.#rightButtonStartPixel = this.#rightButton.getBoundingClientRect().x;

    this.setDefaultValue();

    // console.error(
    //   this.#leftButtonWidth,
    //   this.#rightButtonWidth,
    //   this.#leftButtonStartPixel,
    //   this.#rightButtonStartPixel
    // );
  }

  onMouseDown = (event) => {
    // console.error(event.target);
    event.preventDefault();

    this.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseUp = (event) => {
    this.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (event) => {
    if (event.x <= this.#rightButtonStartPixel) {
      this.navigateToggleToLeft();
    } else {
      this.navigateToggleToRight();
    }
  };

  setDefaultValue = () => {
    if (this.direction === this.#leftDirection) {
      this.navigateToggleToLeft();
    } else if (this.direction === this.#rightDirection) {
      this.navigateToggleToRight();
    }
  };

  onLeftClick = (event) => {
    this.navigateToggleToLeft();
  };

  onRightClick = (event) => {
    this.navigateToggleToRight();
  };

  navigateToggleToLeft = () => {
    this.direction = this.#leftDirection;
    this.#btn.style.width = `${
      this.#rightButtonStartPixel - this.#leftButtonStartPixel
    }px`;
    this.#btn.style.left = this.#defaultRightButtonLeft;
  };

  navigateToggleToRight = () => {
    this.direction = this.#rightDirection;
    this.#btn.style.width = `${this.#rightButtonWidth}px`;
    this.#btn.style.left = `${this.#leftButtonWidth}px`;
  };

  render = () => {
    while (this.shadow.hasChildNodes()) {
      this.shadow.removeChild(this.shadow.firstChild);
    }

    const template = new ToggleDragTemplate(
      ToggleDragModule.elementName,
      this
    ).get();
    this.shadow.appendChild(template.content.cloneNode(true));
  };

  destroy = () => {
    this.status = 'destroyed';
    this.#leftButton.removeEventListener('click', this.onLeftClick);
    this.#rightButton.removeEventListener('click', this.onRightClick);
    this.#leftButton.removeEventListener('mousedown', this.onMouseDown);
    this.#rightButton.removeEventListener('mousedown', this.onMouseDown);
  };

  disconnectedCallback() {
    this.status = 'destroyed';
    this.dispatchEvent(
      new CustomEvent('disconnected', {
        bubbles: true,
        composed: true,
        detail: { component: ToggleDragModule.elementName },
      })
    );
    this.destroy && this.destroy();
  }
}

window.customElements.define(ToggleDragModule.elementName, ToggleDragModule);
