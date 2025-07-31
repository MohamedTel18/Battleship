# 🚢 Battleship Game

A classic Battleship game implementation using JavaScript, HTML, and CSS. Challenge the computer in this naval strategy game where you try to sink all enemy ships before they sink yours!

## 🎮 Live Demo

**Play the game:** [https://mohamedtel18.github.io/Battleship/](https://mohamedtel18.github.io/Battleship/)

## 📋 Features

- **Interactive Gameplay**: Click to attack enemy ships on the grid
- **Smart AI Opponent**: Computer player with strategic targeting
- **Ship Placement**: Drag and drop ships or use random placement
- **Visual Feedback**: Clear indicators for hits, misses, and sunk ships
- **Responsive Design**: Works on desktop and mobile devices
- **Game Statistics**: Track your hits, misses, and ships remaining

## 🎯 How to Play

1. **Ship Placement Phase**:
   - Place your ships on the grid by dragging and dropping
   - Ships can be placed horizontally or vertically
   - Use the "Random" button for automatic placement

2. **Battle Phase**:
   - Click on the enemy grid to attack
   - Red indicates a hit, white indicates a miss
   - Sink all enemy ships to win!

## 🛠️ Technologies Used

- **JavaScript (ES6+)**: Game logic and DOM manipulation
- **HTML5**: Semantic markup structure
- **CSS3**: Styling and responsive design
- **Webpack**: Module bundling and build process
- **GitHub Pages**: Deployment and hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MohamedTel18/Battleship.git
cd Battleship
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

## 📁 Project Structure

```
Battleship/
├── src/
│   ├── index.js           # Entry point
│   ├── style.css          # Main styles
│   ├── template.html      # HTML template
│   ├── models/
│   │   ├── ship.js        # Ship class
│   │   ├── gameboard.js   # Gameboard logic
│   │   └── player.js      # Player logic
│   ├── controller/
│   │   └── gameController.js  # Game flow control
│   ├── UI/
│   │   └── DOM.js         # DOM manipulation
│   └── __tests__/
│       ├── ship.test.js
│       ├── gameboard.test.js
│       └── player.test.js
├── webpack.config.js      # Webpack configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The project includes unit tests for:
- Ship placement and hit detection
- Gameboard functionality
- Player actions and AI logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Multiplayer support
- [ ] Different difficulty levels
- [ ] Sound effects and animations
- [ ] Ship customization options
- [ ] Game replay functionality
- [ ] High score tracking

## 👨‍💻 Author

**MohamedTel18**
- GitHub: [@MohamedTel18](https://github.com/MohamedTel18)
- Project Link: [https://github.com/MohamedTel18/Battleship](https://github.com/MohamedTel18/Battleship)

---

⭐ Star this repository if you enjoyed playing the game!