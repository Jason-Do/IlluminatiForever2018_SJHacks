var selectedFile;
var t;

$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
});

function uploadFile()
{
	
	
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/toAnalyze/' + filename);
	var uploadTask = storageRef.put(selectedFile).then(function(snapshot) {
		console.log('Uploaded a blob or file!!!');
	});
	var postKey = firebase.database().ref('/Images/').push().key;
	var updates = {};
	var downloadURL = uploadTask.snapshot.downloadURL;
	var postData = {
		url: downloadURL
	};
	updates['/Images/' + postKey] = postData;
	firebase.database().ref().update(updates);
}