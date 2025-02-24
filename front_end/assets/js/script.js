// Check if user is logged in (dummy check for now)
const isLoggedIn = false; // Change to true after login

const dashboardBtn = document.getElementById('dashboardBtn');
const loginBtn = document.getElementById('loginBtn');

// dashboardBtn.addEventListener('click', (e) => {
//   if (!isLoggedIn) {
//     e.preventDefault();
//     alert('Please log in to access the Dashboard.');
//   }
// });

// loginBtn.addEventListener('click', () => {
//   isLoggedIn = true; // Simulate login
//   alert('You are now logged in!');
// });

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  let currentPhase = 1;
  let selectedMethod = '';

  function showLoanApplication() {
    document.getElementById('loan-application-overlay').style.display = 'block';
    resetApplication();
  }

  function hideLoanApplication() {
    document.getElementById('loan-application-overlay').style.display = 'none';
  }

  function nextPhase(phase) {
    console.log(`Moving to Phase: ${phase}`);
    currentPhase = phase;
    updatePhaseNodes();

    document.querySelectorAll('.phase-content').forEach((content) => {
      content.classList.remove('active');
    });

    const phaseContent = document.getElementById(`phase-${phase}-content`);
    if (phaseContent) {
      phaseContent.classList.add('active');
    }

    // If transitioning to Phase 4, populate preview
    if (phase === 4) {
      populatePreview();
    }
  }

  function updatePhaseNodes() {
    document.querySelectorAll('.phase-node').forEach((node, index) => {
      if (index + 1 < currentPhase) {
        node.classList.add('completed');
      } else if (index + 1 === currentPhase) {
        node.classList.add('active');
      } else {
        node.classList.remove('active', 'completed');
      }
    });
  }

  function selectMethod(method) {
    selectedMethod = method;
    document.querySelectorAll('.method-card').forEach((card) => {
      card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
  }

  function populatePreview() {
    document.getElementById('preview-method').textContent = selectedMethod;
    document.getElementById('preview-name').textContent = `${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`;
    document.getElementById('preview-email').textContent = document.getElementById('email').value;
    document.getElementById('preview-income').textContent = document.getElementById('income').value;
    document.getElementById('preview-status').textContent = document.getElementById('status').value;
    document.getElementById('preview-score').textContent = document.getElementById('score').value;
    document.getElementById('preview-amount').textContent = document.getElementById('amount').value;
    document.getElementById('preview-purpose').textContent = document.getElementById('purpose').value;
    document.getElementById('preview-repayment').textContent = document.getElementById('repayment').value;
    document.getElementById('preview-collateral').textContent = document.getElementById('collateral').files[0]?.name || 'No file selected';
  }

  function submitApplication() {
    console.log("Submit Application called");

    // Hide the form content and show the success message
    document.getElementById("loan-application").style.display = "none";
    document.getElementById("application-success").style.display = "block";

    // Optionally, reset the form after a delay
    setTimeout(() => {
      hideLoanApplication(); // Close the overlay after 3 seconds
      resetApplication(); // Reset the form for future use
    }, 3000);
  }

  // Add to script.js
function submitLoanApplication() {
  const loanData = {
    method: selectedMethod,
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    income: document.getElementById('income').value,
    employmentStatus: document.getElementById('employment-status').value,
    creditScore: document.getElementById('credit-score').value,
    loanAmount: document.getElementById('loan-amount').value,
    loanPurpose: document.getElementById('loan-purpose').value,
    repaymentPeriod: document.getElementById('repayment-period').value,
  }};

  function resetApplication() {
    currentPhase = 1;
    updatePhaseNodes();

    // Reset all form fields
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("country").value = "";
    document.getElementById("kyc-photo").value = "";
    document.getElementById("business-type").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("collateral").value = "";

    // Reset phase content visibility
    document.querySelectorAll('.phase-content').forEach((content) => {
      content.classList.remove('active');
    });

    document.getElementById('phase-1-content').classList.add('active');

    // Ensure the form is visible and success message is hidden
    document.getElementById("loan-application").style.display = "block";
    document.getElementById("application-success").style.display = "none";
  }

  document.querySelector('.btn-apply')?.addEventListener('click', showLoanApplication);
  document.querySelector('.btn-close-overlay')?.addEventListener('click', hideLoanApplication);

  document.querySelectorAll('.btn-continue').forEach((button) => {
    button.addEventListener('click', () => nextPhase(currentPhase + 1));
  });

  document.querySelector('.btn-submit')?.addEventListener('click', submitApplication);

  const editButtons = document.querySelectorAll('.btn-edit');

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('Edit functionality will be added here.');
    });
  });

  const markReadButtons = document.querySelectorAll('.btn-mark-read');

  markReadButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const notification = button.closest('.notification');
      notification.style.opacity = '0.6';
      button.textContent = 'Read';
      button.disabled = true;
    });
  });

  const viewButtons = document.querySelectorAll('.btn-view');

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('View functionality will be added here.');
    });
  });

});

// Show the Repay Loan overlay
function showRepayLoan() {
  console.log('Show Repay Loan called'); // Debugging statement
  document.getElementById('repay-loan-overlay').style.display = 'block';
  resetRepayLoanForm();
}

