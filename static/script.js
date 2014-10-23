
var camera = {

	takePhoto: function() {
		// document.location.href = './snap';
		$.ajax({
			url: "snap",
			context: document.body,
			dataType: "json",
			success: function(data) {
				alert(data.timeStamp);
			}
		});
	}
};