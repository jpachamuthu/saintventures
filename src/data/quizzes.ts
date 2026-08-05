export type QuizQuestion = {
  question: string;
  choices: string[];
  correct: number;
};

export type Quiz = QuizQuestion[];

export const quizzes: Record<string, Quiz> = {
  "st-anthony": [
    {
      question: "What was Anthony's real name when he was a boy?",
      choices: ["Tomas", "Fernando", "Francesco"],
      correct: 1,
    },
    {
      question: "What surprised everyone when Anthony first preached?",
      choices: ["He ran away", "His voice was clear, warm, and wise", "He could not speak at all"],
      correct: 1,
    },
    {
      question: "Who came to visit Anthony while he prayed at night?",
      choices: ["A king on a horse", "A fish wearing a crown", "A little child glowing with light"],
      correct: 2,
    },
  ],
  "st-joan": [
    {
      question: "What job was Joan given?",
      choices: ["Build a new castle", "Feed all the sheep in France", "Help the young prince become king"],
      correct: 2,
    },
    {
      question: "What did Joan carry instead of a weapon?",
      choices: ["A wooden flute", "A white banner covered in flowers", "A golden shield"],
      correct: 1,
    },
    {
      question: "Where was the prince crowned king?",
      choices: ["The cathedral at Reims", "The top of a tall tower", "A small garden"],
      correct: 0,
    },
  ],
  "st-clare": [
    {
      question: "What did Clare's family have?",
      choices: ["A very big ship", "Lots of money and fine clothes", "A whole zoo of animals"],
      correct: 1,
    },
    {
      question: "What sign did Francis give Clare for her new life?",
      choices: ["He taught her to read", "He cut her hair", "He gave her a crown"],
      correct: 1,
    },
    {
      question: "What happened when the soldiers came to San Damiano?",
      choices: ["They turned and ran away", "They asked for bread", "They broke the door down"],
      correct: 0,
    },
  ],
  "st-pio": [
    {
      question: "What does the name Pio mean?",
      choices: ["Strong", "Kind", "Brave"],
      correct: 1,
    },
    {
      question: "What was Padre Pio's favorite place?",
      choices: ["The kitchen", "The garden", "The confessional"],
      correct: 2,
    },
    {
      question: "What did Padre Pio keep saying over and over?",
      choices: ["Always be first", "Pray, hope, and don't worry", "Work hard every day"],
      correct: 1,
    },
  ],
  "st-francis": [
    {
      question: "What did Francis do when he saw a poor man shivering in the cold?",
      choices: ["Gave him his warm cloak", "Rode away quickly", "Called his friends"],
      correct: 0,
    },
    {
      question: "Who did Francis talk to in a field one day?",
      choices: ["A choir of monks", "A group of knights", "A flock of birds"],
      correct: 2,
    },
    {
      question: "What did Francis call the sun?",
      choices: ["Cousin", "Brother", "Friend"],
      correct: 1,
    },
  ],
  "st-therese": [
    {
      question: "What did Therese's family call her?",
      choices: ["The little one", "The brave one", "The quiet one"],
      correct: 0,
    },
    {
      question: "What did Therese call her secret way of growing closer to God?",
      choices: ["Her golden rule", "Her hidden path", "Her little way"],
      correct: 2,
    },
    {
      question: "What did Therese promise to send down from heaven?",
      choices: ["A happy song", "A shower of roses", "A cup of tea"],
      correct: 1,
    },
  ],
  "st-jude": [
    {
      question: "Who was Jude a cousin of?",
      choices: ["The governor", "A fisherman", "Jesus"],
      correct: 2,
    },
    {
      question: "What were people always mixing Jude up with?",
      choices: ["Another apostle also named Judas", "A shepherd boy", "A great king"],
      correct: 0,
    },
    {
      question: "What is St Jude the patron saint of?",
      choices: ["Hopeless causes", "Safe travels", "Good weather"],
      correct: 0,
    },
  ],
  "st-john-baptist": [
    {
      question: "What did John wear while he lived in the wilderness?",
      choices: ["Clothes made of camel hair", "A golden crown", "A royal robe"],
      correct: 0,
    },
    {
      question: "Where did John baptize people?",
      choices: ["The ocean", "The River Jordan", "A garden pond"],
      correct: 1,
    },
    {
      question: "What came down from the sky when Jesus was baptized?",
      choices: ["A dove", "A rainbow", "A small boat"],
      correct: 0,
    },
  ],
  "st-mary-magdalene": [
    {
      question: "What happened to the big stone at Jesus' tomb?",
      choices: ["It was rolled away", "It grew bigger", "It turned to gold"],
      correct: 0,
    },
    {
      question: "Who was the very first person to see Jesus alive?",
      choices: ["Peter", "John", "Mary Magdalene"],
      correct: 2,
    },
    {
      question: "What is Mary Magdalene called?",
      choices: ["Queen of the hills", "Apostle to the apostles", "Keeper of the keys"],
      correct: 1,
    },
  ],
};
