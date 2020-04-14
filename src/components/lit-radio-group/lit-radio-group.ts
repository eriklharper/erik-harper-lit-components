import { html, LitElement, customElement, property } from 'lit-element';

@customElement('erik-lit-radio-group')
export class LitRadioGroup extends LitElement {

  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name;
  @property({ type: String }) scale: "small" | "medium" | "large" = "small";
  @property({ type: Boolean }) vertical: boolean = false;

  connectedCallback() {
    super.connectedCallback()
    this.passPropsToRadioButtons();
  }

  @Listen("onRadioButtonFocus")
  onRadioButtonFocus(event: CustomEvent) {
    (event.target as HTMLErikRadioButtonElement).checked = true;
    (event.target as HTMLErikRadioButtonElement).focused = true;
  }

  @Listen("onRadioButtonBlur")
  onRadioButtonBlur(event: CustomEvent) {
    (event.target as HTMLErikRadioButtonElement).focused = false;
  }

  passPropsToRadioButtons = () => {
    const radioButtons = Array.from(this.querySelectorAll('erik-lit-radio-button'));
    if (radioButtons && radioButtons.length > 0) {
      radioButtons.forEach(radioButton => {
        radioButton.disabled = radioButton.hasAttribute("disabled") ? radioButton.disabled : this.disabled;
        radioButton.name = this.name;
        radioButton.scale = this.scale;
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