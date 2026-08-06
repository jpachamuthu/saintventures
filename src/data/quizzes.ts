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
    {
      question: "Why did Anthony's stomach flip when he was asked to preach?",
      choices: ["He had missed breakfast", "He was afraid to speak in front of people", "He heard a loud noise"],
      correct: 1,
    },
    {
      question: "When people lose something, they often say a prayer to…",
      choices: ["Ask St Anthony to help find it", "Ride off on a horse", "Wait until spring"],
      correct: 0,
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
    {
      question: "What great city was surrounded by enemies?",
      choices: ["Reims", "Orleans", "Domremy"],
      correct: 1,
    },
    {
      question: "What did Joan say about hurting anyone?",
      choices: ["I will never hurt anyone", "I will fight with a sword", "I will hide from the soldiers"],
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
    {
      question: "What were Clare's sisters called?",
      choices: ["The Poor Ladies", "The Bright Stars", "The Royal Singers"],
      correct: 0,
    },
    {
      question: "St Clare is the patron saint of…",
      choices: ["Television", "Sailing", "Baking bread"],
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
    {
      question: "What did Padre Pio's mother say about him when he was born?",
      choices: ["He was born crying", "He was born smiling", "He was born sleeping"],
      correct: 1,
    },
    {
      question: "What did Padre Pio build for the sick people?",
      choices: ["A big hospital", "A tower of bells", "A garden of roses"],
      correct: 0,
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
    {
      question: "What did Francis call the moon?",
      choices: ["Auntie", "Sister", "Grandma"],
      correct: 1,
    },
    {
      question: "What happened to the hungry wolf when Francis spoke to it gently?",
      choices: ["It ran away forever", "It became gentle like a puppy", "It grew huge and scary"],
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
    {
      question: "Who did Therese travel all the way to Rome to ask?",
      choices: ["The king", "The Pope", "Her grandmother"],
      correct: 1,
    },
    {
      question: "What did Therese say when she was too ill to leave her bed?",
      choices: ["I am entering into life", "I am going to sleep", "I am flying to the moon"],
      correct: 0,
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
    {
      question: "What did Jude write that is still in the Bible today?",
      choices: ["A short letter", "A long poem", "A recipe for bread"],
      correct: 0,
    },
    {
      question: "What brave question did Jude ask Jesus at the last supper?",
      choices: ["Why are we eating fish?", "Lord, why do you show yourself to us?", "When will we get new sandals?"],
      correct: 1,
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
    {
      question: "What happened to Zechariah when he could not believe the angel?",
      choices: ["He could not speak", "He lost his hat", "He fell fast asleep"],
      correct: 0,
    },
    {
      question: "What did John say about the one coming after him?",
      choices: ["I am the greatest", "Someone much greater is coming after me", "Nobody else is coming"],
      correct: 1,
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
    {
      question: "What did Mary carry to the tomb to care for Jesus' body?",
      choices: ["Spices", "Flowers", "A lantern"],
      correct: 0,
    },
    {
      question: "What special job did Jesus give Mary after she saw him alive?",
      choices: ["To guard the empty tomb", "To go and tell the good news", "To bake the bread"],
      correct: 1,
    },
  ],
  "st-fulgentius": [
    {
      question: "What does the name Fulgentius mean?",
      choices: ["Brave and strong", "Bright and radiant", "Tall and fast"],
      correct: 1,
    },
    {
      question: "Who taught young Fulgentius to speak Greek?",
      choices: ["His father", "His mother", "His king"],
      correct: 1,
    },
    {
      question: "What did Fulgentius give up to follow God?",
      choices: ["His rich, easy life", "His friends' games", "His pet donkey"],
      correct: 0,
    },
    {
      question: "What did Fulgentius do when the faraway king sent him to an island?",
      choices: ["He grumbled all day", "He kept praying and writing kind letters", "He ran away into the sea"],
      correct: 1,
    },
    {
      question: "What did the people hold over Fulgentius' head when he came home?",
      choices: ["A big umbrella", "Their cloaks", "A golden roof"],
      correct: 1,
    },
  ],
  "st-macarius": [
    {
      question: "What did Macarius sell at his stall in Alexandria?",
      choices: ["Fish", "Fruit", "Blankets"],
      correct: 1,
    },
    {
      question: "What was the desert place called where Macarius lived?",
      choices: ["The Cells", "The City", "The Vineyard"],
      correct: 0,
    },
    {
      question: "What happened to the bunch of grapes Macarius gave away?",
      choices: ["It was eaten in one bite", "It came back to him at the end", "It fell into the sand"],
      correct: 1,
    },
    {
      question: "What did Macarius do when a proud thought told him to show off?",
      choices: ["He carried a heavy basket of sand to stay humble", "He went to Rome to be admired", "He stopped praying"],
      correct: 0,
    },
    {
      question: "What did Macarius do for the blind little hyena cub?",
      choices: ["He chased it away", "He prayed and touched its eyes so it could see", "He fed it grapes"],
      correct: 1,
    },
  ],
  "st-genevieve": [
    {
      question: "Where was Genevieve born?",
      choices: ["Nanterre", "Rome", "Lisbon"],
      correct: 0,
    },
    {
      question: "What did Bishop Germanus give Genevieve?",
      choices: ["A small bronze cross", "A golden crown", "A baby sheep"],
      correct: 0,
    },
    {
      question: "When Attila's army was coming, what did Genevieve tell the people to do?",
      choices: ["Run away quickly", "Stay and pray", "Hide in the hills"],
      correct: 1,
    },
    {
      question: "What happened to Genevieve's candle in the storm?",
      choices: ["It went out forever", "It lit by itself and kept burning", "It turned into a star"],
      correct: 1,
    },
    {
      question: "When famine came, how did Genevieve help feed Paris?",
      choices: ["She sailed to bring grain and made bread", "She moved everyone to another city", "She asked for one big feast"],
      correct: 0,
    },
  ],
  "st-mariam": [
    {
      question: "What does the name Mariam mean?",
      choices: ["Mary", "Rose", "Star"],
      correct: 0,
    },
    {
      question: "Who took Mariam in when her parents died?",
      choices: ["The king", "A big sister", "A kind uncle"],
      correct: 2,
    },
    {
      question: "Who did Mariam believe the gentle lady in blue was?",
      choices: ["A fairy princess", "Mary, the mother of Jesus", "Her own aunt"],
      correct: 1,
    },
    {
      question: "What new name did Mariam take when she became a nun?",
      choices: ["Mary of the Hills", "Mary of Jesus Crucified", "Mary of the Lamp"],
      correct: 1,
    },
    {
      question: "In which town did Mariam help start a new monastery?",
      choices: ["Rome", "London", "Bethlehem"],
      correct: 2,
    },
  ],
  "st-christina": [
    {
      question: "What did Christina do to help her family after her parents died?",
      choices: ["She looked after the sheep", "She opened a shop", "She joined the army"],
      correct: 0,
    },
    {
      question: "What happened in the middle of Christina's funeral?",
      choices: ["The sky turned green", "She sat up and floated to the rafters", "The church filled with doves"],
      correct: 1,
    },
    {
      question: "Which sad place did God show Christina?",
      choices: ["The bottom of the sea", "A dark cave", "Purgatory"],
      correct: 2,
    },
    {
      question: "Why did Christina wear rags and live with no home?",
      choices: ["Because she lost everything", "To help souls and turn hearts back to God", "Because she loved adventures"],
      correct: 1,
    },
    {
      question: "What did Christina do every day for the souls and for sinners?",
      choices: ["She prayed for them", "She collected coins", "She hid in the hills"],
      correct: 0,
    },
  ],
};
