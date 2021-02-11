// Sportify OAuth
var AUTH = (function () {
  var accessToken = "";

  var login = function (successCallback) {
    var CLIENT_ID = "1d866aedaaa94d53bb7909d33c324bf4";
    REDIRECT_URI = "https://request.kane.network/callback.html";

    function getLoginURL() {
      return (
        "https://accounts.spotify.com/authorize?client_id=" +
        CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&response_type=token&scope=user-read-playback-state%20user-modify-playback-state"
      );
    }

    window.addEventListener(
      "message",
      function (event) {
        var hash = JSON.parse(event.data);
        if (hash.type == "access_token") {
          setAccessToken(hash.access_token, hash.expires_in || 60);
          if (successCallback) {
            successCallback();
          }
        }
      },
      false
    );

    var width = 450,
      height = 730,
      left = screen.width / 2 - width / 2,
      top = screen.height / 2 - height / 2;

    w = window.open(
      getLoginURL(),
      "Spotify",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  var getAccessToken = function () {
    var expires = 0 + localStorage.getItem("pa_expires", "0");
    if (new Date().getTime() > expires) {
      return "";
    }
    var token = localStorage.getItem("pa_token", "");
    return token;
  };

  var setAccessToken = function (token, expires_in) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 1000 * expires_in);

    localStorage.setItem("pa_token", token);
    localStorage.setItem("pa_expires", expiresDate.getTime());
  };

  var isLoggedin = function () {
    return getAccessToken() !== "";
  };

  return {
    login: login,
    isLoggedin: isLoggedin,
    getAccessToken: getAccessToken,
  };
})();
