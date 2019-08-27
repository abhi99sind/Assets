
    var element = document.getElementById('carousel-innerss');
    var positionInfo = element.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;

    document.getElementById("Preview_Gallery").style.width = width + "px"; 

    console.log(width);

