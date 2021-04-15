class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }

  preload() {
    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("title", "images/title.png");
  }

  create() {
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();

    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });

    let title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(38, title);

    let btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "start",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    emitter.on("start_game", this.startGame, this);
    mediaManager = new MediaManager({ scene: this });

    this.centerX = game.config.width / 2;
    this.centerY = game.config.height / 2;
    this.ball = this.physics.add.sprite(this.centerX, this.centerY, "balls");
    this.ball.body.setBounce(0, 1);
    this.ball.body.setVelocity(0, 100);
    this.ball.body.collideWorldBounds = true;
    Align.scaleToGameW(this.ball, 0.05);
  }

  startGame() {
    this.scene.start("SceneMain");
  }

  update() {}
}
