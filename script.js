body {
  font-family: Arial, sans-serif;
  background-color: rgb(26, 24, 24);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  margin: 0;
}

h1 {
  color: #ffffff;
  text-align: center;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
}

input {
  flex:1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #949494;
  outline: none;
}

button.add-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task {
  background: #f9f9f9;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task.completed span {
  text-decoration: line-through;
  color: gray;
}

.btns {
  display: flex;
  gap: 8px;
}

.done-btn {
  background: #02a345;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn {
  background: #ca1602;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 360px){
  .todo-container {
    transform: scale(0.9);  
    transform-origin: top center;
    margin:0 auto;
  }
}
