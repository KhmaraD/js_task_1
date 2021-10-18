import {data} from "./data.js";
import {imgSrc} from "./data.js"

const table = document.querySelector('.table-note');
const createBtn = document.getElementById('add');

function tableFill (table, arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        let tr = document.createElement('tr');
        let tdImg = document.createElement('td');
        let divImgBlock = document.createElement('div');
        let imgNote = document.createElement('img');
        let divImgNote = document.createElement('div');
        divImgNote.classList.add('div-img-note');
        imgNote.classList.add('img-note');
        divImgBlock.classList.add('div-img-block');

        for (let key in arr[i]) {
            let td = document.createElement('td');

            if (key === 'image') {
                imgNote.src = arr[i][key];
                divImgNote.appendChild(imgNote);
                td.appendChild(divImgNote);
                tr.appendChild(td);
            } else if (key !== 'archived' && key !== 'id') {
                td.innerHTML = arr[i][key];
                tr.appendChild(td);
            }
        }

        for (let item in imgSrc) {
            let img = document.createElement('img');
            img.src = imgSrc[item];
            img.classList.add(item);

            img.setAttribute('elementId', arr[i]['id']);

            divImgBlock.appendChild(img);
            tdImg.appendChild(divImgBlock);
        }

        tr.appendChild(tdImg);
        table.appendChild(tr);
    }
}
tableFill(table, data);



// Add new note

const popup = document.getElementById('form');
const popupCloseBtn = document.querySelector('.popup__close');
const create = document.getElementById('create');
const form = document.forms.mainForm;
const noteName = form.name;
const noteCategory = form.categoryNote;
const noteContent = form.contentNote;
const date = new Date();
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const dateNow = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`


const openPopup = () => {
    popup.classList.add('open');
}

const closePopup = () => {
    popup.classList.remove('open');
}

const clearInputs = () => {
    noteName.value = '';
    noteCategory.value = 'category';
    noteContent.value = '';
}

const createNewNote = () => {
    data.push({
        'id': `${Date.now()}`,
        'image': 'images/cart_shopping.png',
        'name': noteName.value,
        'created': dateNow,
        'category': noteCategory.value,
        'content': noteContent.value,
        'dates': '',
        'archived': false,
    });
}

const removeTable = () => {
    while(table.children[1]) {
        table.removeChild(table.lastChild);
    }
}

createBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

create.addEventListener('click', () => {
    createNewNote();
    removeTable();
    tableFill(table, data);
    closePopup();
    clearInputs();
});
