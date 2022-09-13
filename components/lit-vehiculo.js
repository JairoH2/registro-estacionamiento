import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


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
            cursor: pointer;
        }
        .card p:nth-child(3){
            margin-top: 0px;
        }
        .card p:nth-child(1){
            margin-bottom: 0px;
        }
        .header{
            margin-top: 0.5rem;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        .header__icon{
            width: 30px;
        }
        .vehiculo-icon{
            display: block;
            margin: 0 auto;
            width: 30%;
        }
        .option{
            font-weight: 700;
        }
    `;

    static properties = {
        type: { type: String},
        brand: { type: String},
        details: { type: String},
        entryTime: { type: String},
        srcImage: {type: String},
        elementId: {type: String}
    }

    constructor(){
        super();
        this.type = 'undefined';
        this.brand = 'undefined';
        this.details = 'undefined';
        this.entryTime = 'undefined';
        this.srcImage = 'undefined';
        this.elementId = 'undefined'
    }

    
    get _input() {
        return (this.___input ??= this.renderRoot?.querySelector('.card') ?? null);
    }

    _dispatchLogin() {
        console.log("Ejecutando Dispach")
        const name = this.elementId;
        if (name) {
            const options = {
            detail: {name},
            bubbles: true,
            composed: true,
            };
            this.dispatchEvent(new CustomEvent('mylogin', options));
        }
    }

    render() {
        return html`
            <div class="card" @click="${this._dispatchLogin}">
                <div class="header">
                    <p>02 de Septiembre</p>
                    <img src="../assets/arrow_icon.svg" class="header__icon"/>
                </div>

                <img src="${this.srcImage}" class="vehiculo-icon"/>
                <p><span class="option">Tipo:</span> ${this.type === 'bicicleta' ? 'Bicicleta' : this.type === 'motocicleta' ? 'Motocicleta' : 'Automóvil'}</p>
                <p><span class="option">Marca:</span> ${this.brand}</p>
                <P><span class="option">Detalles:</span> ${this.details}</P>
                <p><span class="option">Entrada:</span> ${this.entryTime}</p>

            </div>
        `;
    }
}
customElements.define('lit-vehiculo', LitVehiculo);
