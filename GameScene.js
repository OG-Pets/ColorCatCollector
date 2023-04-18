const NUM_CATS = 5;
const PREVIEW_DURATION = 5000; // Duration of the preview phase in milliseconds
const CAT_SIZE = 0.5; // Cat size multiplier

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
        this.lives = 10;
        this.catOrder = [];
        this.selectedCats = [];
        this.previewActive = false;
        this.countdownText = null;
        this.playingPhaseTimer = null;
    }

    preload() {
        this.load.svg('cat', 'assets/cat.svg');
    }

    create() {
        const textStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#FFF'
        };

        this.scoreText = this.add.text(16, 16, 'Score: 0', textStyle);
        this.livesText = this.add.text(this.scale.width - 16, 16, 'Lives: 10', textStyle).setOrigin(1, 0);
        this.input.on('gameobjectdown', this.onCatClicked, this);
        this.resetGame();
    }

    showCountdown(duration, callback) {
        if (this.countdownText) {
            this.countdownText.destroy();
        }

        const textStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#FFF'
        };

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
            const x = centered ? this.scale.width / 2 - ((NUM_CATS - 1) * 100 / 2) + (i * 100) : 100 + i * 200;
            const y = this.scale.height / 2;
            const cat = this.add.sprite(x, y, 'cat').setInteractive().setScale(CAT_SIZE);
            cat.setTint(this.catOrder[i]);
            cat.setData('order', i);
            this.cats.add(cat);
        }
    }

    shuffleCats() {
        this.cats.children.each(cat => {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);
            cat.setPosition(x, y);
        });
    }

    onCatClicked(pointer, gameObject) {
        if (this.previewActive) return;

        const catOrder = gameObject.getData('order');
        if (catOrder === this.selectedCats.length) {
            this.selectedCats.push(catOrder);
            gameObject.destroy();

            if (this.selectedCats.length === this.catOrder.length) {
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
        // Show game over message
        const gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Game Over', { fontFamily: '"Press Start 2P"', fontSize: '48px', fill: '#FFF' }).setOrigin(0.5);

        // Reset score and lives
        this.score = 0;
        this.lives = 10;

        // Restart the game after 3 seconds
        setTimeout(() => {
            gameOverText.destroy();
            this.scoreText.setText('Score: 0');
            this.livesText.setText('Lives: 10');
            this.resetGame();
        }, 3000);
    }
}

window.GameScene = GameScene;

