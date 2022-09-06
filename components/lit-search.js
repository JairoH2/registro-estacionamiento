import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

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
            left: 4px;
            width: 25px;
            height: 25px;
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
                <img src="../assets/search_icon.svg" class="search__icon"></img>
            </div>
        `;
    }
}
customElements.define('lit-search', LitSearch);
