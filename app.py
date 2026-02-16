from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import subprocess
import time

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    """Serve the main HTML page"""
    return render_template("index.html")

@app.route("/run", methods=["POST"])
def run_code():
    """Execute Python code and return output"""
    data = request.json
    code = data.get("code", "")
    user_input = data.get("input", "")
    
    if not code.strip():
        return jsonify({
            "output": "",
            "error": "No code provided",
            "execution_time": 0
        })
    
    start_time = time.time()
    
    try:
        # Execute Python code with timeout protection
        process = subprocess.run(
            ["python", "-c", code],
            input=user_input,
            capture_output=True,
            text=True,
            timeout=5  # 5 second timeout to prevent infinite loops
        )
        
        execution_time = time.time() - start_time
        
        # Combine stdout and stderr
        output = process.stdout
        error = process.stderr
        
        return jsonify({
            "output": output,
            "error": error,
            "execution_time": round(execution_time, 3)
        })
        
    except subprocess.TimeoutExpired:
        execution_time = time.time() - start_time
        return jsonify({
            "output": "",
            "error": "Error: Code execution timed out (5 second limit)",
            "execution_time": round(execution_time, 3)
        })
        
    except Exception as e:
        execution_time = time.time() - start_time
        return jsonify({
            "output": "",
            "error": f"Error: {str(e)}",
            "execution_time": round(execution_time, 3)
        })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
