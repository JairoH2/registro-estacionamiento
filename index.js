import {LitElement, html, css} from '../../node_modules/lit-element/lit-element.js'

import "./components/lit-header.js";
import "./components/lit-search.js";
import "./components/lit-vehiculo.js";

const datosVehiculos = [];


export default class LitContain extends LitElement{

    static styles = css`
        :host{
            display: block;
            color: #FEFEFF;
            box-sizing: border-box;
        }
        *, *::before, *::after{
            box-sizing: inherit;
            font-family: 'Montserrat', sans-serif;
        }
        .container__cards{
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-gap: 1rem;
            margin: 2rem 0;
        }

        @media (min-width: 548px){
            .container__cards{
            grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 992px){
            .container__cards{
            grid-template-columns: repeat(3, 1fr);
            }
        }
                
        .data{
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .data p{
            margin: 0;
            margin: 1rem 0 2rem 0;
            padding: 0.5rem;
        }

        .data p:nth-child(3){
            padding: 0.5rem;
            font-weight: 600;
            border-radius: 10px;
            box-shadow: 2px 2px 48px 0px rgba(0,0,0,0.75);
            background-color: #777676;
            transition: all 0.3s ease;
        }

        .data p:nth-child(3):hover{
            cursor: pointer;
            background-color: #8ac707;
            box-shadow: 2px 2px 48px -1px rgba(0,0,0,0.75);
        }

        .form{
            display: block;
            margin: 1.2rem auto 0 auto;
            max-width: 30rem;
            background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a5f100);
            padding: 1.5rem;
            border-radius: 15px;
        }

        .form legend{
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 1.6rem;
            font-weight: 600;
        }

        .form__input{
            display: flex;
            flex-direction: column;
            margin-bottom: 1.2rem;
        }

        .form__input label{
            margin-bottom: 0.2rem;
        }

        .form input{
            border-radius: 15px;
            height: 2.2rem;
            border: none;
            padding-left: 0.5rem;
            background-color: #e7e7e7;
        }

        .form > input{
            display: block;
            width: 70%;
            margin: 2.2rem auto 0 auto;
            font-weight: 600;
            font-size: 1rem;
            background-color: #1F1E25;
            color: #fff;
            cursor: pointer;
        }
    `;

    //* Properties
    static properties = {
        modal: {type: Boolean},
        tipo: {type: String},
        marca: {type: String},
        detalles: {type: String}
    }

    //* Constructor
    constructor(){
        super();
        this.modal = true;
        this.tipo = '';
        this.marca = '';
        this.detalles = '';
    }

    //* Funciones
    handleModal(){
        this.modal === true ? this.modal = false : this.modal = true;
        this.tipo= '';
        this.marca= '';
        this.detalles= '';
    }

    handleSubmit(e){
        e.preventDefault();
        
        if([this.tipo, this.marca, this.detalles].includes('')){
            console.log("Todos los campos son obligatorios");
            return;
        }

        //Validación correcta
        datosVehiculos.push({
            tipo: this.tipo, 
            marca: this.marca, 
            detalles: this.detalles, 
            entrada: '12:50 PM.'
        });

        this.tipo= '';
        this.marca= '';
        this.detalles= '';
        this.modal === true ? this.modal = false : this.modal = true;
    }

    render(){
        return html`
            <div class="data">
                <p>12 de Septiembre</p>
                <p>|</p>
                <p @click="${this.handleModal}">${this.modal === false ? 'Añadir +' : 'Cancelar X'}</p>
            </div>
            ${ (this.modal === false) ? html`            
                <lit-search></lit-search>
                <div class="container__cards">
                    ${
                        datosVehiculos.map((item) => html`<lit-vehiculo type=${item.tipo} brand=${item.marca} details=${item.detalles} entryTime=${item.entrada}></lit-vehiculo>`)
                    }
                </div>
            ` 
            : html`
                <form class="form" @submit="${this.handleSubmit}">
                    <legend>Nuevo Vehículo</legend>
                    <div class="form__input">
                        <label for="tipo">Tipo:</label>
                        <input 
                            id="tipo" 
                            type="text"
                            .value="${this.tipo}"
                            @keyup="${(e)=>this.tipo=e.target.value}"
                        />
                    </div>
                    <div class="form__input">
                        <label for="marca">Marca:</label>
                        <input 
                            id="marca" 
                            type="text"
                            .value="${this.marca}"
                            @keyup="${(e)=>this.marca=e.target.value}"
                        />
                    </div>
                    <div class="form__input">
                        <label for="detalle">Detalles:</label>
                        <input 
                            id="detalle" 
                            type="text"
                            .value="${this.detalles}"
                            @keyup="${(e)=>this.detalles=e.target.value}"
                        />
                    </div>

                    <input type="submit" value="Registrar"/>
                </form>
            `
            }
        `;
    }
}

customElements.define('lit-contain', LitContain);