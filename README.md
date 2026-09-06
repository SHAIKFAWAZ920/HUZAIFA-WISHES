# 🎂 Interactive Birthday Experience — Uzma ✨

A personalized, interactive web application built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Designed with physics-based drag-and-shot interactions, layer-by-layer animated birthday cake, balloon popping, and heart-felt parchment letter opening.

Made with love by **Huzaifa** for **Uzma** 💖

---

## 🌟 Interactive Features (8 Scenes)

1. **🏹 Cupid's Bow & Arrow Intro Scene**
   - Interactive pull-and-release bow physics.
   - Smooth arrow trajectory targeting the glowing heart center with hit particle fireworks.

2. **✨ Birthday Wish Title Scene**
   - Floating stars particle canvas background with glowing typography and smooth scene transitions.

3. **🌳 Growing Birthday Tree Scene**
   - Dynamic canvas fractal tree growth with blossoming flower buds and zero-overlap responsive layout.

4. **🎂 Layer-by-Layer Drop Birthday Cake & Candle Blow Scene**
   - Multi-tier spring-animated cake drop physics (Golden Stand → Bottom Tier → Middle Tier → Top Tier → Candle & Flame).
   - Touch / Blow candle extinguishing interaction with floating smoke wisps and Web Audio API chime sound effects.

5. **🎈 Reason Balloons Pop Scene**
   - 5 interactive floating balloons with custom glassmorphic styling.
   - Pop animation revealing 5 reasons why she is loved.

6. **✉️ Sealed Wax Envelope Scene**
   - Glassmorphic golden wax seal envelope with interactive tap-to-open mechanics.

7. **📜 Heartfelt Parchment Letter Scene**
   - Aesthetic parchment scroll layout containing a personal birthday letter with smooth fade-in typography.

8. **🎉 Final Celebration Scene**
   - Full celebration fireworks particle display with replay controls.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Vanilla CSS Tokens
- **Animations**: Framer Motion
- **Sound Effects**: Web Audio API Synthesizer (Zero external assets dependency)
- **Code Quality**: Oxlint (0 errors, 0 warnings)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SHAIKFAWAZ920/HUZAIFA-WISHES.git

# Navigate into project directory
cd HUZAIFA-WISHES

# Install dependencies
npm install
```

### Development Server

```bash
# Run local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to preview the experience.

### Production Build

```bash
# Build for production
npm run build
```

---

## ⚙️ Configuration & Customization

All text content, recipient name, age, and messages can be customized in [`src/config/birthdayConfig.js`](src/config/birthdayConfig.js):

```javascript
export const birthdayConfig = {
  name: "Uzma",
  age: 14,
  sender: "Huzaifa",
  // ... customized text and letter contents
};
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

