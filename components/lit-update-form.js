import { LitElement, html, css } from 'lit';

export class LitUpdateForm extends LitElement {
    get _input() {
        return (this.___input ??= this.renderRoot?.querySelector('input') ?? null);
    }
    render() {
    return html`
        <p>Name: <input></p>
        <p><button @click=${this._dispatchLogin}>Login</button></p>
    `;
    }
    _dispatchLogin() {
        const name = this._input.value.trim();
        console.log(name)
        if (name) {
            const options = {
            detail: {name},
            bubbles: true,
            composed: true,
            };
            this.dispatchEvent(new CustomEvent('mylogin', options));
        }
    }
}
customElements.define('lit-update-form', LitUpdateForm);
