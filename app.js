const finalAmount = document.getElementById('final-amount'),
      incomeAmt = document.getElementById('inc'),
      expenseAmt = document.getElementById('exp'),
      transactionName = document.getElementById('name'),
      transactionAmt = document.getElementById('amount'),
      myForm = document.getElementById('myForm'),
      list = document.getElementById('result');

let currentIncome = 0;
let currentExpense = 0;
let id = Math.round((Math.random() * 1000000));
      
myForm.addEventListener('submit', (e) => {
    //calling the income function
    addTransaction();
    //Prevent page form reloading
    e.preventDefault();
});   


    //Getting from local storage
    const localStorageTransactions = JSON.parse(
        localStorage.getItem('transactions')
        );

        //creating an array
        let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];




//adding the transaction function
function addTransaction() {
    if(transactionName.value === '' || transactionAmt.value === '') {
        alert('No field can be left balnk');
        return false;
    }

    if(transactionAmt.value == 0) {
        alert('Value cannot be zero');
        return false;
    }


    //creating transaction object
    const transaction = {
        id: id++,
        name: transactionName.value,
        amount: transactionAmt.value
    }

    console.log(transaction);

    // //adding the transaction to the array
    // transactions.push(transaction);

    // const amounts = transactions.map(transaction => transaction.amount);
    // localStorage.setItem('transactions', JSON.stringify(transactions));

    //INCOME
    if(Math.sign(transactionAmt.value) > 0) {
        //creating the li element
        let li = document.createElement('li');
        li.style.color = 'green';
        li.innerHTML = `${transactionName.value}:  <span id="check">+${transactionAmt.value}    </span>`;
        //create delete element
        let remove = document.createElement('SPAN');
        remove.classList = 'remove';
        remove.textContent = 'x';
        //appending a to li
        li.appendChild(remove);
         //displaying the income
        currentIncome += parseInt(transactionAmt.value);
        incomeAmt.textContent = currentIncome;
        list.appendChild(li);
        let x;
        //adding event listener for delete
        remove.addEventListener('click', (el) => {
            if(el.target.classList.contains('remove')) {
                el.target.parentElement.remove();
                x =  parseInt(el.target.previousSibling.textContent);
                currentIncome = currentIncome - x;
                incomeAmt.textContent = currentIncome;
                finalAmount.textContent = currentIncome + currentExpense;
            }
        });
    } else {
        //EXPENSE
        //creating the li element
        let li = document.createElement('li');
        li.style.color = 'red';
        li.innerHTML = `${transactionName.value}: <span id="check">${transactionAmt.value}</span>`;
        //create delete element
        let remove = document.createElement('SPAN');
        remove.textContent= 'x';
        remove.classList = 'remove';
        //appending a to li
        li.appendChild(remove);
        //displaying the expesne amont
        currentExpense += parseInt(transactionAmt.value);
        expenseAmt.textContent = -currentExpense;
        list.appendChild(li);
        let x;
        //removing item
        remove.addEventListener('click', (el) => {
            if(el.target.classList.contains('remove')) {
                el.target.parentElement.remove();
                x =  parseInt(el.target.previousSibling.textContent);
                currentExpense = currentExpense - x;
                expenseAmt.textContent = currentExpense;
                finalAmount.textContent = currentIncome + currentExpense;
            }
        });
    }
    
    //displaying the final output
    finalAmount.textContent = currentIncome + currentExpense;
    //clearing the input fields after inserting
    transactionName.value = '';
    transactionAmt.value = '';
}


    