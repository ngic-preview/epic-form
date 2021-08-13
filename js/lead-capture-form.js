var device, matchtype, campaign, keyword, adgroup, gclid;

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && re.test(email)) {
    $("#EmailErrorMessage").addClass('is-hidden')
    return true
  }
  $("#EmailErrorMessage").removeClass('is-hidden')
  return false
}

function validateZipCode(zipCode) {
  if (zipCode.length === 5 && /(\d{5})/.test(zipCode)) {
    $("#ZipErrorMessage").addClass('is-hidden')
    return true
  }
  $("#ZipErrorMessage").removeClass('is-hidden')
  return false
}

function validatePhone(phone) {
  if (phone.length === 10 && /(\d{10})/.test(phone)) {
    $("#PhoneErrorMessage").addClass('is-hidden')
    return true
  }
  $("#PhoneErrorMessage").removeClass('is-hidden')
  return false
}

function validateInputs() {
  return validateEmail($("#Email").val()) && validateZipCode($("#ZipCode").val()) && validatePhone($("#PhoneNumber").val())
}

function createZIFLead() {
  if (!validateInputs()) return
  var postValues = {
    FirstName: $("#FirstName").val(),
    LastName: $("#LastName").val(),
    PhoneNumber: $("#PhoneNumber").val(),
    ZipCode: $("#ZipCode").val(),
    Email: $("#Email").val(),
    LeadSourceKey: "8c6e1730-9ed0-4e0e-adfc-6bfa66ca01a7",
    APIUserName: "isalesmanager",
    APIPassword: "isalesmanagerLive=#1!",
    APIWebLeadId: "47656",
    O65LeadSourceKey: "51b76113-7348-4c33-8ad2-c597a4b7d5d9",
    O65APIUserName: "healthcompare",
    O65APIPassword: "healthcompareLive=#1!",
    O65APIWebLeadId: "42361",
    PlanType: "1",
    TrackingKey_01 : device,
    TrackingKey_02 : matchtype,
    TrackingKey_03 : campaign,
    TrackingKey_04 : keyword,
    TrackingKey_05: adgroup,
    TrackingKey_10: gclid,
    Age: "U65"
  };

  $.ajax({
    url: "https://dataservices.velapoint.com/AgentCubed/CreateZIFLead",
    type: "post",
    data: postValues,
    success: function (result) {
      if (result.TrackingGUID) {
        $("#SuccessMessage").removeClass("is-hidden")
        $("#SubmitButton").prop("disabled", true)
      }
    },
    error: function () {
        alert("There was a problem processing your request.  Please try again.");
    }
  });

  return false;
}