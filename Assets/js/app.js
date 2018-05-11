var  things =[]
var searchTerm;
var btnsDiv= $("#buttons-here")
var resultsDiv = $("#results-here")
var gifLimif;

function getTheGif(){

    var apiKey= "LYN98rKmeVS0O88rAq9GO4ueFc5bwXyr";
    var queryUrl= "http://api.giphy.com/v1/gifs/random?tag="+searchTerm+ "&apikey="+apiKey
    
    $.ajax({
        url: queryUrl,
        method:"GET"
    }).then(function(response){

        var gifUrl= response.data.image_url
        var gifHolder= $("<div class='gif-holder'>")
        var theGif= $("<img class='gifs'>")
        theGif.attr("src",gifUrl)
        gifHolder.append(theGif)
        resultsDiv.prepend(gifHolder)
        console.log(searchTerm)
        console.log(response)
    })
    

}

$("#submit-search").on("click", function(event) {
    event.preventDefault();
    userInput= $("#search-input").val().trim();
    if ($("#limit-input").val()===""){
        gifLimit=6;
    }else{
        gifLimit= parseInt($("#limit-input").val().trim());
    }
    if (userInput===""){
        return;
    }
    things.push(userInput)
    appendBtns();
    $("#search-input").val("");
    searchTerm=userInput;
    resultsDiv.empty();
    for (i=1; i<=gifLimit; i++){
        getTheGif()
    }
    
    
});


function appendBtns(){
    btnsDiv.empty();
    for (i=0; i<things.length; i++){
        var gifBtn= $("<button class='gif-btn btn btn-outline-dark'>");
        gifBtn.text(things[i]);
        gifBtn.val(things[i]);
        btnsDiv.append(gifBtn)
    }

}
appendBtns();

$(document).on("click",".gif-btn", function(event){
    event.preventDefault();
    searchTerm=$(this).val()
    resultsDiv.empty();
    if ($("#limit-input").val()===""){
        gifLimit=6;
    }else{
        gifLimit= parseInt($("#limit-input").val().trim());
    }
    for (i=1; i<=gifLimit; i++){
     getTheGif()
    }

});