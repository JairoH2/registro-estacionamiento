import {LitElement, html, css} from '../../node_modules/lit-element/lit-element.js'
import 'fa-icons';

export default class LitSearch extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            font-family: 'Montserrat', sans-serif;
        }

        .search-container{
            position: relative;
        }

        .search__input{
            height: 2rem;
            width: 15rem;
            line-height: normal;
            border: none;
            border-radius: 15px;
        }

        .search__input::placeholder{
            padding-left: 2rem;
        }

        .search__icon{
            position: absolute;
            top: 4px;
            left: 5px;
        }

        .search__icon.visible{
            visibility: hidden;
        }
    `;

    searchProduct(e){
        e.target.placeholder=" "
        e.target.value === '' ? e.target.nextElementSibling.classList.toggle("visible") : '';
    }

    noSearchProduct(e){
        e.target.placeholder="Buscar"
        e.target.value === '' ? e.target.nextElementSibling.classList.toggle("visible") : '';
        
    }

    render() {
        return html`
            <div class="search-container">
                <input type="text" placeholder="Buscar" class="search__input" @focus="${this.searchProduct}" @blur="${this.noSearchProduct}" />
                <fa-icon class="fas fa-search search__icon" color="#1F1E25;" size="1.5em"></fa-icon>
            </div>
        `;
    }
}
customElements.define('lit-search', LitSearch);
