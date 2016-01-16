var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    //  A simple background for our game
    this.sky = this.game.add.sprite(0, -10, 'sky');
    this.sky.scale.setTo(4,2.5);

    // The player and its settings
    this.playerGroup = this.game.add.group();
    this.player = this.playerGroup.create(247, 184, 'dude');
    this.player.visible = false;

    this.player.scale.setTo(0.8,0.8);
    this.player.inputEnabled = true;
    this.text = this.game.add.text(0, 0, "", { fontSize: '32px', fill: '#000' });
    this.text.anchor.set(0.5);
    this.text.alpha = 0;
    this.text.x = 660;
    this.text.y = 200;
    //this.player.input.useHandCursor = true; //if you want a hand cursor
    //this.player.events.onInputOver.add(this.hoverIn, this);
    //this.player.events.onInputOut.add(this.hoverOut, this);
    this.player.frame = 4;
    this.player2 = this.playerGroup.create(315, 184, 'dude');
    this.player2.scale.setTo(0.8,0.8);
    this.player2.inputEnabled = true;
    this.player2.frame = 27;
    this.player2.visible = false;
    this.ui = this.game.add.sprite(0, 0, 'ui');
    this.ui.visible = false;


    this.sorceress = this.game.add.sprite(30, 110, 'sorceress');
    this.warrior = this.game.add.sprite(570, 310, 'warrior');
    this.priest = this.game.add.sprite(150, 410, 'priest');

    this.timer = 0;
    //  The score
    this.titleText = this.game.add.text(336, 16, 'Sorceress', { fontSize: '32px', fill: '#FF4545' });
    this.scoreText = this.game.add.text(160, 106, 
        'You are the mighty sorceress.\n' +
        'Well, you might become mighty one day,\nbut you are not mighty yet.\n\n' +
        'In fact, you are out on your first adventure.\n\n' +
        'In your party you have:\n\n' + 'Tjekka5 the mighty swordsman: ' +
        '\n\n\n\n               And Tegu, the priest\n' +
                '               with mystic healing powers:'
        , { fontSize: '20px', fill: '#000' });
    this.score = 0;
    this.button = this.game.add.sprite(300, 520, 'button');
    this.buttonText = this.game.add.text(320, 536, 'Click to proceed', { fontSize: '20px', fill: '#000' });

    this.button.inputEnabled = true;
    this.button.input.useHandCursor = true; //if you want a hand cursor

    this.button.events.onInputDown.add(this.skip, this);

    this.attackButton = this.game.add.sprite(50, 250, 'actionButton');
    this.attackButton.inputEnabled = true;
    this.attackButton.input.useHandCursor = true; //if you want a hand cursor
    this.attackButtonText = this.game.add.text(110, 285, 'Attack', { fontSize: '20px', fill: '#000' });
    this.attackButton.visible = false;
    this.attackButtonText.visible = false;
    this.attackButton.events.onInputDown.add(this.attack, this);


    this.spellButton = this.game.add.sprite(300, 250, 'actionButton');
    this.spellButton.inputEnabled = true;
    this.spellButton.input.useHandCursor = true; //if you want a hand cursor
    this.spellButtonText = this.game.add.text(335, 285, 'Cast spell', { fontSize: '20px', fill: '#000' });
    this.spellButton.visible = false;
    this.spellButtonText.visible = false;
    this.spellButton.events.onInputDown.add(this.spell, this);

    this.itemButton = this.game.add.sprite(550, 250, 'actionButton');
    this.itemButton.inputEnabled = true;
    this.itemButton.input.useHandCursor = true; //if you want a hand cursor
    this.itemButtonText = this.game.add.text(595, 285, 'Use item', { fontSize: '20px', fill: '#000' });
    this.itemButton.visible = false;
    this.itemButtonText.visible = false;
    this.itemButton.events.onInputDown.add(this.item, this);

