var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);
    this.game.load.image('fireball', 'assets/fireball.png');

    this.game.load.image('actionButton', 'assets/spellButton.png');
    this.game.load.image('button', 'assets/button.png');

    this.game.load.image('sky', 'assets/bg.png');
    this.game.load.image('ground', 'assets/bg_castle.png');
    this.game.load.image('hospital', 'assets/hospital6.png');
    this.game.load.spritesheet('dude', 'assets/doomfaces2.png', 52, 65);
    this.game.load.spritesheet('treat', 'assets/treat.png', 190, 45);

    this.game.load.image('sorceress', 'assets/sorceress.png');
    this.game.load.image('warrior', 'assets/warrior.png');
    this.game.load.image('priest', 'assets/priest.png');

    this.game.load.image('ui', 'assets/ui.png');
    this.game.load.image('skip', 'assets/skip.png');

  },
  create: function() {
    this.state.start('Game');
  }
};
