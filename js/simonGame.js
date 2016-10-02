var stop = false;
var Game = function() {
    var green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    this.sequence = [];
    this.user = [];
    this.round = 0;
    var sequence = this.sequence;
    var user = this.user;
    var round = this.round;
    this.isActive = true;
    this.part = "start";
    this.play = function() {
        this.part = "active";
        stop = false;
        this.addRound();
    }
    this.addRound = function() {
        this.random();
        round += 1;
        $('.round').html('<p>' + round + '</p>');
        user = sequence.slice(0);
        this.flash(sequence);
    }
    this.log = function(panel) {
        var wanted = user.shift();
        var given = $(panel.target).data("panel");
        this.isActive = (wanted === given);
        this.check();
    }
    this.check = function() {
        if (user.length === 0 && this.isActive) {
            this.turnOff();
            this.addRound();
        }
        else if (!this.isActive) {
            this.turnOff();
            this.part = "end";
            if ($('.reset').hasClass('active') === false) {
                $('.banner').html('<h2> You lasted ' + (round - 1) + ' rounds!</h2>');
                console.log("If you see the banner reset should be inactive.");
            }
        }
    }
    this.flash = function(arr) {
        var i = 0;
        var $this = this;
        var interval = setInterval(function() {
            $this.sound(arr[i]);
            $this.light(arr[i]);
            i++;
            if (stop === true) {
                arr = [];
            }
            if (i >= arr.length) {
                clearInterval(interval);
                $this.turnOn();
            }
        }, 900);
    }
    this.light = function(num) {
        var $panel = $('[data-panel="' + num + '"]');
        if ($panel.hasClass('green')) {
            $panel.addClass("greenActive");
        }
        else if ($panel.hasClass('red')) {
            $panel.addClass("redActive");
        }
        else if ($panel.hasClass('yellow')) {
            $panel.addClass("yellowActive");
        }
        else if ($panel.hasClass('blue')) {
            $panel.addClass("blueActive");
        }
        window.setTimeout(function() {
            if ($panel.hasClass('green')) {
                $panel.removeClass("greenActive");
            }
            else if ($panel.hasClass('red')) {
                $panel.removeClass("redActive");
            }
            else if ($panel.hasClass('yellow')) {
                $panel.removeClass("yellowActive");
            }
            else if ($panel.hasClass('blue')) {
                $panel.removeClass("blueActive");
            }
        }, 300);
    }
    this.sound = function(panel) {
        if (panel === 0) {
            green.play();
        }
        else if (panel === 1) {
            red.play();
        }
        else if (panel === 2) {
            yellow.play();
        }
        else {
            blue.play();
        }
    }
    this.turnOn = function() {
        var $this = this;
        $('.circle').on('click', '[data-panel]', function(pnl) {
            $this.log(pnl);
            if ($('.reset').hasClass('active') === true) {
                $('.reset').removeClass('active');
                console.log("I made banner inactive.");
            }
        });
        $('.panel').on('mousedown touchstart', function() {
            if ($(this).hasClass('green')) {
                $(this).addClass("greenActive");
                green.play();
            }
            else if ($(this).hasClass('red')) {
                $(this).addClass("redActive");
                red.play();
            }
            else if ($(this).hasClass('yellow')) {
                $(this).addClass("yellowActive");
                yellow.play();
            }
            else if ($(this).hasClass('blue')) {
                $(this).addClass("blueActive");
                blue.play();
            }
        });

        $('.panel').on('mouseup touchend', function() {
            if ($(this).hasClass('green')) {
                $(this).removeClass("greenActive");
            }
            else if ($(this).hasClass('red')) {
                $(this).removeClass("redActive");
            }
            else if ($(this).hasClass('yellow')) {
                $(this).removeClass("yellowActive");
            }
            else if ($(this).hasClass('blue')) {
                $(this).removeClass("blueActive");
            }
        });
    }
    this.turnOff = function() {
        $('.circle').off('click');
        $('.panel').off('mousedown');
        $('.panel').off('mouseup');
    }
    this.random = function() {
        sequence.push(Math.floor(Math.random() * (3 - 0 + 1) + 0));
    }
    this.reset = function() {
        if (this.part = "active") {
            stop = true;
            this.part = "end";
        }
    }
};

var Simon = {};

$('.play').click(function() {
    Simon.game = new Game();
    Simon.game.play();
    $('.banner').html('<h1> Repeat after me. </h1>');
});

$('.reset').click(function() {
    Simon.game.reset();
    $(this).addClass('active');
    console.log("I made banner active.");
});