window.addEventListener('load', function () {
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      },
      active: function () {
        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          scene: [GameScene]
        };
        const game = new Phaser.Game(config);
      }
    });
  });