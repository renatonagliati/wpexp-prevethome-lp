(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

jQuery( function( $ ) {

	jQuery(document).ready(function($){

        $(document).on('submit', 'form[name="form-contact-us"]', (e) => {
            e.preventDefault();

            let $submitButton = $(this).find('button[type="submit"]');
            let previousSubmitButtonText = $submitButton.text();
            $submitButton.text('Enviando...').prop('disabled', 'disabled');
            $('.show-after-form-submission-error').removeClass('d-block').addClass('d-none');

            // EmailJS
            var data = {
                service_id: 'service_3pllmmi',
                template_id: 'template_f0tronp',
                user_id: 'XX8Wgzavj8w66-fhh',
                template_params: {
                    'name': $('[name="name"]').val(),
                    'email': $('[name="email"]').val(),
                    'whatsapp': '+55' + $('[name="whatsapp"]').val(),
                }
            };
                
            $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).done(function() {
                $submitButton.text(previousSubmitButtonText).prop('disabled', false);
                $('.show-after-form-submission-ok').removeClass('d-none').addClass('d-block');
                $('.hide-after-form-submission-ok').removeClass('d-block').addClass('d-none');

                //gtag('event', 'conversion', {'send_to': 'AW-987551677/D7YQCKSAhLsZEL2v89YD'});
            }).fail(function(error) {
                $submitButton.text(previousSubmitButtonText).prop('disabled', false);
                $('.show-after-form-submission-error').removeClass('d-none').addClass('d-block');
                console.log('Oops... ' + JSON.stringify(error));
            });

        });

    });

});