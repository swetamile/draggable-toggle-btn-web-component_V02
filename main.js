import ToggleButtonTemplate from './js/template.js';

export default class ToggleButtonModule extends HTMLElement {
  static elementName = 'toggle-button';

  #leftButtonWidth = 0;
  #rightButtonWidth = 0;
  #leftButtonStartPixel = 0;
  #rightButtonStartPixel = 0;
  #leftButton;
  #rightButton;
  #btn;
  defaultRightButtonLeft = '0px';
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

  get leftDirection() {
    if (this.hasAttribute('leftDirection')) {
      return this.getAttribute('leftDirection') === 'true';
    }
    return true;
  }

  set leftDirection(value) {
    this.setAttribute('leftDirection', value);
  }

  connectedCallback() {
    if (this.status !== 'destroyed') {
      this.status = 'connected';

      this.dispatchEvent(
        new CustomEvent('connected', {
          bubbles: true,
          composed: true,
          detail: { component: ToggleButtonModule.elementName },
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
  }

  onMouseDown = (event) => {
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
    if (this.leftDirection) {
      this.navigateToggleToLeft();
    } else {
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
    this.leftDirection = true;
    this.#btn.style.width = `${
      this.#rightButtonStartPixel - this.#leftButtonStartPixel
    }px`;
    this.#btn.style.left = this.defaultRightButtonLeft;
  };

  navigateToggleToRight = () => {
    this.leftDirection = false;
    this.#btn.style.width = `${this.#rightButtonWidth}px`;
    this.#btn.style.left = `${this.#leftButtonWidth}px`;
  };

  render = () => {
    while (this.shadow.hasChildNodes()) {
      this.shadow.removeChild(this.shadow.firstChild);
    }

    const template = new ToggleButtonTemplate(
      ToggleButtonModule.elementName,
      this
    ).get();
    this.shadow.appendChild(template.content.cloneNode(true));
  };

  destroy = () => {
    this.status = 'destroyed';
    if (this.#leftButton) {
      this.#leftButton.removeEventListener('click', this.onLeftClick);
      this.#leftButton.removeEventListener('mousedown', this.onMouseDown);
    }
    if (this.#rightButton) {
      this.#rightButton.removeEventListener('click', this.onRightClick);
      this.#rightButton.removeEventListener('mousedown', this.onMouseDown);
    }

    this.#leftButton = null;
    this.#rightButton = null;
    this.#btn = null;
  };

  disconnectedCallback() {
    this.status = 'destroyed';
    this.dispatchEvent(
      new CustomEvent('disconnected', {
        bubbles: true,
        composed: true,
        detail: { component: ToggleButtonModule.elementName },
      })
    );
    this.destroy && this.destroy();
  }
}

window.customElements.define(
  ToggleButtonModule.elementName,
  ToggleButtonModule
);
