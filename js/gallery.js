// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
  tokens,
  re = /[?&]?([^=]+)=([^&]*)/g;
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

var $_GET = getQueryParams(document.location.search);
console.log($_GET["fname"]); // would output "John"

function GalleryImage(location, description, date, img) {
  this.location = location;
  this.description = description;
  this.date = date;
  this.img = img;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}



// Counter for the mImages array
var mCurrentIndex = 0;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '../images.json';

if (typeof $_Get !== 'undefined'){
  mUrl = '../' + $_Get["fname"];
} 

// Array holding GalleryImage objects (see below).
var mImages = [];


// Holds the retrived JSON information
var mJson;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function(){
  if (mRequest.readyState == 4 && mRequest.status == 200){
    try {
      mJson = JSON.parse(mRequest.responseText);
      console.log(mJson);
      
      for (var i = 0; i < mJson.images.length; i++){
        var myLine = mJson.images[i];
        var myImg = new GalleryImage(myLine.imgLocation, myLine.description, myLine.date, myLine.imgPath);
        mImages.push(myImg);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
}
mRequest.open("GET", mUrl, true);
mRequest.send();

console.log(mImages);

function swapPhoto() {
  //$("#slideShow")
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
  if (mCurrentIndex === mImages.length){
    mCurrentIndex = 0;
  }
  $("#photo").attr("src", mImages[mCurrentIndex].img);
  mCurrentIndex++;
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
  //have the more indicator button clickable
  $('.moreIndicator').click(function(){
    $('.details').eq(0).toggle();
    $(this).toggleClass("rot90");
    $(this).toggleClass("rot270");
  });
  
  $('#nextPhoto').click(function(){
    mCurrentIndex += 1;
    swapPhoto();
  });
  
  $('#prevPhoto').click(function(){
    mCurrentIndex -= 1;
    if (mCurrentIndex  < 0){
      mCurrentIndex = mImages.length;
    }
    swapPhoto();
  });
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

