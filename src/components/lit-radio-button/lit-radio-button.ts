import { css, html, LitElement, property, customElement } from 'lit-element';

const styles = css`
:host {
  display: flex;
  align-items: center;
  cursor: pointer;
}
#radio {
  border-radius: 100%;
  box-shadow: inset 0 0 0 1px var(--radio-default);
  cursor: pointer;
  margin-right: 7px;
  flex: 1 1 12px;
}
label {
  cursor: pointer;
  flex: 1 1 auto;
}

:host(:hover) #radio {
  box-shadow: inset 0 0 0 2px var(--radio-blue);
}
:host(:hover[disabled]) #radio {
  box-shadow: inset 0 0 0 1px var(--radio-default);
}

/* Extra Small */
:host([scale=xsmall]) #radio {
  height: 12px;
  min-width: 12px;
  max-width: 12px;
}
:host([scale=xsmall][checked]) #radio,
:host(:hover[scale=xsmall][checked][disabled]) #radio {
  box-shadow: inset 0 0 0 4px var(--radio-blue);
}
:host(:hover[scale=xsmall][checked]) #radio,
:host([scale=xsmall][focused]) #radio {
  box-shadow:
    inset 0 0 0 4px var(--radio-blue),
    0 0 0 1px white,
    0 0 0 3px var(--radio-blue);
}

/* Small (Default) */
:host([scale=small]) #radio {
  height: 14px;
  min-width: 14px;
  max-width: 14px;
}
:host([scale=small][checked]) #radio,
:host(:hover[scale=small][checked][disabled]) #radio {
  box-shadow: inset 0 0 0 4px var(--radio-blue);
}
:host(:hover[scale=small][checked]) #radio,
:host([scale=small][focused]) #radio {
  box-shadow:
    inset 0 0 0 4px var(--radio-blue),
    0 0 0 1px white,
    0 0 0 3px var(--radio-blue);
}

/* Medium */
:host([scale=medium]) #radio {
  height: 16px;
  min-width: 16px;
  max-width: 16px;
}
:host([scale=medium][checked]) #radio,
:host(:hover[scale=medium][checked][disabled]) #radio {
  box-shadow: inset 0 0 0 5px var(--radio-blue);
}
:host(:hover[scale=medium][checked]) #radio,
:host([scale=medium][focused]) #radio {
  box-shadow:
    inset 0 0 0 5px var(--radio-blue),
    0 0 0 1px white,
    0 0 0 3px var(--radio-blue);
}

/* Large */
:host([scale=large]) #radio {
  height: 18px;
  min-width: 18px;
  max-width: 18px;
}
:host([scale=large][checked]) #radio,
:host(:hover[scale=large][checked][disabled]) #radio {
  box-shadow: inset 0 0 0 6px var(--radio-blue);
}
:host(:hover[scale=large][checked]) #radio,
:host([scale=large][focused]) #radio {
  box-shadow:
    inset 0 0 0 6px var(--radio-blue),
    0 0 0 1px white,
    0 0 0 3px var(--radio-blue);
}

/* Disabled */
:host([disabled]) {
  cursor: default;
  opacity: 0.4;
}
:host([disabled]) #radio,
:host([disabled]) label {
  cursor: default;
}
`;

@customElement('erik-lit-radio-button')
export class LitRadioButton extends LitElement {

  @property({ type: Boolean, reflect: true }) ariaChecked = false;
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) focused = false;
  @property({ type: String }) name;
  @property({ type: String, reflect: true }) role = "radio";
  @property({ type: String, reflect: true }) scale: "xsmall" | "small" | "medium" | "large" = "small";
  @property({ type: String, reflect: true }) value;

  private input: HTMLInputElement;

  static get styles() {
    return styles;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${this.name}.${this.value}:${name} from: ${oldValue} to: ${newValue}`);
    switch (name) {
      default:
        if (this.input) {
          this.input.checked = false;
          this.input.blur();
        }
        break;
      case "checked":
        if (this.input) {
          this.input.checked = true;
        }
        break;
      case "focused":
        this.input.focus();
        break;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  firstUpdated() {
    this.renderHiddenRadioInput();
    this.addEventListener("click", this.onClick);
  }

  onClick = () => {
    let event = new CustomEvent('onRadioButtonClick', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  onInputFocus = () => {
    let event = new CustomEvent('onRadioButtonFocus', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  onInputBlur = () => {
    let event = new CustomEvent('onRadioButtonBlur', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  renderHiddenRadioInput() {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.input = this.ownerDocument.createElement("input");
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.id = `${this.name}.${this.value}`;
    this.input.name = this.name;
    this.input.onblur = this.onInputBlur;
    this.input.onfocus = this.onInputFocus;
    this.input.style.opacity = "0";
    this.input.style.position = "absolute";
    this.input.style.zIndex = "-1";
    this.input.value = this.value;
    this.input.type = "radio";
    this.appendChild(this.input);
  }

  render() {
    const id = `${this.name}.${this.value}`;
    return html`
      <div id="radio"></div>
      <label htmlFor={id}>
        <slot></slot>
      </label>
    `;
  }
}

