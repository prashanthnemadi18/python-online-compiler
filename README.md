# 🐍 Python Online Compiler

A modern, feature-rich online Python compiler with a beautiful UI, similar to Programiz. Write, execute, and test Python code directly in your browser!

![Python Version](https://img.shields.io/badge/python-3.x-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **Monaco Editor Integration** - Professional code editor with VS Code features
- **Syntax Highlighting** - Beautiful Python syntax highlighting
- **IntelliSense** - Auto-completion and suggestions
- **Dark/Light Theme** - Toggle between themes with persistence
- **Code Samples** - Pre-built examples to get started quickly
- **Input Support** - Provide stdin input for your programs
- **Execution Time** - Track how long your code takes to run
- **Download Code** - Save your code as `.py` files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Glassmorphism design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Python 3.x installed
- pip package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "d:/online complier"
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5000`

## 📖 Usage

1. **Write Code** - Use the Monaco editor to write your Python code
2. **Provide Input** - If your code uses `input()`, enter values in the Input box
3. **Run Code** - Click the "Run Code" button or press `Ctrl+Enter`
4. **View Output** - See results in the Output section
5. **Try Samples** - Select from pre-built examples in the dropdown
6. **Download** - Save your code using the download button
7. **Toggle Theme** - Switch between dark and light modes

## 🏗️ Architecture

```
Browser (Monaco Editor) ⇄ Flask API ⇄ Python Subprocess
```

**Flow:**
1. User writes code in Monaco Editor
2. Frontend sends POST request to `/run` endpoint
3. Backend executes code using `subprocess.run()`
4. Output/errors captured and returned as JSON
5. Frontend displays results

## 📁 Project Structure

```
online complier/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML page
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── main.js       # Frontend logic
└── README.md             # Documentation
```

## ⚠️ Security Notes

**Current Implementation:**
- Uses `subprocess.run()` with 5-second timeout
- Suitable for **local development and learning**
- **NOT safe for public deployment** without additional security

**For Production Deployment:**
- ✅ Run code in Docker containers
- ✅ Implement resource limits (CPU, RAM, disk)
- ✅ Use sandboxing (e.g., PyPy sandbox, RestrictedPython)
- ✅ Block dangerous imports and system calls
- ✅ Add rate limiting
- ✅ Implement user authentication

## 🎨 Customization

### Change Theme Colors
Edit CSS variables in `static/css/style.css`:
```css
:root {
    --accent-primary: #4a9eff;
    --accent-secondary: #7b68ee;
    /* ... */
}
```

### Add More Samples
Edit the `sampleCodes` object in `static/js/main.js`:
```javascript
const sampleCodes = {
    yourSample: `# Your code here
print("Hello!")`,
};
```

## 🚀 Deployment

### Deploy to Render.com
1. Create a `render.yaml` file
2. Push to GitHub
3. Connect to Render
4. Deploy!

### Deploy to Railway.app
1. Install Railway CLI
2. Run `railway init`
3. Run `railway up`

## 🛠️ Future Enhancements

- [ ] User authentication and accounts
- [ ] Save code history
- [ ] Share code via links
- [ ] Multiple file support
- [ ] Package installation support
- [ ] Collaborative editing
- [ ] Code execution analytics
- [ ] Mobile app version

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Built with ❤️ using Flask and Monaco Editor**
