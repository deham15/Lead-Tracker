let Lead = [] 
const input_box = document.getElementById("input-el")
const save = document.getElementById("input-btn")
const savetab = document.getElementById("input-tab")
const del = document.getElementById("dlt-btn")
const list = document.getElementById("list")
let leadarr = JSON.parse(localStorage.getItem("Leads"))

if (leadarr) {
    Lead = leadarr
    renderLeads()
}

savetab.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTabUrl = tabs[0].url; // Extract the URL of the active tab
        Lead.push(activeTabUrl); // Add the URL to the Lead array
        localStorage.setItem("Leads", JSON.stringify(Lead)); // Save the updated Lead array
        renderLeads(); // Render the updated list
    });
});
del.addEventListener("click", function () {
    const confirmDelete = confirm("Are you sure you want to delete all your leads?");
    if (confirmDelete) {
        localStorage.clear(); // Clear localStorage
        Lead = []; // Clear the Lead array
        renderLeads(); // Re-render the list   
    }
});
save.addEventListener("click", function () {
    const input = input_box.value;
    if (input) {
        Lead.push(input); // Add the input value to the Lead array
        input_box.value = ""; // Clear the input box
        localStorage.setItem("Leads", JSON.stringify(Lead)); // Save the updated Lead array
        renderLeads(); // Render the updated list
    } else {
        alert("Please enter a valid lead!");
    }
});

function renderLeads() {
    let items = "";
    for (let i = 0; i < Lead.length; i++) {
        items += `<li><a target='_blank' href='${Lead[i]}'>${Lead[i]}</a></li>`;
    }
    list.innerHTML = items;
}
