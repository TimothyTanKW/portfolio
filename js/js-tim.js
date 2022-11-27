// <!-- Ajax submission -->
$('#ltlk-frm').submit(function (e) {
	$('#status').show();// <!-- Submit button pending -->

	$('#btn-text').hide();
	e.preventDefault();
	var valid;
	valid = $("#ltlk-frm").valid();
	if (valid) {
	  var name = $("#name").val();  
	  var email = $("#email").val();
	  var message = $("#message").val();

  
	  $.ajax({
		type: "POST",
		dataType: "json",
		url: "ttcontactengine.php",
		data: "name=" + name + "&email=" + email + "&message=" + message,
		success: function (response) {
		  if (response.data == "success") {
			$("#name").val("");
			$("#email").val("");
			$("#message").val("");
			$('#loading-success').show();
			$('#status').hide();// <!-- Submit button stop pending -->
			$('#ltlk-frm').hide();
		  }
		},
		error: function () { }
	  });
	}
  
  });

// Hamburger
let menuToggle = document.querySelector(".toggle");
let menuContent = document.querySelector(".nvct-container");
menuToggle.onclick = function() {
  menuToggle.classList.toggle("active");
  menuContent.classList.toggle("nvct-active");
}

// Headline change
let i = 0;

const randomizeText = () => {
	const phrase = document.querySelector('.random-word');
	const compStyles = window.getComputedStyle(phrase);
	const animation = compStyles.getPropertyValue('animation');
	const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;

	const phrases = ['A FURTHER HORIZON', 'A GREAT ADVENTURE', 'A NEW FRONTIER', 'A NEW PERSEPCTIVE', 'A RENEWED ASPIRATION' , 'A NEWFOUND AMBITION'];

	i = randomNum(i, phrases.length);
	const newPhrase = phrases[i];

	setTimeout(() => {
		phrase.textContent = newPhrase;
	}, 400); // time to allow opacity to hit 0 before changing word
}

const randomNum = (num, max) => {
	let j = Math.floor(Math.random() * max);

	// ensure diff num every time
	if (num === j) {
		return randomNum(i, max);
	} else {
		return j;
	}
}

const getAnimationTime = () => {
	const phrase = document.querySelector('.random-word');
	const compStyles = window.getComputedStyle(phrase);
	let animation = compStyles.getPropertyValue('animation');

	// firefox support for non-shorthand property
	animation != "" ? animation : animation = compStyles.getPropertyValue('-moz-animation-duration');

	// webkit support for non-shorthand property
	animation != "" ? animation : animation = compStyles.getPropertyValue('-webkit-animation-duration');


	const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
	return animationTime;
}

randomizeText();
setInterval(randomizeText, getAnimationTime());




// init ScrollMagic controller
var controller = new ScrollMagic.Controller();

//to light up the beacon heading and stop point
$('.prgs-inner').each(function () {
	var beaconinnerScene = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .6
	})
		.setTween(TweenMax.fromTo(this, 1, { css: { background: "#ccc" } }, { css: { background: "#30c2ff" } }))
		.addTo(controller);
});

$('.prgs-outer').each(function () {
	var beaconouterScene = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .6
	})
		.setTween(TweenMax.fromTo(this, 1, { css: {  border: "2px solid #ccc" } }, { css: {  border: "2px solid transparent" } }))
		//.addIndicators()
		.addTo(controller);
});



//For the reading progress
$('.prgs-gutter').each(function () {
	var readingProgress = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .6,
		duration: $(this).height()
	})
		.setTween(TweenMax.fromTo(this, 1, { css: { height: "0%" } }, { css: { height: "100%" } }))
		//.addIndicators()
		.addTo(controller);
});


//For progress arrow
$('.prgs-arrow').each(function () {
	var progressArrow = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .6
	})
		.setTween(TweenMax.fromTo(this, 1, { css: { background: "#ccc" } }, { css: { background: "#30fffd" , border: "2px solid #30fffd"  } }))
		//.addIndicators()
		.addTo(controller);
});

//Let'S CHAT colour change
$('.ltlk-header').each(function () {
	var progressArrow = new ScrollMagic.Scene({
		triggerElement: this,
		triggerHook: .6
	})
		.setTween(TweenMax.fromTo(this, 1, { css: { color: "#fff" } }, { css: { color: "rgb(48, 255, 253)" } }))
		//.addIndicators()
		.addTo(controller);
});


// Hidden Cards
let wkxpBtn = document.querySelector(".wkxp-btn");
let wkxpShow = document.querySelector(".wkxp-hidden");
wkxpBtn.onclick = function() {
	wkxpShow.classList.toggle("wkxp-active");
	wkxpBtn.classList.add("wkxp-hide");
}




