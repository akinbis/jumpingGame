Preview Link: [comes here](https://akinbis.github.io/jumpingGame/)

# 🎮 Monster Jump

A browser-based endless runner game where you control a **Pink Monster** that must jump over obstacles to survive. Built with vanilla HTML, CSS, and JavaScript.

---

## 🕹️ Gameplay

- A confirmation dialog starts the game
- Obstacles spawn randomly from the right side of the screen and move left
- Press **Space** to jump over obstacles
- The game ends on collision — you can choose to play again

---

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required. Just a modern browser.

### Running the Game

1. Clone or download the repository
2. Open `index.html` in your browser

```bash
git clone https://github.com/your-username/block-jump.git
cd block-jump
open index.html
```

---

## 🎯 Controls

| Key     | Action |
| ------- | ------ |
| `Space` | Jump   |

---

## 📁 Project Structure

```
block-jump/
├── index.html
├── style.css
├── script.js
└── images/
    ├── Pink_Monster_Run_6_32px_frames.png
    ├── Pink_Monster_Jump_8_32px_frames.png
    ├── Pink_Monster_Hurt_4_32px_frames.png
    └── pixel-cloud.png
```

---

## ⚙️ How It Works

### Core Systems

| System         | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| **Scoring**    | Score increments every 100ms via `setInterval` while the game is running |
| **High Score** | Persisted in `localStorage` across sessions                              |
| **Obstacles**  | Spawned at random intervals (1–3 seconds) and animated with CSS classes  |
| **Clouds**     | Decorative background elements spawned every 1–4 seconds                 |
| **Collision**  | AABB (bounding-box) detection via `getBoundingClientRect()`              |
| **Jump**       | CSS class-based animation with a 500ms timeout before landing            |

### Game Loop

The game runs on `requestAnimationFrame`, checking every frame for:

- Collision between the character and active obstacles
- Whether obstacles or clouds have exited the left side of the screen (and removes them)
- High score updates on game over

### Character States

The Pink Monster sprite sheet changes based on state:

| State   | Sprite File                           |
| ------- | ------------------------------------- |
| Idle    | `Pink_Monster_Idle` (default on load) |
| Running | `Pink_Monster_Run_6_32px_frames.png`  |
| Jumping | `Pink_Monster_Jump_8_32px_frames.png` |
| Hurt    | `Pink_Monster_Hurt_4_32px_frames.png` |

---

## 🧠 Key Functions

| Function               | Purpose                                                      |
| ---------------------- | ------------------------------------------------------------ |
| `startGame()`          | Entry point — prompts user, initializes spawning and scoring |
| `game()`               | Main rAF loop — collision + cleanup                          |
| `jump()`               | Triggers jump animation and schedules landing                |
| `spawnObstacle()`      | Creates and animates a new obstacle, recurses after delay    |
| `spawnCloud()`         | Creates and animates a new cloud, recurses after delay       |
| `detectCollision(obs)` | AABB collision check between character and obstacle          |
| `onCollision(obs)`     | Freezes game state, shows Game Over dialog                   |
| `startScoring()`       | Starts score interval                                        |
| `stopScoring()`        | Stops score interval and records final score                 |

---

## 📦 Assets

Sprite sheets should be in `./images/`. The game expects the following files:

- `Pink_Monster_Run_6_32px_frames.png`
- `Pink_Monster_Jump_8_32px_frames.png`
- `Pink_Monster_Hurt_4_32px_frames.png`
- `pixel-cloud.png`

> Sprites are from the [free Pink Monster asset pack](https://pixelfrog-assets.itch.io/pixel-adventure-1) by Pixel Frog on itch.io.

---

## 🔧 Possible Improvements

- Add touch/mobile support (tap to jump)
- Increase obstacle speed over time for progressive difficulty
- Add sound effects on jump and collision
- Replace `confirm()` / `alert()` dialogs with custom in-game UI
- Add multiple obstacle types or sizes

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
