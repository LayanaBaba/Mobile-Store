'use strict';

function priceGeterator(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let infos = [];

let headerArr = ['User', 'Type', 'Price', 'Condition'];

function Info(user, type) {
    this.user = user;
    this.type = type;
    this.price = priceGeterator(100, 500);

    infos.push(this);
    settingItem();

}

function settingItem() {
    let setArr = JSON.stringify(infos);
    localStorage.setItem('infos', setArr);
}

let table = document.getElementById('table');
let header = document.createElement('tr');
table.appendChild(header);

for (let i = 0; i < headerArr.length; i++) {
    let headerContent = document.createElement('th');
    header.appendChild(headerContent);
    headerContent.textContent = headerArr[i];
}


Info.prototype.render = function () {
    let row = document.createElement('tr');
    table.appendChild(row);

    let rowUser = document.createElement('td');
    row.appendChild(rowUser);
    rowUser.textContent = this.user;

    let rowType = document.createElement('td');
    row.appendChild(rowType);
    rowType.textContent = this.type;

    let rowPrice = document.createElement('td');
    row.appendChild(rowPrice);
    rowPrice.textContent = this.price;

    let rowCondition = document.createElement('td');
    row.appendChild(rowCondition);
    if (this.price < 200) {
                rowCondition.textContent = 'used';
            } else {
                rowCondition.textContent= 'new';
            }
}

let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();

    let user = event.target.user.value;
    let type = event.target.type.value;

    let addedInfo = new Info(user, type);
    addedInfo.render();
}


function gettingItem() {
    let data = localStorage.getItem('infos');
    let getArr = JSON.parse(data);

    if (getArr) {
        for (let i = 0; i < getArr.length; i++) {
            new Info(getArr[i].user, getArr[i].type);
        }
    }
}
gettingItem();
for (let i = 0; i < infos.length; i++) {
    
    infos[i].render();
}