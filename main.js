window.addEventListener('load', function () {
  WebFont.load({
    google: {
      families: ['Press Start 2P']
    },
    active: function () {
      const config = {
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight
        },
        parent: 'game',
        scene: [GameScene]
      };
      const game = new Phaser.Game(config);

      // Update the game size when the window is resized
      window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
      });
    }
  });
});
