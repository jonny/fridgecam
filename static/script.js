
var camera = {

	takePhoto: function() {
		// document.location.href = './snap';
		$.ajax({
			url: "snap",
			context: document.body,
			dataType: "json",
			success: function(data) {
				// alert(data.timestamp);
				$("#takenAt").text("Taken at: "+ data.timestamp);
				$("#latestPic").attr("src", "./img/latest-pic.jpg?t=" + data.timestamp);
			}
		});
	}
};