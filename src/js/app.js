var UI = require('ui');
var Vector2 = require('vector2');

// More efficient than pebble.js's own function :)
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Numekeyboard
function T3K() {
	// For accesing the Object from inside its methods
    var t3k = this;
	// Change keyboard options
    var changeKeys = function(up, mid, down) {
        t3k.UI.bUp.text.remove();
        t3k.UI.bMid.text.remove();
        t3k.UI.bDown.text.remove();
        t3k.UI.bUp.text.text(up);
        t3k.UI.bMid.text.text(mid);
        t3k.UI.bDown.text.text(down);
        console.log(up.length);
        if (up.length == 1) {
            t3k.UI.bUp.text.position(new Vector2(119, 5));
        } else {
            t3k.UI.bUp.text.position(new Vector2(119, -5));
        }
        if (mid.length < 4) {
            t3k.UI.bMid.text.position(new Vector2(119, 64));
        } else {
            t3k.UI.bMid.text.position(new Vector2(119, 54));
        }
        if (down.length == 1) {
            t3k.UI.bDown.text.position(new Vector2(119, 123));
        } else {
            t3k.UI.bDown.text.position(new Vector2(119, 113));
        }
        t3k.UI.window.add(t3k.UI.bUp.text);
        t3k.UI.window.add(t3k.UI.bMid.text);
        t3k.UI.window.add(t3k.UI.bDown.text);
    };
	// Set value for target
	var setValue = function(number){
		var index = t3k.UI.values[t3k.target].index();
		t3k.UI.values[t3k.target].remove();
		t3k.UI.values[t3k.target].text(number);
		t3k.UI.window.insert(index,t3k.UI.values[t3k.target]);
	};
	// UI elements
    this.UI = {
        window: new UI.Window({
            backgroundColor: 'white',
            fullscreen: true
        }), // Window
        bUp: {
            button: new UI.Rect({
                size: new Vector2(30, 50),
                position: new Vector2(114, 0),
                backgroundColor: 'black'
            }),
            text: new UI.Text({
                text: '<',
                font: 'gothic-24-bold',
                textAlign: 'center',
                color: 'white',
                position: new Vector2(119, 5),
                size: new Vector2(25, 25)
            })
        },
        bMid: {
            button: new UI.Rect({
                size: new Vector2(30, 50),
                position: new Vector2(114, 59),
                backgroundColor: 'black'
            }),
            text: new UI.Text({
                text: '+',
                font: 'gothic-24-bold',
                textAlign: 'center',
                color: 'white',
                position: new Vector2(119, 64),
                size: new Vector2(25, 25)
            })
        },
        bDown: {
            button: new UI.Rect({
                size: new Vector2(30, 50),
                position: new Vector2(114, 118),
                backgroundColor: 'black'
            }),
            text: new UI.Text({
                text: '>',
                font: 'gothic-24-bold',
                textAlign: 'center',
                color: 'white',
                position: new Vector2(119, 123),
                size: new Vector2(25, 25)
            })
        },
        values: [
            new UI.Text({
                text: '0',
                font: 'bitham-42-bold',
                textAlign: 'center',
                color: 'black',
                position: new Vector2(1, 54),
                size: new Vector2(30, 28)
            }),
            new UI.Text({
                text: '0',
                font: 'bitham-42-light',
                textAlign: 'center',
                color: 'black',
                position: new Vector2(29, 54),
                size: new Vector2(30, 28)
            }),
            new UI.Text({
                text: '0',
                font: 'bitham-42-light',
                textAlign: 'center',
                color: 'black',
                position: new Vector2(56, 54),
                size: new Vector2(30, 28)
            }),
            new UI.Text({
                text: '0',
                font: 'bitham-42-light',
                textAlign: 'center',
                color: 'black',
                position: new Vector2(83, 54),
                size: new Vector2(30, 28)
            })
        ]
    };
	// Current machine state
    this.state = 0;
	// Targeted value
    this.target = 0;
    this.keyUp = function() {
        switch (t3k.state) {
            case 0: // Move target left
                t3k.UI.values[t3k.target].remove();
                t3k.UI.values[t3k.target].font('bitham-42-light');
                t3k.UI.window.add(t3k.UI.values[t3k.target]);
                t3k.target = mod(t3k.target - 1, 4);
                t3k.UI.values[t3k.target].remove();
                t3k.UI.values[t3k.target].font('bitham-42-bold');
                t3k.UI.window.add(t3k.UI.values[t3k.target]);
                break;
            case 1: // 0 1 2
                changeKeys('0', '1', '2');
                t3k.state = 2;
                break;
            case 2: // Place 0
                changeKeys('<', '+', '>');
				setValue('0');
                t3k.state = 0;
                break;
            case 3: // Place 3
                changeKeys('<', '+', '>');
				setValue('3');
                t3k.state = 0;
                break;
            case 4: // Place 7
                changeKeys('<', '+', '>');
				setValue('7');
                t3k.state = 0;
                break;
            case 5: // Place 4
                changeKeys('<', '+', '>');
				setValue('4');
                t3k.state = 0;
                break;
            case 6: // End state
				console.log('Pitfall!');
                break;
            default:
                // Dead code
				console.log('Something went wrong, defUp');
        }
    };
    this.keyMid = function() {
        switch (t3k.state) {
            case 0: // Show numbers
                changeKeys('0 1\n2', '3 4\n5 6', '7 8\n9');
                t3k.state = 1;
                break;
            case 1: // 3 4 5 6
                changeKeys('3', '4 5', '6');
                t3k.state = 3;
                break;
            case 2: // Place 1
                changeKeys('<', '+', '>');
				setValue('1');
                t3k.state = 0;
                break;
            case 3: // 4 5
                changeKeys('4', '', '5');
                t3k.state = 5;
                break;
            case 4: // Place 8
                changeKeys('<', '+', '>');
				setValue('8');
                t3k.state = 0;
                break;
            case 5: // Nothing
                break;
            case 6: // End state
				console.log('Pitfall!');
                break;
            default:
                // Dead code
				console.log('Something went wrong, defMid');
        }
    };
    this.keyDown = function() {
        switch (t3k.state) {
            case 0: // Move target right
                t3k.UI.values[t3k.target].remove();
                t3k.UI.values[t3k.target].font('bitham-42-light');
                t3k.UI.window.add(t3k.UI.values[t3k.target]);
                t3k.target = mod(t3k.target + 1, 4);
                t3k.UI.values[t3k.target].remove();
                t3k.UI.values[t3k.target].font('bitham-42-bold');
                t3k.UI.window.add(t3k.UI.values[t3k.target]);
                break;
            case 1: // 7 8 9
                changeKeys('7', '8', '9');
                t3k.state = 4;
                break;
            case 2: // Place 2
                changeKeys('<', '+', '>');
				setValue('2');
                t3k.state = 0;
                break;
            case 3: // Place 6
                changeKeys('<', '+', '>');
				setValue('6');
                t3k.state = 0;
                break;
            case 4: // Place 9
                changeKeys('<', '+', '>');
				setValue('9');
                t3k.state = 0;
                break;
            case 5: // Place 5
                changeKeys('<', '+', '>');
				setValue('5');
                t3k.state = 0;
                break;
            case 6: // End state
				console.log('Pitfall!');
                break;
            default:
                // Dead code
				console.log('Something went wrong, defDown');
        }
    };
	this.getValue = function(){
		return t3k.UI.values[0].text() + t3k.UI.values[1].text() + t3k.UI.values[2].text() + t3k.UI.values[3].text();
	};
    this.prepare = function() {
        t3k.UI.window.add(t3k.UI.bUp.button);
        t3k.UI.window.add(t3k.UI.bUp.text);
        t3k.UI.window.add(t3k.UI.bMid.button);
        t3k.UI.window.add(t3k.UI.bMid.text);
        t3k.UI.window.add(t3k.UI.bDown.button);
        t3k.UI.window.add(t3k.UI.bDown.text);
        t3k.UI.window.add(t3k.UI.values[0]);
        t3k.UI.window.add(t3k.UI.values[1]);
        t3k.UI.window.add(t3k.UI.values[2]);
        t3k.UI.window.add(t3k.UI.values[3]);

        t3k.UI.window.on('click', 'up', t3k.keyUp);
        t3k.UI.window.on('click', 'select', t3k.keyMid);
        t3k.UI.window.on('click', 'down', t3k.keyDown);
		t3k.UI.window.on('longClick', 'select', function(){
			new UI.Card({
				title: t3k.getValue(),
				body: 'That\'s what you got'
			}).show();
		});
    };
    this.show = function() {
        t3k.UI.window.show();
    };
}
var t = new T3K();

// Welcome
var welcomeCard = new UI.Card({
	title: "NumKeyboard",
	body: 'Demo for a 4 digit num keyboard in pebble.js\nSrc aviable at my GitHub: iAbadia\n\nClick to continue...'
});
welcomeCard.show();
welcomeCard.on('click', function(){
	t.prepare();
	t.show();
	welcomeCard.hide();
});