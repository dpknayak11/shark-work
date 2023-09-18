const token = localStorage.getItem("accessToken");
window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('accessToken')
    const decodedToken = parseJwt(token)
    console.log(decodedToken)
    const ispremium = decodedToken.ispremiumuser;
    if (ispremium) {
        showPremium()
        showLeaderBoard()

    }

    await axios.get("/get-expense-data", { headers: { "Authorization": token } })
        .then((details) => {
            for (var i = 0; i < details.data.length; i++) {
                showUserOnScreen(details.data[i])
            }
        })

});
async function formData(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const obj = { amount, description, category };
    try {
        const token = localStorage.getItem('accessToken')
        axios.post("/post-expense", obj, { headers: { "Authorization": token } })
            .then(res => { showUserOnScreen(res.data.expense); })
    } catch (err) { console.log(err) }
}

async function showUserOnScreen(obj) {
    const ulTag = document.getElementById("listOfItems");
    const liTag = document.createElement("li");
    liTag.textContent = `${obj.amount} - ${obj.description} - ${obj.category} `;
    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'delete';
    deleteButton.onclick = (e) => deleteFunction(e, obj.id);
    function deleteFunction(e, obj_id) {
        const deletedObj = { obj_id }
        ulTag.removeChild(liTag);
        const token = localStorage.getItem('accessToken')
        axios.post('/delete-expense', deletedObj, { headers: { "Authorization": token } })
    }
    liTag.appendChild(deleteButton);
    ulTag.appendChild(liTag);
}

// payment method..............

    document.getElementById('rzp-button1').onclick = async function (e) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('/purchaseMemberShip', { headers: { "Authorization": token } })
            console.log("response:", response.data.order);
            var options =
            {
                "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
                "order_id": response.data.order.id,// For one time payment
                "handler": async function (response) { // This handler function will handle the success payment
                    const res = await axios.post('/updatetransactionstatus', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, { headers: { "Authorization": token } })
                    console.log("options.handler :", options.handler);
                    console.log('options :', options);
                    alert("Premium Membership Successful Buy . Login Again!");
                    window.location.href = "/";
                    

                    // localStorage.setItem("isPremium",);
                    showPremium()
                },
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();

            rzp1.on("payment.failed", async function (response) {
                try {
                    const res = await axios.post("/updatetransactionstatus",
                        {
                            order_id: options.order_id,
                            payment_failed: true,
                        }, { headers: { Authorization: token } });
                    console.log(res);
                    alert("Something went wrong");
                } catch (error) { console.log(error) }
            });
        } catch (err) { console.log(err) }
    }


function showPremium() {
    document.getElementById("rzp-button1").style.visibility = "hidden";
    document.getElementById("message").innerHTML = "Premium User &#128081";
}

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window.atob(base64).split("").map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join("")
    );
    return JSON.parse(jsonPayload);
}

function showLeaderBoard() {
    const inputElement = document.createElement('input');
    inputElement.type = 'button';
    inputElement.value = 'Show LeaderBoard';
    inputElement.onclick = async () => {
        const token = localStorage.getItem('accessToken');
        const userLeaderBoardArray = await axios.get('/showLeaderBoard',
            { headers: { Authorization: token } })
        var leaderBoardElement = document.getElementById('leaderboard');
        leaderBoardElement.innerHTML += '<h1>Leader Board Element</h1>'

        userLeaderBoardArray.data.forEach((userData) => {
            leaderBoardElement.innerHTML += ` <li> Name - ${userData.name} Total Expense - ${userData.totalExpenses} </li>`
        });
    }
    document.getElementById('message').appendChild(inputElement);
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);
async function logout() {
    try {
        localStorage.clear();
        window.location.href = "/";
    } catch (error) { console.log(error); }
}