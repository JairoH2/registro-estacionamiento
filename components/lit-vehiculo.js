import {LitElement, html, css} from '../node_modules/lit-element/lit-element.js'
import 'fa-icons';

export default class LitVehiculo extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Montserrat', sans-serif;
            color: white;
            box-sizing: border-box;
        }

        *, *:before, *:after {
            box-sizing: inherit;
        }

        .card{
            background-color: #0d0c13;
            background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a5f100);
            box-shadow: 2px 2px 48px -1px rgba(0,0,0,0.75);
            border-radius: 15px;
            border: none;
            padding: 0.5rem 1.2rem;
        }
        .header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .vehiculo-icon{
            display: flex;
            justify-content: center;
        }
        .option{
            font-weight: 700;
        }
    `;

    static properties = {
        type: { type: String},
        brand: { type: String},
        details: { type: String},
        entryTime: { type: String}
    }

    constructor(){
        super();
        this.type = 'undefined';
        this.brand = 'undefined';
        this.details = 'undefined';
        this.entryTime = 'undefined';
    }

    render() {
        return html`
            <div class="card">
                <div class="header">
                    <p>02 de Septiembre</p>
                    <fa-icon class="fas fa-arrow-right" color="#ffffff;" size="1.5em"></fa-icon>
                </div>

                <fa-icon class="fas fa-car vehiculo-icon" color="#0b161b;" size="5em"></fa-icon>
                <p><span class="option">Tipo:</span> ${this.type}</p>
                <p><span class="option">Marca:</span> ${this.brand}</p>
                <P><span class="option">Detalles:</span> ${this.details}</P>
                <p><span class="option">Entrada:</span> ${this.entryTime}</p>

            </div>
        `;
    }
}
customElements.define('lit-vehiculo', LitVehiculo);
