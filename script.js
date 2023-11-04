$(document).ready(function () {

    // Button click
    $("#twitter").click(function () {
        const twitterUrl = `https://twiter.com/intent/tweet?text=${actQuote.text} - ${actQuote.author}`
        window.open(twitterUrl, '_blank');
    });

    $("#new-quote").click(function () {
        newQuote();
    });

    // //Random int
    // function getRandomInt(max) {
    //     return Math.floor(Math.random() * max);
    // }

    //Show newQoute
    function newQuote() {
        loading();

        quote = "";
        author = "";


        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        const requestOptions = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/html; charset=ISO-8859-2', // Ustaw kodowanie znaków na ISO-8859-2 (inne niż UTF-8)
            }),
        };
        fetch(proxyUrl + '//www.deszczowce.pl/skrypty/losowy_cytat.php', requestOptions)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const decoder = new TextDecoder('ISO-8859-2');
                const data = decoder.decode(buffer);
                var quoteRegex = /<i>"(.*?)"<\/i>/;
                var match = quoteRegex.exec(data);
                quote = match ? match[1] : '';

                // Znalezienie autora za pomocą wyrażenia regularnego
                var authorRegex = /<b>(.*?)<\/b>/;
                match = authorRegex.exec(data);
                author = match ? match[1] : '';

                if (quote.length > 40) {
                    $("#quote-text").addClass("long-quote");
                } else {
                    $("#quote-text").removeClass("long-quote");
                }
                $("#author").text(author);
                $("#quote").text(quote);
                if(quote.length >10) {
                loaded();
                }else{
                    setTimeout(function() {
                        newQuote()
                    }, 2000); // Opóźnienie wynosi 2 sekundy (2000 milisekund)
                    
                }
            })
            .catch(error => {
                console.error('Błąd: ' + error);
            });            
    }

    // Get Quotes from API
    async function getQuotes() {
        loading();

        // loading();
        // const apiUrl = 'https://type.fit/api/quotes';
        // try {
        //     const response = await fetch(apiUrl);
        //     apiQuotes = await response.json();
        //     newQuote();
        // } catch {
        //     //Catch error
        // }
    }

    //Show Loading
    function loading() {
        $('#quoteContainer').hide();
        $('#loader').show();
    }

    // Hide loading
    function loaded() {
        $('#loader').hide();
        $('#quoteContainer').show();
    }
    //go one
    newQuote();

});
