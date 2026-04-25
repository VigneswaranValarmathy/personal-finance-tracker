const registerForm = document.getElementById("registerForm");

if(registerForm){
registerForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/PersonalFinanceTracker/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${name}&email=${email}&password=${password}`
        });

        const result = await response.text();

        alert(result);

        if(result === "success"){
            window.location.href = "login.html";
        }

    } catch (error) {
        console.error(error);
        alert("Error connecting to server");
    }

});
}

//Login Functionality

const loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try{
            const response = await fetch("http://localhost:8080/PersonalFinanceTracker/login", {
                method:"POST",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:`email=${email}&password=${password}`
            });
            const result = await response.text();
            
            if(result == "success"){
                alert("Login Successful");
                localStorage.setItem("loggedInUser", email);
                window.location.href = "/PersonalFinanceTracker/pages/dashboard.html";
            }else{
                alert("Invalid Login");
            }   
        }catch(error){
            alert("Server Error");  
        }
    });
}

const transactionForm = document.getElementById("transactionForm");

if(transactionForm){
const email = localStorage.getItem("loggedInUser");
transactionForm.addEventListener("submit", async function(event){
event.preventDefault();

const amount = parseFloat(document.getElementById("amount").value);
const category = document.getElementById("category").value;
const type = document.getElementById("type").value;
const date = document.getElementById("date").value;

try{
const response = await fetch("http://localhost:8080/PersonalFinanceTracker/addTransaction", {
    method:"POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body:`email=${email}&amount=${amount}&category=${category}&type=${type}&date=${date}`
})

const result = await response.text();
    if(result == "success"){
        alert("Added Transaction Successfully");
        window.location.href="dashboard.html";
    }else{
        alert("Failed to Add Transaction");
    }
}catch(error){
    console.error(error);
    alert("Server Error");
}
});
}

if(window.location.pathname.includes("dashboard.html")){

const user = localStorage.getItem("loggedInUser");

if(!user){
    alert("Please login first");
    window.location.href = "/PersonalFinanceTracker/pages/login.html";
}

const email = localStorage.getItem("loggedInUser");

fetch(`http://localhost:8080/PersonalFinanceTracker/getTransaction?email=${email}`)
.then(res => res.json())
.then(transactions => {

let income = 0;
let expense = 0;

const tableBody = document.getElementById("transactionBody");
tableBody.innerHTML = "";

transactions.forEach((t) => {

if(t.type === "income"){
    income += t.amount;
}else{
    expense += t.amount;
}

// Add row
const row = document.createElement("tr");

row.innerHTML = `
<td>${t.date}</td>
<td>${t.category}</td>
<td>${t.type}</td>
<td>₹${t.amount}</td>
<td><button onclick="editTransaction(${t.id}, '${t.category}', '${t.type}', ${t.amount}, '${t.date}')">Edit</button> | <button onclick="deleteTransaction(${t.id})">Delete</button></td>
`;

tableBody.appendChild(row);

});

let savings = income - expense;

document.getElementById("totalIncome").innerText = "\u20B9" + income;
document.getElementById("totalExpense").innerText = "\u20B9" + expense;
document.getElementById("savings").innerText = "\u20B9" + savings;

let foodExpense = 0;

transactions.forEach((t)=>{
    if(t.category === "Food" && t.type === "expense"){
        foodExpense += t.amount;
    }
});

// ✅ MOVE THIS HERE
const budget = parseFloat(localStorage.getItem("foodBudget"));

if(budget){
    if(foodExpense > budget){
        document.getElementById("budgetAlert").innerText =
            "⚠️ Food budget exceeded!";
    }else{
        document.getElementById("budgetAlert").innerText =
            `✅ Spent ₹${foodExpense} / ₹${budget}`;
    }
}

const ctx = document.getElementById("expenseChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [income, expense],
            backgroundColor: ["green", "red"]
        }]
    }
});

})
.catch(err => {
console.error(err);
alert("Error loading transactions");
});

}


function logout(){

localStorage.removeItem("loggedInUser");

window.location.href = "login.html";

}


function deleteTransaction(id){
	
	fetch("http://localhost:8080/PersonalFinanceTracker/deleteTransaction",{
		method:'POST',
		headers:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		body:`id=${id}`
	})
	.then(response=>{
		if(response.ok){
			alert("Transaction Deleted Successfully");
			location.reload();
		}else{
			alert("Delete Failed");
		}
	}).catch(error =>{
		console.error('Error', error);
	});

}


function saveBudget() {
	let foodBudget = document.getElementById("foodBudget").value;
 	if(!foodBudget || foodBudget <= 0 ){
	alert("Enter a valid Budget");
	}
	localStorage.setItem("foodBudget", foodBudget);
 	alert("Buget Entered Successfully");
 	window.location.reload();
}



function editTransaction(id, category, type, amount, date){
	
	const newAmount = prompt("Enter new amount:", amount);
	const newCategory = prompt("Enter new category:", category);
	const newType = prompt("Enter new type(income/expense):", type);
	const newDate = prompt("Enter new date:", date);
	
	if(!newAmount || !newCategory || !newType || !newDate){
		alert("Enter all the fields");
		return;
	}
	
	fetch("http://localhost:8080/PersonalFinanceTracker/editTransaction",{
		method:"POST",
		headers:{
		"Content-Type":"application/x-www-form-urlencoded"
		},
		body:`id=${id}&amount=${newAmount}&category=${newCategory}&type=${newType}&date=${newDate}`
	}).then(res => res.text())
	.then(result => {
		if(result === "success"){
			alert("Updated successfully");
			location.reload();
		}else{
			alert("Update Failed");
		}
	})
	.catch(err => console.error(err));
	
}

function toggleProfileMenu(){
	const menu = document.getElementById("profileMenu");
	menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("DOMContentLoaded",()=>{
		const email = localStorage.getItem("loggedInUser");
		if(email){
			const userEmail = document.getElementById("userEmail");
			if(userEmail){
				userEmail.innerHTML = email;
			}
		}
})
