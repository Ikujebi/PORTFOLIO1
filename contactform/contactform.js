
document.addEventListener('DOMContentLoaded', function () {
  var contactForm = document.querySelector('form.contactForm');
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    var ferror = false;
    var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    // Get all form elements
    var formElements = contactForm.elements;

    for (var i = 0; i < formElements.length; i++) {
      var input = formElements[i];
      var rule = input.getAttribute('data-rule');

      if (rule !== null && rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':');
        var exp = pos >= 0 ? rule.substr(pos + 1) : '';

        rule = pos >= 0 ? rule.substr(0, pos) : rule;

        switch (rule) {
          case 'required':
            if (input.value.trim() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (input.value.length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(input.value)) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!input.checked) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(input.value)) {
              ferror = ierror = true;
            }
            break;
        }

        var validationMessage = ierror ? (input.getAttribute('data-msg') || 'Wrong Input') : '';
        var validationElement = input.nextElementSibling;
        validationElement.textContent = validationMessage;
        validationElement.style.display = ierror ? 'block' : 'none';
      }
    }

    if (ferror) return false;
    else {
      var formData = new FormData(contactForm);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/contact', true); // Replace with your backend URL
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = xhr.responseText;
            if (response === 'OK') {
              document.getElementById('sendmessage').classList.add('show');
              document.getElementById('errormessage').classList.remove('show');
              contactForm.reset();
            } else {
              document.getElementById('sendmessage').classList.remove('show');
              document.getElementById('errormessage').classList.add('show');
              document.getElementById('errormessage').textContent = response;
            }
          } else {
            console.error('Error:', xhr.status);
          }
        }
      };

      xhr.send(formData);

      return false;
    }
  });
});