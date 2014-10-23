
var camera = {

	takePhoto: function() {
		// document.location.href = './snap';
		$.ajax({
			url: "snap",
			context: document.body,
			dataType: "json",
			success: function(data) {
				// alert(data.timeStamp);
				$("#takenAt").text("Taken at: "+ data.timeStamp);
				$("#latestPic").attr("src", "./img/latest-pic.jpg?t=" + new Date().getTime());
			}
		});
	}
};