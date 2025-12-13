let selectedAmount = null;
const predefinedAmounts = [5, 10, 20, 50, 100];

function generateAmountButtons() {
    const container = document.getElementById('amountButtons');
    container.innerHTML = '';

    predefinedAmounts.forEach(amount => {
        const btn = document.createElement('button');
        btn.className = 'amount-btn';
        btn.textContent = `$${amount}`;
        btn.onclick = () => selectAmount(amount);
        container.appendChild(btn);
    });
}

function selectAmount(amount) {
    selectedAmount = amount;
    document.getElementById('customAmount').value = '';

    document.querySelectorAll('.amount-btn')
        .forEach(btn => btn.classList.remove('selected'));

    event.target.classList.add('selected');
    updateDonateButton();
}

function handleCustomAmountChange() {
    const custom = document.getElementById('customAmount').value;
    if (custom) selectedAmount = null;

    document.querySelectorAll('.amount-btn')
        .forEach(btn => btn.classList.remove('selected'));

    updateDonateButton();
}

function updateDonateButton() {
    const custom = document.getElementById('customAmount').value;
    const txt = document.getElementById('donateButtonText');

    txt.textContent = selectedAmount
        ? `Donate $${selectedAmount}`
        : custom ? `Donate $${custom}` : 'Donate';
}

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function handleDonate() {
    const custom = parseFloat(document.getElementById('customAmount').value);
    const amount = selectedAmount || custom;

    if (!amount || amount <= 0) {
        showToast("Invalid amount", "error");
        return;
    }

    showToast(`Thank you for donating $${amount}!`);

    selectedAmount = null;
    document.getElementById('customAmount').value = '';
    updateDonateButton();

    document.querySelectorAll('.amount-btn')
        .forEach(btn => btn.classList.remove('selected'));
}

function initDonation() {
    generateAmountButtons();
    document.getElementById('customAmount')
        .addEventListener('input', handleCustomAmountChange);
}
