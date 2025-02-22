// Check if user is logged in (dummy check for now)
const isLoggedIn = false; // Change to true after login

const dashboardBtn = document.getElementById('dashboardBtn');
const loginBtn = document.getElementById('loginBtn');
document.getElementById('loginForm').addEventListener('submit', function(event){
  event.preventDefault();
  window.location.href='dashboard.html';
});

document.getElementById('signupForm').addEventListener('submit', function(event){
  event.preventDefault();
  window.location.href='login.html';
});

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
    document.getElementById('preview-business').textContent = document.getElementById('business-type').value;
    document.getElementById('preview-due-date').textContent = document.getElementById('due-date').value;
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