table = document.querySelector('#table');
data = [];
k = 1;

for (i = 0; i < 3; i++) {
    tr = document.createElement('tr');
    column = [];
    data.push(column);
    for (j = 0; j < 3 ; j++) {
        td = document.createElement('td'); 
        column.push(k);
        td.textContent = k;
        k = k + 1;
        tr.append(td);       
    }
    table.append(tr);
}
console.log(data);