// Hide the Repay Loan overlay
function hideRepayLoan() {
  console.log('Hide Repay Loan called'); // Debugging statement
  document.getElementById('repay-loan-overlay').style.display = 'none';
}

// Select repayment method
function selectRepaymentMethod(method) {
  console.log(`Selected Repayment Method: ${method}`); // Debugging statement
  document.getElementById('confirm-method').textContent = method;
}

// Validate repayment amount
function validateRepaymentAmount() {
  const amountInput = document.getElementById('repayment-amount');
  const errorMessage = document.getElementById('repayment-error');
  const maxAmount = 7500; // Example: Remaining balance

  if (amountInput.value > maxAmount) {
    errorMessage.textContent = `Amount cannot exceed $${maxAmount}`;
    return false;
  } else if (amountInput.value <= 0) {
    errorMessage.textContent = 'Amount must be greater than 0';
    return false;
  } else {
    errorMessage.textContent = '';
    return true;
  }
}

// Confirm repayment
function confirmRepayment() {
  if (validateRepaymentAmount()) {
    const amount = document.getElementById('repayment-amount').value;
    const method = document.getElementById('confirm-method').textContent;

    // Display success message
    document.getElementById('success-amount').textContent = amount;
    document.getElementById('repay-success').style.display = 'block';
    document.querySelector('.confirmation').style.display = 'none';
  }
}

// Reset Repay Loan form
function resetRepayLoanForm() {
  document.getElementById('repayment-amount').value = '';
  document.getElementById('repayment-error').textContent = '';
  document.getElementById('confirm-amount').textContent = '0';
  document.getElementById('confirm-method').textContent = 'Not selected';
  document.getElementById('repay-success').style.display = 'none';
  document.querySelector('.confirmation').style.display = 'block';
}

// Add event listener for Repay Loan button
const repayButton = document.querySelector('.btn-repay');
if (repayButton) {
  repayButton.addEventListener('click', showRepayLoan);
  console.log('Repay button event listener added'); // Debugging statement
} else {
  console.error('Repay button not found'); // Debugging statement
}

// Withdraw overlay
function showWithdrawOverlay() {
  document.getElementById('withdraw-overlay').style.display = 'block';
}

function hideWithdrawOverlay() {
  document.getElementById('withdraw-overlay').style.display = 'none';
}

document.getElementById('withdraw-amount').addEventListener('input', function () {
  const amount = this.value;
  const method = document.getElementById('withdraw-method').value;
  document.getElementById('confirm-withdraw-amount').textContent = amount;
  document.getElementById('confirm-withdraw-method').textContent = method;
});

document.getElementById('withdraw-method').addEventListener('change', function () {
  const amount = document.getElementById('withdraw-amount').value;
  const method = this.value;
  document.getElementById('confirm-withdraw-amount').textContent = amount;
  document.getElementById('confirm-withdraw-method').textContent = method;
});

function submitWithdrawRequest() {
  const amount = document.getElementById('withdraw-amount').value;
  const method = document.getElementById('withdraw-method').value;

  // Send withdrawal request to backend
  fetch('/api/withdraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, method }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Withdrawal request submitted:', data);
      hideWithdrawOverlay();
      alert('Withdrawal request submitted successfully!');
    })
    .catch((error) => {
      console.error('Error submitting withdrawal request:', error);
    });
}

function showInvestOverlay(loanId) {
  document.getElementById('invest-overlay').style.display = 'block';
  document.getElementById('invest-overlay').dataset.loanId = loanId;
  document.getElementById('invest-loan-id').textContent = loanId;
}

function hideInvestOverlay() {
  document.getElementById('invest-overlay').style.display = 'none';
}

document.getElementById('invest-amount').addEventListener('input', function () {
  const amount = this.value;
  const loanId = document.getElementById('invest-loan-id').textContent;
  document.getElementById('confirm-invest-amount').textContent = amount;
  document.getElementById('confirm-loan-id').textContent = loanId;
});

function submitInvestment() {
  const amount = document.getElementById('invest-amount').value;
  const loanId = document.getElementById('invest-overlay').dataset.loanId;

  // Send investment request to backend
  fetch('/api/invest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, loanId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Investment submitted:', data);
      hideInvestOverlay();
      alert('Investment submitted successfully!');
    })
    .catch((error) => {
      console.error('Error submitting investment:', error);
    });
}

// Fee deduction for the borrowers
document.getElementById('loan-amount').addEventListener('input', function () {
  const loanAmount = parseFloat(this.value) || 0; // Get loan amount or default to 0
  const platformFee = loanAmount * 0.02; // 2% platform fee
  const totalAmount = loanAmount + platformFee; // Total amount due

  // Update fee and total amount display
  document.getElementById('platform-fee').textContent = platformFee.toFixed(2);
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
});

// Fee deduction for the Investors
document.getElementById('invest-amount').addEventListener('input', function () {
  const investAmount = parseFloat(this.value) || 0; // Get investment amount or default to 0
  const transactionFee = investAmount * 0.01; // 1% transaction fee
  const totalDeducted = investAmount + transactionFee; // Total amount deducted

  // Update fee and total deducted display
  document.getElementById('transaction-fee').textContent = transactionFee.toFixed(2);
  document.getElementById('total-deducted').textContent = totalDeducted.toFixed(2);
});