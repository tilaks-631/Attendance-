/* Reset & Global Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f8f9fa, #e0eafc);
  color: #333;
  min-height: 100vh;
  padding-bottom: 40px;
}
header {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: #fff;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
button {
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.2s, background 0.3s;
}
button:hover {
  transform: translateY(-2px);
}
button.reset { background-color: #ff4d4d; color: #fff; }
button.undo { background-color: #ffa500; color: #fff; }
button.pdf { background-color: #28a745; color: #fff; }
button.newWeek { background-color: #6f42c1; color: #fff; }

/* Container */
.container {
  width: 95%;
  max-width: 1200px;
  margin: 20px auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  padding: 20px;
}
h3 {
  color: #4e54c8;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}
th {
  background: #f2f2f2;
}
tbody tr:hover {
  background: #f9f9f9;
}

/* Grand Total */
#grandTotal {
  text-align: right;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
    }
