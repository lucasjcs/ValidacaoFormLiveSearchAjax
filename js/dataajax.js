/**
 * Created by Lucas Jacinto on 9/06/2017.
 */

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jsonOptions = JSON.parse(request.responseText);
            jsonOptions.forEach(function (item) {
                var option = document.createElement('option');
                option.value = item;
                datalist.appendChild(option);
            });
        }
    };
// Set up and make the request.
    request.open('GET', 'elementos.json', true);
    request.send();
