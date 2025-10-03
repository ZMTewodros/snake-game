const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake = [];
    snake[0] = {
      x: (Math.floor(Math.random() * columns)) * scale,
      y: (Math.floor(Math.random() * rows)) * scale,
    };

    let food = {
      x: (Math.floor(Math.random() * columns)) * scale,
      y: (Math.floor(Math.random() * rows)) * scale,
    };

    let d = "right";
    let gameover = false;
    let score = 0;  // Initialize score
    const scoreDisplay = document.getElementById("current-score"); // Get the score display element

    function direction(event) {
      let key = event.keyCode;
      if (key == 37 && d != "right") {
        d = "left";
      } else if (key == 38 && d != "down") {
        d = "up";
      } else if (key == 39 && d != "left") {
        d = "right";
      } else if (key == 40 && d != "up") {
        d = "down";
      }
    }

    document.onkeydown = direction;
    let playgame = setInterval(draw, 100);

    function draw() {
      if (gameover) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the snake
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "pink";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
      }

      // Draw the food
      ctx.fillStyle = "red";
      ctx.strokeStyle = "green";
      ctx.fillRect(food.x, food.y, scale, scale);


      // Calculate the new head position
      let snakex = snake[0].x;
      let snakey = snake[0].y;

      if (d == "left") snakex -= scale;
      if (d == "up") snakey -= scale;
      if (d == "right") snakex += scale;
      if (d == "down") snakey += scale;

      // Wrap around the screen
      if (snakex > canvas.width - scale) { // Corrected to avoid going off-screen
        snakex = 0;
      }
      if (snakey > canvas.height - scale) { // Corrected to avoid going off-screen
        snakey = 0;
      }
      if (snakex < 0) {
        snakex = canvas.width - scale; // Wrap around
      }
      if (snakey < 0) {
        snakey = canvas.height - scale; // Wrap around
      }

      let newhead = {
        x: snakex,
        y: snakey
      };

      // Check for self-collision
      for (let i = 0; i < snake.length; i++) {
        if (newhead.x === snake[i].x && newhead.y === snake[i].y) {
          gameover = true;
          document.getElementById("game-over").style.display = "block";
            document.getElementById("final-score").textContent = score; // Display final score.
          clearInterval(playgame);
        }
      }

      // Eat the food
      if (snakex == food.x && snakey == food.y) {
        score++; // Increase the score when the snake eats the food.
        scoreDisplay.textContent = score; // Update the score display
        food = {
          x: (Math.floor(Math.random() * columns)) * scale,
          y: (Math.floor(Math.random() * rows)) * scale,
        };
      } else {
        snake.pop(); // Remove the tail if not eating
      }

      snake.unshift(newhead);
    }