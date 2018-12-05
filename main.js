Date.prototype.toDateInputValue = (function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

document.getElementById('date_picker').value = new Date().toDateInputValue();

function getData(date, base) {
    fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`)
        .then(response => response.json())
        .then(json => {
            let data = document.getElementById('data');
            for (const currency in json.rates) {
                data.innerHTML +=
                    `<tr>
                        <td>${currency}</td>
                        <td>${((json.rates[currency]) * 0.95).toFixed(4)}</td>
                        <td>${((json.rates[currency]) * 1.05).toFixed(4)}</td>
                    </tr>`

                let tableCells = document.getElementsByTagName("td");
                for (var i = 0; i < tableCells.length; i++) {
                    if (tableCells[i].innerHTML == "EUR") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                    if (tableCells[i].innerHTML == "USD") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                    if (tableCells[i].innerHTML == "GBP") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                    if (tableCells[i].innerHTML == "AUD") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                    if (tableCells[i].innerHTML == "CAD") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                    if (tableCells[i].innerHTML == "JPY") {
                        tableCells[i].parentNode.style.color = "red";
                    }
                }
            }
        });
}


document.addEventListener('DOMContentLoaded', () => {
    getData('latest', 'EUR ');


    let display = document.getElementById('display');
    display.addEventListener('click', () => {
        let data = document.getElementById('data');
        data.innerHTML = '';
        let base = document.getElementById('base_currency').value;
        let date = document.getElementById('date_picker').value;
        getData(date, base);
    });

});


