const NUM_CATS = 5;
const NUM_LIVES = 3;
const PREVIEW_DURATION = 5000; // Duration of the preview phase in milliseconds
const CAT_SIZE = 0.45; // Cat size multiplier

const textStyle = {
    fontFamily: '"Press Start 2P"',
    fontSize: '24px',
    fill: '#FFF'
};

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.initVariables();
    }

    initVariables() {
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        this.lives = NUM_LIVES;
        this.catOrder = [];
        this.selectedCats = [];
        this.previewActive = false;
        this.countdownText = null;
        this.playingPhaseTimer = null;
        this.countdownTimer = null;
        this.gameOverActive = false;
    }

    preload() {
        this.load.svg('cat', 'assets/cat.svg');
    }

    create() {
        this.createTextElements();
        this.highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        this.highScoreText.setText(`High Score: ${this.highScore}`);

        this.input.on('gameobjectdown', this.onCatClicked, this);
        this.resetGame();
    }

    createTextElements() {
        this.highScoreText = this.add.text(16, 16, 'High Score: 0', textStyle);
        this.scoreText = this.add.text(16, 50, 'Score: 0', textStyle);
        this.livesText = this.add.text(this.scale.width - 16, 16, `Lives: ${NUM_LIVES}`, textStyle).setOrigin(1, 0);
    }

    showCountdown(duration, callback) {
        if (this.countdownText) {
            this.countdownText.destroy();
        }

        this.countdownText = this.add.text(this.scale.width / 2, this.scale.height - 50, '', textStyle).setOrigin(0.5);
        let timeLeft = duration / 1000;

        this.countdownText.setText(`Time Left: ${timeLeft}`);
        const countdownTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                timeLeft -= 1;
                this.countdownText.setText(`Time Left: ${timeLeft}`);
                if (timeLeft === 0) {
                    countdownTimer.remove();
                    this.countdownText.destroy();
                    if (callback) {
                        callback.call(this);
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
        return countdownTimer;
    }

    update() {
        // Your game update logic here
    }

    generateCatOrder() {
        this.catOrder = [];
        for (let i = 0; i < NUM_CATS; i++) {
            this.catOrder.push(Phaser.Math.Between(0, 0xFFFFFF));
        }
    }

    createCats(centered) {
        this.cats = this.add.group();
        for (let i = 0; i < NUM_CATS; i++) {
            const x = centered ? this.scale.width / 2 - ((NUM_CATS - 1) * 100 / 2) + (i * 100) : 100 + i * (this.scale.width / (NUM_CATS + 1));
            const y = this.scale.height / 2;
            const cat = this.add.sprite(x, y, 'cat').setInteractive().setScale(CAT_SIZE);
            cat.setTint(this.catOrder[i]);
            cat.setData('order', i);
            this.cats.add(cat);
        }
    }
    shuffleCats() {
        this.cats.children.each(cat => {
            let x, y;
            let hasOverlap;

            do {
                x = Phaser.Math.Between(this.scale.width * 0.1, this.scale.width * 0.9);
                y = Phaser.Math.Between(this.scale.height * 0.1, this.scale.height * 0.8);
                hasOverlap = false;

                this.cats.children.each(otherCat => {
                    if (cat === otherCat) {
                        return;
                    }
                    const distance = Phaser.Math.Distance.Between(x, y, otherCat.x, otherCat.y);
                    if (distance < cat.displayWidth * CAT_SIZE * 1.2) {
                        hasOverlap = true;
                    }
                });

            } while (hasOverlap);

            cat.setPosition(x, y);
        });
    }

    onCatClicked(pointer, gameObject) {
        if (this.previewActive || this.gameOverActive) return;

        const catOrder = gameObject.getData('order');
        if (catOrder === this.selectedCats.length) {
            this.selectedCats.push(catOrder);
            gameObject.destroy();

            if (this.selectedCats.length === this.catOrder.length) {
                this.playingPhaseTimer.remove(); // Add this line
                this.score += NUM_CATS;
                this.scoreText.setText(`Score: ${this.score}`);
                this.resetGame();
            }
        } else {
            if (this.playingPhaseTimer) {
                this.playingPhaseTimer.remove();
            }
            this.lives -= 1;
            this.livesText.setText(`Lives: ${this.lives}`);
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.resetGame();
            }
        }
    }

    resetGame() {
        this.generateCatOrder();
        if (this.cats) {
            this.cats.clear(true, true);
        }
        this.selectedCats = [];

        // Update the high score if the current score is greater
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreText.setText(`High Score: ${this.highScore}`);
        }

        this.showPreview();
    }

    showPreview() {
        this.previewActive = true;
        this.createCats(true);
        this.showCountdown(PREVIEW_DURATION, () => {
            this.startPlayingPhase();
        });
    }

    startPlayingPhase() {
        this.previewActive = false;
        this.shuffleCats();
        this.startPlayingPhaseCountdown();
    }

    startPlayingPhaseCountdown() {
        const playingPhaseDuration = 5000; // 5 seconds
        this.playingPhaseTimer = this.showCountdown(playingPhaseDuration, () => {
            this.lives -= 1;
            this.livesText.setText(`Lives: ${this.lives}`);
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.resetGame();
            }
        });
    }

    gameOver() {
        this.gameOverActive = true;
        this.saveHighScoreIfNeeded();
        this.showGameOverMessage();
        this.addRestartButton();
        this.resetScoreAndLives();
    }

    saveHighScoreIfNeeded() {
        const savedHighScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        if (this.score > savedHighScore) {
            localStorage.setItem('highScore', this.score);
            this.highScoreText.setText(`High Score: ${this.score}`);
        }
    }

    showGameOverMessage() {
        this.gameOver
        Text = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Game Over', textStyle).setOrigin(0.5);
    }
    addRestartButton() {
        const restartButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Restart', textStyle).setOrigin(0.5).setInteractive();
        restartButton.on('pointerdown', () => {
            this.gameOverText.destroy();
            restartButton.destroy();
            this.gameOverActive = false;
            this.resetGame();
        });
    }

    resetScoreAndLives() {
        this.score = 0;
        this.lives = NUM_LIVES;
        this.scoreText.setText(`Score: ${this.score}`);
        this.livesText.setText(`Lives: ${this.lives}`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true
};

const game = new Phaser.Game(config);