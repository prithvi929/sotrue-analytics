export function generateUserIDs() {
  var userIDs = [];
  for (var j = 0; j < 330; j++) {
    var userID = "U";
    for (var i = 0; i < 10; i++) {
      userID += Math.floor(Math.random() * 10);
    }
    userIDs.push(userID);
  }
  return userIDs;
}
