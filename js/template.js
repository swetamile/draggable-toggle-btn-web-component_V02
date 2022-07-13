export default class ToggleButtonTemplateController {
  constructor(name, element) {
    this.template = document.createElement('template');
    this.template.innerHTML = `
        <style>
            .shadowWrapper{
                 width: fit-content;
                 height: 16px;
            }

            .button-box {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 100px;
                background: var(--toggle-drag-neutral-background-color-container, hsla(197, 14%, 22%, 1));
            }
            
            .toggle-btn {
                background: transparent;
                color: var(--toggle-drag-neutral-gray-a06-text, hsla(0, 0%, 75%, 1));
                text-align: center;
                cursor: pointer;
                padding: 4px 12px;
                font-family: 'Open Sans';
                font-weight: 600;
                font-size: 12px;
                line-height: 16px;
                z-index: 1;
            }

            .btn {
                position: absolute;
                top: 0;
                height: 100%;
                background: var(--toggle-drag-primary-selected-toggle-btn, hsla(197, 100%, 32%, 1));
                border-radius: 100px;
                cursor: pointer;
                transition: .5s;
            }

            :host([direction=left]) .leftButton {
                color: var(--toggle-drag-neutral-white-text, hsla(0, 0%, 100%, 1));
            } 

            :host([direction=right]) .rightButton {
                color: var(--toggle-drag-neutral-white-text, hsla(0, 0%, 100%, 1));
            } 

            .leftButton:hover {
                color: var(--toggle-drag-neutral-white-text, hsla(0, 0%, 100%, 1));
            }

            .rightButton:hover {
                color: var(--toggle-drag-neutral-white-text, hsla(0, 0%, 100%, 1));
            }
        </style>
        <div class="shadowWrapper" >
            <div class="button-box">
                <div class="btn"></div>
                <div  class="toggle-btn leftButton" title="${element.strings.timelinePlaybackLive.playback}">${element.strings.timelinePlaybackLive.playback}</div>
                <div  class="toggle-btn rightButton" title="${element.strings.timelinePlaybackLive.live}">${element.strings.timelinePlaybackLive.live}</div>
            </div>
        </div>`;
  }

  get() {
    return this.template;
  }
}