/*
        this.sorceress.x = 550;
        this.sorceress.y = 480;
        this.priest.x = 300;
        this.priest.y = 480;
        this.warrior.x = 50;
        this.warrior.y = 480;
*/

    this.skipButton = this.game.add.sprite(660, 380, 'skip');
    this.skipButton.inputEnabled = true;
    this.skipButton.input.useHandCursor = true; //if you want a hand cursor
    this.skipButton.events.onInputDown.add(this.nextStep, this);
    this.skipButtonText = this.game.add.text(680, 396, 'Next', { fontSize: '20px', fill: '#000' });
    this.skipButton.visible = false;
    this.skipButtonText.visible = false;

    this.timePerStep = 400;

    this.justClicked = false;
    this.justClickedCountdown = 0;

    this.timerBox = this.game.add.sprite(450, 50, 'button');
    this.timerBoxText = this.game.add.text(460, 60, 'Time to skip: ', { fontSize: '20px', fill: '#000' });
    this.timerBox.visible = false;
    this.timerBoxText.visible = false;
    this.timeout = 0;
    this.nextTimeOut = 0;
  },

  actionOnClick: function (sprite, pointer) {

  },
  item: function (sprite, pointer) {
        this.titleText.text = "Choose your action below:" +
        "\n\n\n\nYou don't have any items";
  },

  spell: function (sprite, pointer) {
        this.fireball = this.game.add.sprite(0, 0, 'fireball');
        this.fireball.alpha = 0;

        var tween = this.game.add.tween(this.fireball).to( { alpha: 1 }, 200, Phaser.Easing.Bounce.Out, true);
      //  var tween = this.game.add.tween(this.fireball).to( { alpha: 1.0 }, 50, "Linear", true, 0, 4);
    //    tween.start();
         this.newText = this.game.add.text(200, 230, " Oh dear, what have you done! \n\n You have fireballed EVERYONE!\n\n                 GAME OVER", { fontSize: '20px', fill: '#000' });
  },

  attack: function (sprite, pointer) {
        this.titleText.text = "Choose your action below:" +
        '\n\n\n\n"I refuse to resort to physical violence ... I prefer magic"';
  },

  skip : function() {
    if (!this.pressed) {
        this.pressed = true;
        this.button.destroy();
        this.buttonText.destroy();
        this.scoreText.x = 170;
        this.scoreText.y = 500; 
        this.scoreText.text = "Tjekka5                     Tegu                         You";
 
        this.ui.visible = true;
        this.sorceress.x = 550;
        this.sorceress.y = 480;
        this.priest.x = 300;
        this.priest.y = 480;
        this.warrior.x = 50;
        this.warrior.y = 480;
        this.titleText.x = 50;
        this.titleText.y = 50;
        this.titleText.text = "You guys have been walking through this forest forever. \n\n" +
         "Atleast that's how it feels." 
        this.state = 0;
        this.timeForNextState = this.timer + this.timePerStep;
        this.skipButton.visible = true;
        this.skipButtonText.visible = true;

    }
  },
  nextStep: function() {
    this.timer = this.timeForNextState - 1;
  },
  nextState: function() {
    if (this.justClickedCountdown == 0) {
        this.justClickedCountdown = 20;
        this.state++;
        switch(this.state) {
            case 1:
                this.titleText.text = '"Hey... guys", you say,\n\n' +
                '"What the hell are we doing?"';
                break;
            case 2:
                this.titleText.text = '"We have been walking for ages,\n\n' +
                'and seen just about nothing interesting."';
                break;
            case 3:
                this.titleText.text = "Of course, just as you say that,\n\n" +
                "you are attacked by a band of screaming goblins!";
                break;
            case 4:
                this.titleText.text = "Choose your action below:";
                this.attackButton.visible = true;
                this.attackButtonText.visible = true;
                this.spellButton.visible = true; 
                this.spellButtonText.visible = true; 
                this.itemButton.visible = true;
                this.itemButtonText.visible = true;
                this.skipButton.visible = false;
                this.skipButtonText.visible = false;
                //this.timeout = this.timePerStep;
               // this.nextTimeOut = this.timer + this.timePerStep;
             //   this.showTimer();
               // this.updateTimer();
                break;
            case 5:
           //     this.titleText.text = "Timeput your action below:";




        }
        this.timeForNextState = this.timer + this.timePerStep;
    }


  },

  showTimer: function() {
       this.timerBox.visible = true;
       this.timerBoxText.visible = true;

  },

  updateTimer: function() {
    if (this.timeout > 0) {
        this.timeout--;
        this.timerBoxText.text = 'Time to action: ' + (this.timeout/40).toFixed(0);
        }
  },
  update: function() {
    this.timer++;
    this.updateTimer();
    if (this.justClickedCountdown > 0) {
        this.justClickedCountdown--;
    }
    if (this.timer == this.timeForNextState) {
        this.nextState(this.timeForNextState);
    }
    
  },

};