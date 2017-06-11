var API = (function () {
    function getIMDBRating (id, callback) {
        var xmlhttp = new XMLHttpRequest(),
            url = "http://www.omdbapi.com/?i=" + id;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var result = JSON.parse(xmlhttp.responseText);
                callback(result);
            } else if(xmlhttp.readyState === 4 && xmlhttp.status === 401) {
                callback("9.0");
            } else {
                console.log("error fetching imdb rating")
            }
        };
        
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function getData (callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "../data/data.json", true);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    callback(JSON.parse(allText));
                }
            }
        }
        rawFile.send(null);
    }

    return {
        getData: getData,
        getIMDBRating: getIMDBRating
    }
})()