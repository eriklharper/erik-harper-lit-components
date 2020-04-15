import { html, LitElement, customElement, property, css } from 'lit-element';
import { LitRadioButton } from '../lit-radio-button/lit-radio-button';

const styles = css`
:host {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, max-content));
  grid-gap: 15px;
}
:host([vertical]) {
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
`;

@customElement('erik-lit-radio-group')
export class LitRadioGroup extends LitElement {

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name;
  @property({ type: String, reflect: true }) scale: "small" | "medium" | "large" = "small";
  @property({ type: Boolean, reflect: true }) vertical: boolean = false;

  static get styles() {
    return styles;
  }

  firstUpdated() {
    this.passPropsToRadioButtons();
    this.addEventListener("onRadioButtonClick", this.onRadioButtonClick);
    this.addEventListener("onRadioButtonFocus", this.onRadioButtonFocus);
    this.addEventListener("onRadioButtonBlur", this.onRadioButtonBlur);
  }

  onRadioButtonClick(event: CustomEvent): void {
    const radioButtons = Array.from(this.querySelectorAll("erik-lit-radio-button"));
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach(radioButton => (radioButton as LitRadioButton).checked = false);
      (event.target as LitRadioButton).checked = true;
      (event.target as LitRadioButton).focused = true;
    }
  }

  onRadioButtonFocus(event: CustomEvent) {
    (event.target as LitRadioButton).checked = true;
    (event.target as LitRadioButton).focused = true;
  }

  onRadioButtonBlur(event: CustomEvent) {
    (event.target as LitRadioButton).focused = false;
  }

  passPropsToRadioButtons = () => {
    const radioButtons = Array.from(this.querySelectorAll('erik-lit-radio-button'));
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach(radioButton => {
        (radioButton as LitRadioButton).disabled = radioButton.hasAttribute("disabled") ? (radioButton as LitRadioButton).disabled : this.disabled;
        (radioButton as LitRadioButton).name = this.name;
        (radioButton as LitRadioButton).scale = this.scale;
        return radioButton;
      });
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}