var searchBoxHandler = (function (API) {

    var cardList = [];

    function render(list) {
        document.getElementById("_noResultContainer").classList.add("hidden")
        if (list && list.length === 0) {
            document.getElementById("_noResultContainer").classList.remove("hidden")
        }
        var cardsContainer = document.getElementById("cardsContainer");
        document.getElementById("cardsContainer").innerHTML = "";
        list.forEach(function(elem) {
            createCardElement(elem);
        }.bind(this))
    }

    function createCardElement(cardData) {
        var containerDiv, imageContainer,imageDiv, infoContainer, title, year, desc;

        containerDiv = document.createElement("div");
        containerDiv.classList.add("cardContainerDiv");
        
        imageContainer = document.createElement("div");
        imageContainer.classList.add("posterContainer");
        
        imageDiv = document.createElement("img");
        imageDiv.setAttribute("src", "../assets/img/posters/" + cardData.poster)
        
        infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer")

        title = document.createElement("div");
        title.classList.add("title")
        title.setAttribute("id", cardData.id)
        title.innerHTML = cardData.name

        year = document.createElement("div");
        year.classList.add("year")
        year.innerHTML = "(" + cardData.year + ")"

        desc = document.createElement("div");
        desc.classList.add("description")
        desc.innerHTML = cardData.description;

        infoContainer.appendChild(title)
        infoContainer.appendChild(year)
        infoContainer.appendChild(desc)

        imageContainer.appendChild(imageDiv);

        containerDiv.appendChild(imageContainer);
        containerDiv.appendChild(infoContainer);
        document.getElementById("cardsContainer").appendChild(containerDiv);
    }

    function addCards (cardData) {
        if (cardData.shows && cardData.shows.length>0) {
            cardData.shows.forEach(function (card) {
                cardList.push(new CardNode(card));
            }.bind(this));
        }

        render(cardList);
    }

    function handleSearchChange (input) {
        if (input === "") {
            render(cardList)
        }
        render(cardList.filter(function (item, index, object) {
            return item.name.toLowerCase().indexOf(input.target.value) >= 0;
        }.bind(this)));
    }

    function handleSeriesSelect (event) {
        if (event.target.classList.contains("title")) {
            document.getElementById("trailerDiv").classList.remove("hidden")
            cardSelected = cardList[parseInt(event.target.id)];
            API.getIMDBRating(cardSelected.imdbId, function(rating) {document.getElementById("_rating").innerHTML = rating})
            document.getElementById("_title").innerHTML = cardSelected.name
            document.getElementById("_year").innerHTML = "(" + cardSelected.year + ")";
            document.getElementById("_selectedImage").setAttribute("src", "../assets/img/posters/" + cardSelected.poster)
            document.getElementById("_description").innerHTML = cardSelected.description
            document.getElementById("_trailerIframe").setAttribute("src" , "https://www.youtube-nocookie.com/embed/" + cardSelected.trailer)
            document.body.scrollTop = document.getElementById("trailerDiv").offsetTop;
        }
    }

    function cancelTrailerDiv () {
        document.getElementById("trailerDiv").classList.add("hidden")

        document.body.scrollTop = 0;
    }

    function onLoad () {
        API.getData(addCards);
        document.getElementById("_searchBox").addEventListener("keydown", window.utility.debounce(500,handleSearchChange));
        document.getElementById("cardsContainer").addEventListener("click", handleSeriesSelect.bind(this));
        document.getElementById("_cancel").addEventListener("click", cancelTrailerDiv.bind(this));
    }

    function CardNode(data) {
        this.name = data.title;
        this.year = data.year;
        this.description = data.description;
        this.poster = data.poster;
        this.id = cardList.length;
        this.imdbId = data.imdbID;
        this.trailer = data.trailer;
    }

    onLoad();
})(this.API);