import { html, LitElement, property, customElement } from 'lit-element';

@customElement('erik-lit-radio-button')
export class LitRadioButton extends LitElement {

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) focused = false;
  @property({ type: String }) name;
  @property({ type: String }) scale: "xsmall" | "small" | "medium" | "large" = "small";
  @property({ type: String }) value;

  private input: HTMLInputElement;

  firstUpdated() {
    this.renderHiddenRadioInput();
  }

  onInputFocus = () => {
    let event = new CustomEvent('onRadioButtonFocus');
    this.dispatchEvent(event);
  }

  onInputBlur = () => {
    let event = new CustomEvent('onRadioButtonBlur');
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
    // this.input.style.opacity = "0";
    // this.input.style.position = "absolute";
    // this.input.style.zIndex = "-1";
    this.input.value = this.value;
    this.input.type = "radio";
    this.appendChild(this.input);
  }

  render() {
    const id = `${this.name}.${this.value}`;
    return html`
      <span id="radio"></span>
      <label htmlFor={id}>
        <slot></slot>
      </label>
    `;
  }
}