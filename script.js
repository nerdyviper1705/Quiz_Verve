document.addEventListener("DOMContentLoaded", function () {
  const enterButton = document.getElementById("enter-button");
  const readyButton = document.getElementById("ready-button");
  const categoryItems = document.querySelectorAll(".category-item");
  const profilePage = document.getElementById("profile-page");
  const categoryPage = document.getElementById("category-page");
  const questionPage = document.getElementById("question-page");
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const timerCount = document.getElementById("timer-count");
  const scoreContainer = document.getElementById("score-container");
  const restartButton = document.getElementById("restart-button");

  let selectedCategory = "";
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;

  // Question sets for each category
  const questionSets = {
    "General Knowledge": [
      {
        question: "What is the capital city of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        correct: "New Delhi",
      },
      {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: [
          "Jawaharlal Nehru",
          "Bhagat Singh",
          "Mahatma Gandhi",
          "Subhas Chandra Bose",
        ],
        correct: "Mahatma Gandhi",
      },
      {
        question: "Which river is considered the holiest in India?",
        options: ["Yamuna", "Godavari", "Ganges", "Narmada"],
        correct: "Ganges",
      },
      {
        question: "What is the national animal of India?",
        options: ["Lion", "Bengal Tiger", "Elephant", "Peacock"],
        correct: "Bengal Tiger",
      },
      {
        question: "Who was the first Prime Minister of independent India?",
        options: [
          "Lal Bahadur Shastri",
          "Indira Gandhi",
          "Sardar Vallabhbhai Patel",
          "Jawaharlal Nehru",
        ],
        correct: "Jawaharlal Nehru",
      },
      {
        question:
          "In which year did India gain independence from British rule?",
        options: ["1942", "1947", "1950", "1952"],
        correct: "1947",
      },
      {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        options: ["Punjab", "Haryana", "Gujarat", "Maharashtra"],
        correct: "Punjab",
      },
      {
        question:
          "What is the official language of the Indian state of Tamil Nadu?",
        options: ["Telugu", "Kannada", "Tamil", "Malayalam"],
        correct: "Tamil",
      },
      {
        question: "Who wrote the Indian national anthem 'Jana Gana Mana'?",
        options: [
          "Bankim Chandra Chatterjee",
          "Sarojini Naidu",
          "Rabindranath Tagore",
          "Subhas Chandra Bose",
        ],
        correct: "Rabindranath Tagore",
      },
      {
        question: "What is the largest state in India by area?",
        options: [
          "Maharashtra",
          "Rajasthan",
          "Uttar Pradesh",
          "Madhya Pradesh",
        ],
        correct: "Rajasthan",
      },
      // Add more questions as needed
    ],
    Entertainment: [
      {
        question:
          "Who is the Bollywood actor known as the 'King of Bollywood'?",
        options: [
          "Salman Khan",
          "Shah Rukh Khan",
          "Aamir Khan",
          "Akshay Kumar",
        ],
        correct: "Shah Rukh Khan",
      },
      {
        question:
          "Which Indian movie won the Oscar for Best Original Score in 2009?",
        options: [
          "Lagaan",
          "Slumdog Millionaire",
          "Life of Pi",
          "The Lunchbox",
        ],
        correct: "Slumdog Millionaire",
      },
      {
        question:
          "Which Bollywood film is known for the song 'Tujh Mein Rab Dikhta Hai'?",
        options: [
          "Rab Ne Bana Di Jodi",
          "Jab Tak Hai Jaan",
          "Dilwale Dulhania Le Jayenge",
          "Kabhi Khushi Kabhie Gham",
        ],
        correct: "Rab Ne Bana Di Jodi",
      },
      {
        question: "Who directed the film 'Gully Boy'?",
        options: [
          "Rajkumar Hirani",
          "Zoya Akhtar",
          "Karan Johar",
          "Rohit Shetty",
        ],
        correct: "Zoya Akhtar",
      },
      {
        question: "Which TV show features the character 'Daya'?",
        options: [
          "CID",
          "Taarak Mehta Ka Ooltah Chashmah",
          "Kumkum Bhagya",
          "Yeh Rishta Kya Kehlata Hai",
        ],
        correct: "Taarak Mehta Ka Ooltah Chashmah",
      },
      {
        question:
          "Who played the role of 'Bajrangi' in the film 'Bajrangi Bhaijaan'?",
        options: [
          "Salman Khan",
          "Aamir Khan",
          "Ranbir Kapoor",
          "Shah Rukh Khan",
        ],
        correct: "Salman Khan",
      },
      {
        question:
          "Which movie features the famous dialogue 'Mogambo Khush Hua'?",
        options: ["Sholay", "Mr. India", "Don", "Deewaar"],
        correct: "Mr. India",
      },
      {
        question: "Who is the music composer of the film 'Kabir Singh'?",
        options: [
          "A.R. Rahman",
          "Mithoon",
          "Vishal-Shekhar",
          "Shankar-Ehsaan-Loy",
        ],
        correct: "Mithoon",
      },
      {
        question: "Which film features the song 'Chaiyya Chaiyya'?",
        options: ["Dil Se", "Kabhi Khushi Kabhie Gham", "Kal Ho Na Ho", "Taal"],
        correct: "Dil Se",
      },
      {
        question: "Who starred opposite Deepika Padukone in 'Padmaavat'?",
        options: [
          "Ranbir Kapoor",
          "Ranveer Singh",
          "Hrithik Roshan",
          "Amitabh Bachchan",
        ],
        correct: "Ranveer Singh",
      },
      {
        question:
          "Which Bollywood movie is based on the life of an Indian cricketer?",
        options: [
          "Lagaan",
          "Chakde! India",
          "MS Dhoni: The Untold Story",
          "Iqbal",
        ],
        correct: "MS Dhoni: The Untold Story",
      },
      // Add more questions as needed
    ],

    "Science & Technology": [
      {
        question: "Who is known as the 'Missile Man of India'?",
        options: [
          "Homi J. Bhabha",
          "Vikram Sarabhai",
          "Dr. A.P.J. Abdul Kalam",
          "Satish Dhawan",
        ],
        correct: "Dr. A.P.J. Abdul Kalam",
      },
      {
        question:
          "Which Indian scientist won the Nobel Prize in Physics in 1930?",
        options: [
          "C.V. Raman",
          "Satyendra Nath Bose",
          "Jagadish Chandra Bose",
          "Homi J. Bhabha",
        ],
        correct: "C.V. Raman",
      },
      {
        question:
          "What is the Indian Space Research Organisation (ISRO) known for?",
        options: [
          "Pharmaceuticals",
          "Automotive industry",
          "Space exploration and satellite deployment",
          "Textile industry",
        ],
        correct: "Space exploration and satellite deployment",
      },
      {
        question:
          "Who invented the fiber optic technology in telecommunications?",
        options: [
          "Homi J. Bhabha",
          "M. Visvesvaraya",
          "Dr. Narinder Singh Kapany",
          "Vikram Sarabhai",
        ],
        correct: "Dr. Narinder Singh Kapany",
      },
      {
        question: "What is the name of India's first satellite?",
        options: ["Bhaskara", "Rohini", "INSAT-1A", "Aryabhata"],
        correct: "Aryabhata",
      },
      {
        question:
          "In which Indian city is the headquarters of Infosys located?",
        options: ["Hyderabad", "Bengaluru", "Chennai", "Pune"],
        correct: "Bengaluru",
      },
      {
        question:
          "Which Indian mathematician is famous for the Ramanujan Prime and Ramanujan Theta functions?",
        options: [
          "Aryabhata",
          "Srinivasa Ramanujan",
          "Bhaskara",
          "Brahmagupta",
        ],
        correct: "Srinivasa Ramanujan",
      },
      {
        question:
          "What is the national space mission of India to explore Mars called?",
        options: [
          "Chandrayaan",
          "Gaganyaan",
          "Aditya-L1",
          "Mars Orbiter Mission (Mangalyaan)",
        ],
        correct: "Mars Orbiter Mission (Mangalyaan)",
      },
      {
        question:
          "Which Indian-born physicist is known for his work in particle physics and cosmology?",
        options: [
          "C.V. Raman",
          "Subrahmanyan Chandrasekhar",
          "Jagadish Chandra Bose",
          "Meghnad Saha",
        ],
        correct: "Subrahmanyan Chandrasekhar",
      },
      {
        question:
          "Which Indian city is known as the 'Silicon Valley of India'?",
        options: ["Mumbai", "Pune", "Bengaluru", "Hyderabad"],
        correct: "Bengaluru",
      },
      // Add more questions as needed
    ],

    Sports: [
      {
        question: "Who is known as the 'Little Master' in Indian cricket?",
        options: [
          "Kapil Dev",
          "Sourav Ganguly",
          "Sachin Tendulkar",
          "Virat Kohli",
        ],
        correct: "Sachin Tendulkar",
      },
      {
        question: "Which Indian city hosted the 2010 Commonwealth Games?",
        options: ["New Delhi", "Mumbai", "Chennai", "Bengaluru"],
        correct: "New Delhi",
      },
      {
        question: "Who won the ICC Cricket World Cup for India in 1983?",
        options: [
          "Kapil Dev",
          "Sourav Ganguly",
          "Sachin Tendulkar",
          "MS Dhoni",
        ],
        correct: "Kapil Dev",
      },
      {
        question:
          "Which Indian player is known as the 'Wall' of Indian cricket?",
        options: [
          "Sourav Ganguly",
          "Virender Sehwag",
          "Rahul Dravid",
          "Yuvraj Singh",
        ],
        correct: "Rahul Dravid",
      },
      {
        question:
          "Which Indian football club has won the most I-League titles?",
        options: [
          "East Bengal",
          "Mohun Bagan",
          "Bengaluru FC",
          "Kerala Blasters",
        ],
        correct: "Mohun Bagan",
      },
      {
        question:
          "Who is the first Indian to win an individual Olympic gold medal?",
        options: [
          "Abhinav Bindra",
          "Rajyavardhan Singh Rathore",
          "Milkha Singh",
          "P.T. Usha",
        ],
        correct: "Abhinav Bindra",
      },
      {
        question: "Which sport is known as the 'Gentleman's Game'?",
        options: ["Football", "Hockey", "Cricket", "Tennis"],
        correct: "Cricket",
      },
      {
        question: "Who is the captain of the Indian national football team?",
        options: [
          "Sunil Chhetri",
          "Gurpreet Singh Sandhu",
          "Sandesh Jhingan",
          "Jeje Lalpekhlua",
        ],
        correct: "Sunil Chhetri",
      },
      {
        question:
          "Which Indian state is known for its traditional martial art 'Kalaripayattu'?",
        options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
        correct: "Kerala",
      },
      {
        question:
          "Who is the Indian badminton player known for winning multiple medals at the World Championships?",
        options: [
          "Saina Nehwal",
          "P.V. Sindhu",
          "Jwala Gutta",
          "Ashwini Ponnappa",
        ],
        correct: "P.V. Sindhu",
      },
      // Add more questions as needed
    ],

    "Indian History & Culture": [
      {
        question: "Who was the first Emperor of the Maurya Dynasty?",
        options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Bimbisara"],
        correct: "Chandragupta Maurya",
      },
      {
        question:
          "Which Mughal Emperor is known for his religious tolerance and promoting cultural integration?",
        options: ["Akbar", "Aurangzeb", "Babur", "Jahangir"],
        correct: "Akbar",
      },
      {
        question:
          "Who was the leader of the Non-Cooperation Movement in India?",
        options: [
          "Mahatma Gandhi",
          "Jawaharlal Nehru",
          "Subhas Chandra Bose",
          "Lala Lajpat Rai",
        ],
        correct: "Mahatma Gandhi",
      },
      {
        question:
          "Which Indian leader is famously known for the 'Dandi March'?",
        options: [
          "Sardar Patel",
          "Mahatma Gandhi",
          "Jawaharlal Nehru",
          "Bhagat Singh",
        ],
        correct: "Mahatma Gandhi",
      },
      {
        question:
          "Which Indian historical figure is known for his contributions to modern Indian education and social reforms?",
        options: [
          "Raja Ram Mohan Roy",
          "Swami Vivekananda",
          "Satyajit Ray",
          "Vivekananda",
        ],
        correct: "Raja Ram Mohan Roy",
      },
      {
        question: "Who was the founder of the Indian National Congress?",
        options: [
          "Allan Octavian Hume",
          "Bal Gangadhar Tilak",
          "Dadabhai Naoroji",
          "Surendranath Banerjee",
        ],
        correct: "Allan Octavian Hume",
      },
      {
        question:
          "Which Indian ruler was known for his administration and economic policies during the Gupta period?",
        options: [
          "Chandragupta I",
          "Samudragupta",
          "Chandragupta II",
          "Skandagupta",
        ],
        correct: "Chandragupta II",
      },
      {
        question: "Who was the first female Prime Minister of India?",
        options: [
          "Indira Gandhi",
          "Pratibha Patil",
          "Sarojini Naidu",
          "Vijaya Lakshmi Pandit",
        ],
        correct: "Indira Gandhi",
      },
      {
        question:
          "Which Indian King is associated with the concept of 'Ahimsa'?",
        options: [
          "Chandragupta Maurya",
          "Ashoka",
          "Raja Ram Mohan Roy",
          "Akbar",
        ],
        correct: "Ashoka",
      },
      {
        question:
          "Which famous Indian leader's autobiography is titled 'The Story of My Experiments with Truth'?",
        options: [
          "Jawaharlal Nehru",
          "Mahatma Gandhi",
          "Bhagat Singh",
          "Subhas Chandra Bose",
        ],
        correct: "Mahatma Gandhi",
      },
      {
        question: "Who is the author of the famous Indian epic 'Mahabharata'?",
        options: ["Valmiki", "Vyasa", "Kalidasa", "Bhasa"],
        correct: "Vyasa",
      },
      // Add more questions as needed
    ],
  };
  // Transition from welcome page to profile page
  enterButton.addEventListener("click", function () {
    document.getElementById("welcome-page").classList.add("hidden");
    profilePage.classList.remove("hidden");
  });

  // Handle profile form submission
  readyButton.addEventListener("click", function () {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "" || lastName === "" || email === "") {
      document.getElementById("error-message").classList.remove("hidden");
    } else if (!emailRegex.test(email)) {
      document.getElementById("email-error").classList.remove("hidden");
    } else {
      document.getElementById("error-message").classList.add("hidden");
      document.getElementById("email-error").classList.add("hidden");
      profilePage.classList.add("hidden");
      categoryPage.classList.remove("hidden");
    }
  });

  // Handle category selection
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      categoryItems.forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
      selectedCategory = this.getAttribute("data-category");
      categoryPage.classList.add("hidden");
      questionPage.classList.remove("hidden");

      // Load questions based on selected category
      loadQuestions(selectedCategory);
      startTimer();
    });
  });

  function loadQuestions(category) {
    questions = questionSets[category] || [];
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("total-score").textContent = score;
    displayQuestion(currentQuestionIndex);
  }

  function displayQuestion(index) {
    const question = questions[index];
    if (question) {
      questionText.textContent = question.question;
      answersContainer.innerHTML = "";

      question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.dataset.correct = option === question.correct ? "true" : "false";
        button.addEventListener("click", function () {
          selectAnswer(button);
        });
        answersContainer.appendChild(button);
      });
    }
  }

  function selectAnswer(selectedOption) {
    clearInterval(timer); // Stop the timer
    const correctAnswer = questions[currentQuestionIndex].correct;
    const options = answersContainer.querySelectorAll(".option");

    options.forEach((option) => {
      if (option.dataset.correct === "true") {
        option.classList.add("correct-answer");
        option.style.backgroundColor = "green";
        option.style.color = "white";
      } else if (option === selectedOption) {
        option.classList.add("incorrect-answer");
        option.style.backgroundColor = "red";
        option.style.color = "white";
      }
    });

    if (selectedOption && selectedOption.dataset.correct === "true") {
      score += 10;
    } else if (selectedOption === null) {
      // Timeout case
      score -= 5;
    } else {
      score -= 5;
    }

    document.getElementById("total-score").textContent = score;

    // Move to the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        displayQuestion(currentQuestionIndex);
        startTimer();
      }, 2000);
    } else {
      showScore(score); // Use showScore function instead of endQuiz
    }
  }

  function startTimer() {
    timeLeft = 10;
    timerCount.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerCount.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        selectAnswer(null); // Automatically select answer if time runs out
      }
    }, 1000);
  }

  function showScore(totalScore) {
    // Fade out current page
    const currentPage = document.getElementById("question-page");
    currentPage.classList.add("fade-out");

    // Wait for fade-out animation to complete
    setTimeout(() => {
      currentPage.style.display = "none"; // Hide the current page

      // Show score page
      const scorePage = document.getElementById("score-page");
      scorePage.style.display = "block";
      scorePage.classList.add("fade-in");

      // Display the score
      const scoreDisplay = document.getElementById("score-display");
      scoreDisplay.innerText = `Your Score: ${totalScore}`;

      // Determine and display the message based on the score
      const messageElement = document.getElementById("message");
      if (messageElement) {
        let message;
        if (totalScore >= 0 && totalScore <= 10) {
          message =
            "Looks like you're just warming up. Great things take time—try again!";
        } else if (totalScore > 10 && totalScore <= 50) {
          message =
            "Great progress! You're on the right track—just a bit more to go!";
        } else if (totalScore > 50 && totalScore <= 100) {
          message =
            "Well done! You've really nailed it. You’re almost at the top of your game!";
        }
        messageElement.innerText = message;
      } else {
        console.error("Message element not found");
      }
    }, 1000); // Duration should match the CSS fade-out animation
  }

  restartButton.addEventListener("click", function () {
    scoreContainer.classList.add("hidden");
    categoryPage.classList.remove("hidden");
    document.getElementById("total-score").textContent = "0";
  });
});
