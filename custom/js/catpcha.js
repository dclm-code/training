/**
 * MIT License https://opensource.org/licenses/mit-license.php
 * Author Arvind Ravulavaru
 */

// https://stackoverflow.com/a/23925102/1015046
! function() {
    // https://caniuse.com/#search=const
    const Captcha = {
        init: function() {
            this.captchaCntr = document.getElementById('captcha');
            // No Container No Captcha
            if (!this.captchaCntr) {
                return;
            }

            this.canvas = document.createElement('canvas');
            this.input = document.createElement('input');

            this.setupCanvas();
            this.setupTB();

            this.generatePasscode();
            this.setPasscode();

            this.render();
        },
        setupCanvas: function() {
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.captchaCntr.clientWidth;
            this.canvas.height = 75;
        },
        setupTB: function() {
            this.input.type = 'text';
            this.input.className = 'input';
            this.input.placeholder = 'Enter Captcha';
            this.bindTBEvents();
        },
        bindTBEvents: function() {
            const that = this;
            const successEvt = new Event('captcha.success');
            const failedEvt = new Event('captcha.failed');

            this.input.onkeyup = function() {
                if (this.value === that.passcode) {
                    that.captchaCntr.dispatchEvent(successEvt);
                } else {
                    that.captchaCntr.dispatchEvent(failedEvt);
                }
            }
        },
        generatePasscode: function() {
            // https://stackoverflow.com/a/8084248/1015046
            const passcode = Math.random().toString(36).substring(7);
            // If epoch timestamp is even, we convert all the alphabets
            // in string to lowercase, else uppercase. - Some air of mystery
            // https://stackoverflow.com/a/36056672/1015046
            this.passcode = (+new Date()) % 2 === 0 ? passcode.toLowerCase() : passcode.toUpperCase();
        },
        randomColor: function() {
            // https://stackoverflow.com/a/7665485/1015046
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        skinText: function(str, x, y) {
            // https://stackoverflow.com/a/7665485/1015046
            for (var i = 0; i <= str.length; ++i) {
                var ch = str.charAt(i);
                this.ctx.fillStyle = this.randomColor();
                this.ctx.fillText(ch, x, y);
                x += this.ctx.measureText(ch).width;
            }
        },
        setPasscode: function() {
            this.ctx.font = '48px serif';
            this.skinText(this.passcode, 50, 50);
        },
        render: function() {
            this.captchaCntr.appendChild(this.canvas);
            this.captchaCntr.appendChild(this.input);
        }
    }

    // Init Captcha
    Captcha.init();
}();