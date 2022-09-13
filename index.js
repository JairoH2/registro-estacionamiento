import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import "./components/lit-header.js";
import "./components/lit-search.js";
import "./components/lit-vehiculo.js";
import "./components/lit-update-form.js"


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

        .input__option, .form select{
            border-radius: 15px;
            height: 2.2rem;
            border: none;
            padding-left: 0.5rem;
            background-color: #e7e7e7;
            font-size: 1rem;
        }

        .btns__form{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding: 0 1rem;
            margin-top: 2.2rem;
            margin-bottom: 1rem;
        }
        
        .btn__submit, .btn__eliminar{
            display: block;
            border-radius: 15px;
            height: 2.2rem;
            width: 70%;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            color: #fff;
            cursor: pointer;
        }

        .btn__submit{
            background-color: #1F1E25;
            transition: background-color 0.3s ease;
        }

        .btn__submit:hover{
            background-color: #131218;
        }

        .btn__eliminar{
            background-color: #861818;
            transition: background-color 0.3s ease;
        }

        .btn__eliminar:hover{
            background-color: #610d0d;
        }
    `;

    //* Properties
    static properties = {
        modal: {type: Boolean},
        eliminar: {type: Boolean},
        tipo: {type: String},
        marca: {type: String},
        detalles: {type: String},
        listaEntradas: {type: Array},
        elementId: {type: String},
    }

    //* Constructor
    constructor(){
        super()
        this.modal = false;
        this.eliminar = false;
        this.tipo = '';
        this.marca = '';
        this.detalles = '';
        this.listaEntradas = JSON.parse(localStorage.getItem('vehiculos')) ?? [];
        this.elementId='';
    }

    //* Funciones

    _loginListener(e) {
        var id = e.detail.name;
        this.listaEntradas.map((item)=>{
            if(item.id === id){
                this.tipo = item.tipo;
                this.marca = item.marca;
                this.detalles = item.detalles;
                this.elementId = id;
            }
        });
        this.modal = true;
        this.eliminar = true;
    }

    handleModal(){
        this.modal === true ? this.modal = false : this.modal = true;
        this.tipo= '';
        this.marca= '';
        this.detalles= '';
        this.elementId='';
        this.eliminar = false;
    }

    handleSubmit(e){
        e.preventDefault();
        // crea la fecha de ingreso
        var today = new Date();
        var now = today.toLocaleString();
        
        if([this.tipo, this.marca, this.detalles].includes('')){
            console.log("Todos los campos son obligatorios");
            return;
        }

        const objetoVehiculo = { 
            tipo: this.tipo, 
            marca: this.marca, 
            detalles: this.detalles, 
            entrada:"12:40 am",
        }

        if(this.elementId){
            //Actualizar elemento
            console.log("Hola id");
            objetoVehiculo.id = this.elementId;
            this.listaEntradas = this.listaEntradas.map((item) => item.id === this.elementId ? objetoVehiculo : item);
            this.eliminar = false;
        } else {
            //Validación correcta (Generador de id)
            this.listaEntradas.push({
                tipo: this.tipo, 
                marca: this.marca, 
                detalles: this.detalles, 
                entrada: now,
                id: this.obtenerId(),
            });
            localStorage.setItem('vehiculos', JSON.stringify(this.listaEntradas));
        }

        this.tipo= '';
        this.marca= '';
        this.detalles= '';
        this.elementId = '';
        this.eliminar = false;
        this.modal = false;
    }

    obtenerId(){
        const random = Math.random().toString(36).slice(2);
        const fecha = Date.now().toString(36);

        return fecha + random
    }

    handleDelete(){
        const respuesta = window.confirm('Deseas eliminar este vehículo?');
        if(respuesta){
            this.listaEntradas = this.listaEntradas.filter((item) => item.id !== this.elementId );
            localStorage.setItem('vehiculos', JSON.stringify(this.listaEntradas));
            this.modal = false;
        }
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
                <div class="container__cards" @mylogin=${this._loginListener}>
                    ${
                        this.listaEntradas.map((item) => html`<lit-vehiculo type="${item.tipo}" brand="${item.marca}" details="${item.detalles}" entryTime="${item.entrada}" elementId="${item.id}" srcImage="${item.tipo === "automovil" ? '../assets/car_icon.svg' : item.tipo === "bicicleta" ? '../assets/bicycle_icon.svg' : '../assets/motorcycle_icon.svg'}"></lit-vehiculo>`)
                    }
                </div>
            ` 
            : html`
                <form class="form" @submit="${this.handleSubmit}">
                    <legend>Nuevo Vehículo</legend>
                    <div class="form__input">
                        <label for="tipo">Tipo:</label>
                        <select 
                            name="tipovehiculo" 
                            id="tipo"
                            .value="${this.tipo}"
                            @change="${(e)=>this.tipo=e.target.value}"
                        >
                            <option value="bicicleta">Bicicleta</option>
                            <option value="motocicleta">Motocicleta</option>
                            <option value="automovil">Automóvil</option>
                        </select>
                    </div>
                    <div class="form__input">
                        <label for="marca">Marca:</label>
                        <input 
                            id="marca" 
                            type="text"
                            class="input__option"
                            .value="${this.marca}"
                            @keyup="${(e)=>this.marca=e.target.value}"
                        />
                    </div>
                    <div class="form__input">
                        <label for="detalle">Detalles:</label>
                        <input 
                            id="detalle" 
                            type="text"
                            class="input__option"
                            .value="${this.detalles}"
                            @keyup="${(e)=>this.detalles=e.target.value}"
                        />
                    </div>
                    <div class="btns__form">
                        <input class="btn__submit" type="submit" .value="${this.eliminar === true ? 'Actualizar': 'Registrar'}"/>
                        ${this.eliminar === true ? html`<button class="btn__eliminar" type="button" @click="${this.handleDelete}">Eliminar</button>` : ''}
                    </div>
                </form>
                
            `
            }
        `;
    }
}

customElements.define('lit-contain', LitContain);