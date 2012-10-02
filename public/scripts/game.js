$(function() {
(function() {
var input, send, log, socket, username;

input = $("#chat-input");
send  = $("#chat-send");
log   = $("#chat-log");

scrollChat();

username = prompt('Username:');
if (!username) {
  return;
}

socket = io.connect('/');

socket.on('chat', function(data) {
  addEntry(data.user, data.text);
});

socket.on('login', function(user) {
  addLogin(user);
});

socket.on('logout', function(user) {
  addLogout(user);
});

socket.on('logged in', function(entries) {
  $.each(entries, function(i, entry) {
    if (entry.type === "login") {
      addLogin(entry.user);
    } else if (entry.type === "text") {
      addEntry(entry.user, entry.text);
    } else if (entry.type === "logout") {
      addLogout(entry.user);
    }
  });

  send.click(chat);

  input.keypress(function(e) {
    if (e.which === 13) {
      chat();
    }
  });

  input.removeAttr('disabled');

  addLogin(username);
});

socket.on('failed login', function(reason) {
  reason = span('chat-reason', reason);

  addItem('chat-fail', function(item) {
    item.append("Failed to login: ").append(reason);
  });
})

socket.emit('login', {
  user: username,
  count: log.children().length
});

function addLogin(user) {
  user = span('chat-user', user);

  addItem('chat-login', function(item) {
    item.append(user).append(" has logged in.");
  })
}

function addLogout(user) {
  user = span('chat-user', user);

  addItem('chat-logout', function(item) {
    item.append(user).append(" has logged out.");
  });
}

function addEntry(user, text) {
  user = span('chat-user', user);
  text = span('chat-text', text);

  addItem('chat-entry', function(item) {
    item.append(user).append(": ").append(text);
  });
}

function span(className, text) {
  return $("<span></span>").addClass(className).text(text);
}

function addItem(className, callback) {
  var item;

  item = $("<li></li>").addClass(className);
  callback(item);

  log.append(item);
  scrollChat();
}

function scrollChat() {
  var height;

  height = 0;
  $.each(log.children(), function(i, child) {
    height += $(child).outerHeight();
  });
  log.scrollTop(height);
}

function chat() {
  var text;

  text = input.val();

  if (text.replace(/\s/g, '') !== "") {
    addEntry(username, text);
    input.val("");

    socket.emit('chat', text);
  }
}
})();
(function() {
var canvas = $("#game")[0].getContext('2d');

draw();
canvas.moveTo(100, 100);
canvas.lineTo(200, 200);
canvas.stroke();

function draw(){
	drawHexagon(50, 50);

	function drawHexagon(x, y){
		var length = 25;

		canvas.fillStyle="#FF0000";
		canvas.moveTo(x, y);
		canvas.lineTo(x+length, y);
		canvas.lineTo(x+length+length/2, y+ length/(Math.sqrt(2)));
		canvas.lineTo(x+length, y+2*length/Math.sqrt(2));
		canvas.lineTo(x, y+2*length/Math.sqrt(2));
		canvas.lineTo(x - length/2, y + length/(Math.sqrt(2)));
		canvas.lineTo(x, y);
		canvas.stroke();
	}
}})();
});
