import { html, LitElement, customElement } from 'lit-element';

@customElement('erik-form')
export class LitForm extends LitElement {

  form: HTMLFormElement;

  // createRenderRoot() {
  //   return this;
  // }

  firstUpdated() {
    this.renderHiddenRadioInput();
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    new FormData(this.form);
  }

  onFormData(event: any) {
    let data = {};
    for (var pair of event.formData.entries()) {
      data[pair[0]] = pair[1];
    }
    alert(JSON.stringify(data, null, 2))
  }

  renderHiddenRadioInput() {
    // Rendering a hidden radio input outside Shadow DOM so it can participate in form submissions
    // @link https://www.hjorthhansen.dev/shadow-dom-form-participation/
    this.form = this.ownerDocument.createElement("form");
    this.appendChild(this.form);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}
