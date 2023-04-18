const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: [window.GameScene]
};

const game = new Phaser.Game(config);
