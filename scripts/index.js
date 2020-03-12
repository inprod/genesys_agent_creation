const CHANGESET_ID = 83;  // To call a different changeset modify this value
const alertDialog = {
    message: 'You posted data successfuly',
    class: 'alert-success'
}

$(document).ready(function () {
    //enable popovers
    $(function () {
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        })
    });

    //bind validation rule to employee
    $("#employee-input").bind({
        keydown: function (e) {
            return !onlyAlphaNumeric(e.key);
        }
    });
    //bind validation rule to first_name
    $("#first-name-input").bind({
        keydown: function (e) {
            return !onlyAlphaNumeric(e.key);
        }
    });
    //bind validation rule to last_name
    $("#last-name-input").bind({
        keydown: function (e) {
            return !onlyAlphaNumeric(e.key);
        }
    });


    $('#form').submit((e) => {
        e.preventDefault();
        //custom implementation of form submit
        showLoading();
        //getting auth token
        $.ajax({
            type: 'POST',
            url: `api/admin/obtain-auth-token/`,
            data: {
                'username': $('#username-input')[0].value,
                'password': $('#password-input')[0].value
            }
        })
            .done((res) => {
                //executing update of agent on change set
                $.ajax({
                    type: 'PUT',
                    headers: {
                        'Authorization': `Token ${res.tokens.auth}`
                    },
                    url: `api/change-set/change-set/${CHANGESET_ID}/execute/`,
                    data: {
                        'first_name': $('#first-name-input')[0].value,
                        'last_name': $('#last-name-input')[0].value,
                        'employee': $('#employee-input')[0].value,
                        'team': $('#team-input')[0].value
                    }
                })
                    .done((res) => {
                        hideLoading();
                        if (res.data.attributes.successful) {
                          showAlertMessage('You posted data successfuly', 'SUCCESS');
                          clearInputFields();
                        } else {
                          showAlertMessage(res.data.attributes.description, 'DANGER');
                        }
                    })
                    .fail((e) => {
                        hideLoading();
                        showAlertMessage('Error occured', 'DANGER');
                    });
            })
            .fail((e) => {
                hideLoading();
                showAlertMessage('Error occured', 'DANGER');
            });
    });

    function showLoading() {
        $('#submit-button').text('Loading...');
        $('#submit-button').addClass('disabled');
    }

    function hideLoading() {
        $('#submit-button').text('Create');
        $('#submit-button').removeClass('disabled');
    }

    function showAlertMessage(message, type) {
        $('#alert-dialog').removeClass(alertDialog.class);
        switch (type) {
            case 'SUCCESS':
                alertDialog.class = 'alert-success';
                break;
            case 'WARNING':
                alertDialog.class = 'alert-warning';
                break;
            case 'DANGER':
                alertDialog.class = 'alert-danger';
                break;
        }
        $('#alert-dialog').addClass(alertDialog.class);
        alertDialog.message = message;
        $('#alert-message').text(alertDialog.message);
        $('#alert-dialog').show();
    }
});

function clearInputFields() {
    $('#username-input').val('');
    $('#password-input').val('');
    $('#first_name-input').val('');
    $('#last_name-input').val('');
    $('#employee-input').val('');
    $('#team-input').prop("selectedIndex", 0);
}

function onlyAlphaNumeric(string) {
    return /[^a-zA-Z0-9\/]/.test(string);
}
