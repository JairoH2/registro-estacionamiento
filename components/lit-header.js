import { LitElement, html, css } from "lit";

export default class LitHeader extends LitElement{

    static styles = css`
        :host{
            display: block;
            font-family: 'Montserrat', sans-serif;
            color: #FEFEFF;
        }

        .header{
            display: flex;
            //justify-content: space-between;
            flex-direction: column;
            text-align: center;
        }

        .title{
            margin: 2rem 0 0 0;
        }
    `;

    render() {
        return html`
            <header class="header">
                <h1 class="title">Estacionamiento</h1>
            </header>
        `;
    }
}

customElements.define('lit-header', LitHeader);