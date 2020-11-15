import { getPanier, changeProduit } from './utils';

class ControllerView {

    /**
     * @param {HTMLElement } element 
     * @param {HTMLContent} content 
     */
    render(element, content) {
        document.querySelector(element).innerHTML = content
    }
}

export default ControllerView;