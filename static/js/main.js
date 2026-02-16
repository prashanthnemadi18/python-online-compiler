// ==================== Floating Particles Animation ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';

        // Random size variation
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
createParticles();

// ==================== Monaco Editor Setup ====================
let editor;

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    const theme = localStorage.getItem('theme') || 'dark';

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: '# Write your Python code here\nprint("Hello, World!")',
        language: 'python',
        theme: theme === 'dark' ? 'vs-dark' : 'vs',
        fontSize: 14,
        minimap: { enabled: true },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        tabSize: 4,
        insertSpaces: true,
        wordWrap: 'on',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        folding: true,
        bracketPairColorization: {
            enabled: true
        }
    });
});

// ==================== Sample Code Library ====================
const sampleCodes = {
    hello: `# Hello World Example
print("Hello, World!")
print("Welcome to Python Online Compiler!")`,

    input: `# Input Example
name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}! You are {age} years old.")`,

    loop: `# Loop Example
# Print numbers from 1 to 10
for i in range(1, 11):
    print(f"Number: {i}")

# Calculate sum
total = sum(range(1, 101))
print(f"\\nSum of 1 to 100: {total}")`,

    function: `# Function Example
def greet(name):
    return f"Hello, {name}!"

def calculate_area(radius):
    pi = 3.14159
    return pi * radius ** 2

# Test functions
print(greet("Python"))
print(f"Area of circle (r=5): {calculate_area(5):.2f}")`,

    list: `# List Operations Example
# Create a list
numbers = [1, 2, 3, 4, 5]
print(f"Original list: {numbers}")

# Add elements
numbers.append(6)
print(f"After append: {numbers}")

# List comprehension
squares = [x**2 for x in numbers]
print(f"Squares: {squares}")

# Filter even numbers
evens = [x for x in numbers if x % 2 == 0]
print(f"Even numbers: {evens}")`
};

// ==================== Event Listeners ====================
document.getElementById('samples').addEventListener('change', function (e) {
    const sample = e.target.value;
    if (sample && sampleCodes[sample]) {
        editor.setValue(sampleCodes[sample]);
    }
});

document.getElementById('runBtn').addEventListener('click', runCode);

document.getElementById('clearOutput').addEventListener('click', function () {
    const outputBox = document.getElementById('output');
    outputBox.textContent = 'Output will appear here...';
    outputBox.classList.remove('error');
    document.getElementById('executionTime').textContent = '';
});

document.getElementById('downloadBtn').addEventListener('click', downloadCode);

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Allow Ctrl+Enter to run code
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'Enter') {
        runCode();
    }
});

// ==================== Run Code Function ====================
async function runCode() {
    const code = editor.getValue();
    const input = document.getElementById('stdin').value;
    const outputBox = document.getElementById('output');
    const runBtn = document.getElementById('runBtn');
    const executionTimeBox = document.getElementById('executionTime');

    if (!code.trim()) {
        outputBox.textContent = 'Error: Please write some code first!';
        outputBox.classList.add('error');
        return;
    }

    // Show loading state
    runBtn.disabled = true;
    runBtn.classList.add('loading');
    outputBox.textContent = 'Running...';
    outputBox.classList.remove('error');
    executionTimeBox.textContent = '';

    try {
        const response = await fetch('/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, input })
        });

        const result = await response.json();

        // Display output
        let displayText = '';
        if (result.output) {
            displayText += result.output;
        }
        if (result.error) {
            displayText += result.error;
            outputBox.classList.add('error');
        } else {
            // Add success animation if no errors
            runBtn.classList.add('success');
            setTimeout(() => runBtn.classList.remove('success'), 600);
        }

        outputBox.textContent = displayText || 'No output';

        // Display execution time
        if (result.execution_time !== undefined) {
            executionTimeBox.textContent = `⏱️ ${result.execution_time}s`;
        }

    } catch (error) {
        outputBox.textContent = `Error: ${error.message}`;
        outputBox.classList.add('error');
    } finally {
        runBtn.disabled = false;
        runBtn.classList.remove('loading');
    }
}

// ==================== Download Code Function ====================
function downloadCode() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ==================== Theme Toggle Function ====================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update Monaco editor theme
    if (editor) {
        monaco.editor.setTheme(newTheme === 'dark' ? 'vs-dark' : 'vs');
    }
}

// ==================== Initialize Theme ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme on page load
initTheme();

