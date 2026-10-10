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
      choices: ["He could not speak at all", "He ran away", "His voice was clear, warm, and wise"],
      correct: 2,
    },
    {
      question: "Who came to visit Anthony while he prayed at night?",
      choices: ["A fish wearing a crown", "A little child glowing with light", "A king on a horse"],
      correct: 1,
    },
    {
      question: "Why did Anthony's stomach flip when he was asked to preach?",
      choices: ["He had missed breakfast", "He was afraid to speak in front of people", "He heard a loud noise"],
      correct: 1,
    },
    {
      question: "When people lose something, they often say a prayer to…",
      choices: ["Wait until spring", "Ask St Anthony to help find it", "Ride off on a horse"],
      correct: 1,
    },
  ],
  "st-joan": [
    {
      question: "What job was Joan given?",
      choices: ["Help the young prince become king", "Build a new castle", "Feed all the sheep in France"],
      correct: 0,
    },
    {
      question: "What did Joan carry instead of a weapon?",
      choices: ["A white banner covered in flowers", "A golden shield", "A wooden flute"],
      correct: 0,
    },
    {
      question: "Where was the prince crowned king?",
      choices: ["The cathedral at Reims", "The top of a tall tower", "A small garden"],
      correct: 0,
    },
    {
      question: "What great city was surrounded by enemies?",
      choices: ["Domremy", "Reims", "Orleans"],
      correct: 2,
    },
    {
      question: "What did Joan say about hurting anyone?",
      choices: ["I will fight with a sword", "I will hide from the soldiers", "I will never hurt anyone"],
      correct: 2,
    },
  ],
  "st-clare": [
    {
      question: "What did Clare's family have?",
      choices: ["Lots of money and fine clothes", "A whole zoo of animals", "A very big ship"],
      correct: 0,
    },
    {
      question: "What sign did Francis give Clare for her new life?",
      choices: ["He taught her to read", "He cut her hair", "He gave her a crown"],
      correct: 1,
    },
    {
      question: "What happened when the soldiers came to San Damiano?",
      choices: ["They broke the door down", "They turned and ran away", "They asked for bread"],
      correct: 1,
    },
    {
      question: "What were Clare's sisters called?",
      choices: ["The Bright Stars", "The Royal Singers", "The Poor Ladies"],
      correct: 2,
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
      choices: ["The confessional", "The kitchen", "The garden"],
      correct: 0,
    },
    {
      question: "What did Padre Pio keep saying over and over?",
      choices: ["Pray, hope, and don't worry", "Work hard every day", "Always be first"],
      correct: 0,
    },
    {
      question: "What did Padre Pio's mother say about him when he was born?",
      choices: ["He was born crying", "He was born smiling", "He was born sleeping"],
      correct: 1,
    },
    {
      question: "What did Padre Pio build for the sick people?",
      choices: ["A garden of roses", "A big hospital", "A tower of bells"],
      correct: 1,
    },
  ],
  "st-francis": [
    {
      question: "What did Francis do when he saw a poor man shivering in the cold?",
      choices: ["Called his friends", "Gave him his warm cloak", "Rode away quickly"],
      correct: 1,
    },
    {
      question: "Who did Francis talk to in a field one day?",
      choices: ["A group of knights", "A flock of birds", "A choir of monks"],
      correct: 1,
    },
    {
      question: "What did Francis call the sun?",
      choices: ["Cousin", "Brother", "Friend"],
      correct: 1,
    },
    {
      question: "What did Francis call the moon?",
      choices: ["Grandma", "Auntie", "Sister"],
      correct: 2,
    },
    {
      question: "What happened to the hungry wolf when Francis spoke to it gently?",
      choices: ["It became gentle like a puppy", "It grew huge and scary", "It ran away forever"],
      correct: 0,
    },
  ],
  "st-therese": [
    {
      question: "What did Therese's family call her?",
      choices: ["The brave one", "The quiet one", "The little one"],
      correct: 2,
    },
    {
      question: "What did Therese call her secret way of growing closer to God?",
      choices: ["Her golden rule", "Her hidden path", "Her little way"],
      correct: 2,
    },
    {
      question: "What did Therese promise to send down from heaven?",
      choices: ["A cup of tea", "A happy song", "A shower of roses"],
      correct: 2,
    },
    {
      question: "Who did Therese travel all the way to Rome to ask?",
      choices: ["The Pope", "Her grandmother", "The king"],
      correct: 0,
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
      choices: ["A great king", "Another apostle also named Judas", "A shepherd boy"],
      correct: 1,
    },
    {
      question: "What is St Jude the patron saint of?",
      choices: ["Safe travels", "Good weather", "Hopeless causes"],
      correct: 2,
    },
    {
      question: "What did Jude write that is still in the Bible today?",
      choices: ["A short letter", "A long poem", "A recipe for bread"],
      correct: 0,
    },
    {
      question: "What brave question did Jude ask Jesus at the last supper?",
      choices: ["When will we get new sandals?", "Why are we eating fish?", "Lord, why do you show yourself to us?"],
      correct: 2,
    },
  ],
  "st-john-baptist": [
    {
      question: "What did John wear while he lived in the wilderness?",
      choices: ["A royal robe", "Clothes made of camel hair", "A golden crown"],
      correct: 1,
    },
    {
      question: "Where did John baptize people?",
      choices: ["The River Jordan", "A garden pond", "The ocean"],
      correct: 0,
    },
    {
      question: "What came down from the sky when Jesus was baptized?",
      choices: ["A dove", "A rainbow", "A small boat"],
      correct: 0,
    },
    {
      question: "What happened to Zechariah when he could not believe the angel?",
      choices: ["He fell fast asleep", "He could not speak", "He lost his hat"],
      correct: 1,
    },
    {
      question: "What did John say about the one coming after him?",
      choices: ["Someone much greater is coming after me", "Nobody else is coming", "I am the greatest"],
      correct: 0,
    },
  ],
  "st-mary-magdalene": [
    {
      question: "What happened to the big stone at Jesus' tomb?",
      choices: ["It grew bigger", "It turned to gold", "It was rolled away"],
      correct: 2,
    },
    {
      question: "Who was the very first person to see Jesus alive?",
      choices: ["Peter", "John", "Mary Magdalene"],
      correct: 2,
    },
    {
      question: "What is Mary Magdalene called?",
      choices: ["Keeper of the keys", "Queen of the hills", "Apostle to the apostles"],
      correct: 2,
    },
    {
      question: "What did Mary carry to the tomb to care for Jesus' body?",
      choices: ["Flowers", "A lantern", "Spices"],
      correct: 2,
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
      choices: ["His king", "His father", "His mother"],
      correct: 2,
    },
    {
      question: "What did Fulgentius give up to follow God?",
      choices: ["His friends' games", "His pet donkey", "His rich, easy life"],
      correct: 2,
    },
    {
      question: "What did Fulgentius do when the faraway king sent him to an island?",
      choices: ["He grumbled all day", "He kept praying and writing kind letters", "He ran away into the sea"],
      correct: 1,
    },
    {
      question: "What did the people hold over Fulgentius' head when he came home?",
      choices: ["A golden roof", "A big umbrella", "Their cloaks"],
      correct: 2,
    },
  ],
  "st-macarius": [
    {
      question: "What did Macarius sell at his stall in Alexandria?",
      choices: ["Blankets", "Fish", "Fruit"],
      correct: 2,
    },
    {
      question: "What was the desert place called where Macarius lived?",
      choices: ["The City", "The Vineyard", "The Cells"],
      correct: 2,
    },
    {
      question: "What happened to the bunch of grapes Macarius gave away?",
      choices: ["It was eaten in one bite", "It came back to him at the end", "It fell into the sand"],
      correct: 1,
    },
    {
      question: "What did Macarius do when a proud thought told him to show off?",
      choices: ["He stopped praying", "He carried a heavy basket of sand to stay humble", "He went to Rome to be admired"],
      correct: 1,
    },
    {
      question: "What did Macarius do for the blind little hyena cub?",
      choices: ["He prayed and touched its eyes so it could see", "He fed it grapes", "He chased it away"],
      correct: 0,
    },
  ],
  "st-genevieve": [
    {
      question: "Where was Genevieve born?",
      choices: ["Rome", "Lisbon", "Nanterre"],
      correct: 2,
    },
    {
      question: "What did Bishop Germanus give Genevieve?",
      choices: ["A small bronze cross", "A golden crown", "A baby sheep"],
      correct: 0,
    },
    {
      question: "When Attila's army was coming, what did Genevieve tell the people to do?",
      choices: ["Hide in the hills", "Run away quickly", "Stay and pray"],
      correct: 2,
    },
    {
      question: "What happened to Genevieve's candle in the storm?",
      choices: ["It lit by itself and kept burning", "It turned into a star", "It went out forever"],
      correct: 0,
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
      choices: ["A kind uncle", "The king", "A big sister"],
      correct: 0,
    },
    {
      question: "Who did Mariam believe the gentle lady in blue was?",
      choices: ["Mary, the mother of Jesus", "Her own aunt", "A fairy princess"],
      correct: 0,
    },
    {
      question: "What new name did Mariam take when she became a nun?",
      choices: ["Mary of the Hills", "Mary of Jesus Crucified", "Mary of the Lamp"],
      correct: 1,
    },
    {
      question: "In which town did Mariam help start a new monastery?",
      choices: ["Bethlehem", "Rome", "London"],
      correct: 0,
    },
  ],
  "st-christina": [
    {
      question: "What did Christina do to help her family after her parents died?",
      choices: ["She joined the army", "She looked after the sheep", "She opened a shop"],
      correct: 1,
    },
    {
      question: "What happened in the middle of Christina's funeral?",
      choices: ["She sat up and floated to the rafters", "The church filled with doves", "The sky turned green"],
      correct: 0,
    },
    {
      question: "Which sad place did God show Christina?",
      choices: ["The bottom of the sea", "A dark cave", "Purgatory"],
      correct: 2,
    },
    {
      question: "Why did Christina wear rags and live with no home?",
      choices: ["Because she loved adventures", "Because she lost everything", "To help souls and turn hearts back to God"],
      correct: 2,
    },
    {
      question: "What did Christina do every day for the souls and for sinners?",
      choices: ["She collected coins", "She hid in the hills", "She prayed for them"],
      correct: 2,
    },
  ],
  "st-mary-mackillop": [
    {
      question: "Where was Mary MacKillop born?",
      choices: ["Rome, Italy", "Dublin, Ireland", "Melbourne, Australia"],
      correct: 2,
    },
    {
      question: "What did Mary love doing for the children of the bush?",
      choices: ["Teaching them to read and write", "Giving them gold coins", "Taking them on ships"],
      correct: 0,
    },
    {
      question: "Where did the very first St Joseph's school open?",
      choices: ["In a big castle", "In a golden church", "In a dusty old stable"],
      correct: 2,
    },
    {
      question: "What did the Sisters of St Joseph promise to be?",
      choices: ["Rich and famous", "Brave knights", "Poor like Jesus"],
      correct: 2,
    },
    {
      question: "Mary MacKillop became the first saint from which country?",
      choices: ["Australia", "Ireland", "England"],
      correct: 0,
    },
  ],
  "st-carlo-acutis": [
    {
      question: "Which famous brother and sister did Carlo have?",
      choices: ["He had no brothers or sisters", "Two older brothers", "A baby owl"],
      correct: 0,
    },
    {
      question: "Which of these did Carlo love?",
      choices: ["Sleeping all day", "Computers, football and his dog", "Collecting shiny coins"],
      correct: 1,
    },
    {
      question: "What did Carlo write a famous website about?",
      choices: ["Miracles of the Eucharist", "Football matches", "Videos"],
      correct: 0,
    },
    {
      question: "What did Carlo say about being on his phone?",
      choices: ["Use it for nothing good", "Don't ever touch it", "Use it for something good"],
      correct: 2,
    },
    {
      question: "What happened in 2025?",
      choices: ["Carlo started a band", "Wake-up server", "The Pope made Carlo a saint"],
      correct: 2,
    },
  ],
  "st-peter": [
    {
      question: "What was Peter's job before he followed Jesus?",
      choices: ["He was a soldier", "He was a fisherman", "He was a baker"],
      correct: 1,
    },
    {
      question: "What did Jesus name Simon?",
      choices: ["David, which means Strong", "John, which means Kind", "Peter, which means Rock"],
      correct: 2,
    },
    {
      question: "What did Peter say when he walked on the water?",
      choices: ["'I am scared forever'", "'If it is really you, tell me to come to you'", "'Let me swim back'"],
      correct: 1,
    },
    {
      question: "What did Jesus tell Peter to do when he asked 'Do you love me?'",
      choices: ["'Build a big tower'", "'Feed my sheep'", "'Sell my boat'"],
      correct: 1,
    },
    {
      question: "What happened when Peter was captured in Rome?",
      choices: ["He asked to be crucified upside down", "He became the king", "He escaped on a horse"],
      correct: 0,
    },
  ],
  "st-andrew": [
    {
      question: "What was Andrew's job before he followed Jesus?",
      choices: ["He was a baker", "He was a soldier", "He was a fisherman"],
      correct: 2,
    },
    {
      question: "Who was the very first person to follow Jesus?",
      choices: ["Peter", "Andrew", "John"],
      correct: 1,
    },
    {
      question: "Who did Andrew run to fetch when he found Jesus?",
      choices: ["His uncle Thomas", "His brother Simon", "His cousin James"],
      correct: 1,
    },
    {
      question: "What shape was the cross Andrew was tied to?",
      choices: ["A round circle", "An upside-down letter V", "A letter X shape"],
      correct: 2,
    },
    {
      question: "What is Andrew honoured as the patron of?",
      choices: ["Scotland, Greece and Russia", "Only one small town", "No one at all"],
      correct: 0,
    },
  ],
  "st-james-greater": [
    {
      question: "What did Jesus nickname James and his brother John?",
      choices: ["The Sons of Thunder", "The Sons of the Sea", "The Sons of Music"],
      correct: 0,
    },
    {
      question: "What was James and John's father called?",
      choices: ["Zacchaeus", "Zebedee", "Zechariah"],
      correct: 1,
    },
    {
      question: "Who was the first apostle to give his life for Jesus?",
      choices: ["Thomas", "Bartholomew", "James the Greater"],
      correct: 2,
    },
    {
      question: "Where did people find James' tomb long ago?",
      choices: ["A field in Spain where a star shone", "A cave under the sea", "A palace in Rome"],
      correct: 0,
    },
    {
      question: "What country is St James the patron of?",
      choices: ["Egypt", "Spain", "China"],
      correct: 1,
    },
  ],
  "st-john": [
    {
      question: "What is John often called?",
      choices: ["The strongest disciple", "The disciple whom Jesus loved", "The loudest disciple"],
      correct: 1,
    },
    {
      question: "Who did John look after when Jesus died on the cross?",
      choices: ["His grandfather", "A poor farmer", "Mary, the mother of Jesus"],
      correct: 2,
    },
    {
      question: "What did John always say to people when he was old?",
      choices: ["Love one another", "Work harder every day", "Tell me a joke"],
      correct: 0,
    },
    {
      question: "Which book about visions did John write while on Patmos?",
      choices: ["The book of songs", "Revelation", "The book of maps"],
      correct: 1,
    },
    {
      question: "How did John die?",
      choices: ["In a great battle", "On a long voyage", "Peacefully as a very old man"],
      correct: 2,
    },
  ],
  "st-philip": [
    {
      question: "What town was Philip from?",
      choices: ["Nazareth", "Jericho", "Bethsaida"],
      correct: 2,
    },
    {
      question: "What did Jesus say to Philip?",
      choices: ["Follow me", "Sell your boat", "Feed the birds"],
      correct: 0,
    },
    {
      question: "What did Philip say to his friend Nathanael?",
      choices: ["Stay at home", "Come and see", "Run away fast"],
      correct: 1,
    },
    {
      question: "What did Philip ask Jesus at the last supper?",
      choices: ["Give us more bread", "Take us back home", "Show us the Father"],
      correct: 2,
    },
    {
      question: "Who did Philip travel far away with?",
      choices: ["Bartholomew", "Matthew", "Andrew"],
      correct: 0,
    },
  ],
  "st-bartholomew": [
    {
      question: "What other name does Bartholomew go by?",
      choices: ["Nathanael", "Nathan", "Barnabas"],
      correct: 0,
    },
    {
      question: "Where was Bartholomew sitting when Jesus saw him?",
      choices: ["By a fast river", "Under a fig tree", "On a tall mountain"],
      correct: 1,
    },
    {
      question: "What did Jesus say about Bartholomew?",
      choices: ["A loud and noisy man", "A sleepy fisherman", "A true Israelite with no deceit"],
      correct: 2,
    },
    {
      question: "What did Bartholomew call Jesus when he believed?",
      choices: ["Son of God, king of Israel", "A wise old teacher", "My best fishing partner"],
      correct: 0,
    },
    {
      question: "Which far land did Bartholomew preach in?",
      choices: ["Australia", "A kingdom in the East", "England"],
      correct: 1,
    },
  ],
  "st-thomas": [
    {
      question: "What brave thing did Thomas once say to his friends?",
      choices: ["Let us go fishing instead", "Let us also go so we may die with him", "Let us wait until spring"],
      correct: 1,
    },
    {
      question: "Why did Thomas first refuse to believe Jesus rose?",
      choices: ["He was too sleepy", "He was angry at Peter", "He had not seen the nail marks"],
      correct: 2,
    },
    {
      question: "What did Thomas cry out when he saw Jesus?",
      choices: ["My Lord and my God", "My boat and my net", "My family and my home"],
      correct: 0,
    },
    {
      question: "Where does tradition say Thomas took the good news?",
      choices: ["Norway", "India", "Spain"],
      correct: 1,
    },
    {
      question: "What does St Thomas teach us to bring to Jesus?",
      choices: ["Our heavy bags", "Our biggest crowds", "Our honest doubts"],
      correct: 2,
    },
  ],
  "st-matthew": [
    {
      question: "What was Matthew's job before he followed Jesus?",
      choices: ["He baked bread", "He shepherded sheep", "He collected taxes"],
      correct: 2,
    },
    {
      question: "What did Matthew leave behind when Jesus called him?",
      choices: ["His tax booth", "His family", "His fishing boat"],
      correct: 0,
    },
    {
      question: "What special book did Matthew write?",
      choices: ["A story about pirates", "The Gospel of Matthew", "The book of numbers"],
      correct: 1,
    },
    {
      question: "Who did Matthew invite to his dinner party?",
      choices: ["Only the king's family", "Only his neighbours' children", "Many tax collectors"],
      correct: 2,
    },
    {
      question: "What did Jesus say when people complained he ate with sinners?",
      choices: ["I came to call sinners", "I made a mistake", "Please go away"],
      correct: 0,
    },
  ],
  "st-james-less": [
    {
      question: "What was James called because he was the younger James?",
      choices: ["James the Less", "James the Great", "James the Old"],
      correct: 0,
    },
    {
      question: "Which city did James the Less lead the Church in?",
      choices: ["Babylon", "Jerusalem", "Rome"],
      correct: 1,
    },
    {
      question: "What did James say faith without good works is like?",
      choices: ["A bright star", "A deep ocean", "Something dead"],
      correct: 2,
    },
    {
      question: "What wise advice is in the letter of James?",
      choices: ["Be quick to listen and slow to speak", "Always speak first", "Never listen to anyone"],
      correct: 0,
    },
    {
      question: "What quality did people admire in James the Less?",
      choices: ["His big house", "His humility and holiness", "His loud voice"],
      correct: 1,
    },
  ],
  "st-simon-zealot": [
    {
      question: "What group was Simon said to belong to?",
      choices: ["The Sailors", "The Zealots", "The Shepherds"],
      correct: 1,
    },
    {
      question: "What change did Jesus make in Simon?",
      choices: ["From love to anger", "From calm to noise", "From fighting to loving"],
      correct: 2,
    },
    {
      question: "What did Simon learn about Jesus' kingdom?",
      choices: ["It is won by love, not swords", "It needs many armies", "It comes from gold"],
      correct: 0,
    },
    {
      question: "Which apostle is tradition said Simon travelled with?",
      choices: ["Andrew", "Jude Thaddeus", "Thomas"],
      correct: 1,
    },
    {
      question: "What does St Simon the Zealot show us about our passions?",
      choices: ["We should hide them", "They only cause trouble", "God can turn them into holy love"],
      correct: 2,
    },
  ],
  "st-matthias": [
    {
      question: "Why was there an empty place among the twelve apostles?",
      choices: ["Peter moved away", "John fell asleep", "Judas had betrayed Jesus"],
      correct: 2,
    },
    {
      question: "What did the apostles do before choosing the new apostle?",
      choices: ["They prayed", "They sold their boats", "They left the city"],
      correct: 0,
    },
    {
      question: "How did they let God choose the new apostle?",
      choices: ["By asking the king", "By casting lots after praying", "By holding a race"],
      correct: 1,
    },
    {
      question: "Who was chosen to take the empty place?",
      choices: ["Barnabas", "Silas", "Matthias"],
      correct: 2,
    },
    {
      question: "What must the new apostle have done all along?",
      choices: ["Followed Jesus from the beginning", "Collected taxes", "Climbed every mountain"],
      correct: 0,
    },
  ],
  "st-mark": [
    {
      question: "Who was Mark's great teacher?",
      choices: ["Peter, the leader of the apostles", "A famous sea captain", "The village baker"],
      correct: 0,
    },
    {
      question: "What is the Gospel of Mark?",
      choices: ["A book about farming", "The shortest of the four Gospels", "The longest book ever written"],
      correct: 1,
    },
    {
      question: "Where did Mark become the first bishop?",
      choices: ["Rome", "Bethlehem", "Alexandria"],
      correct: 2,
    },
    {
      question: "What does the word Evangelist mean?",
      choices: ["A bearer of good news", "A builder of boats", "A keeper of coins"],
      correct: 0,
    },
    {
      question: "Who is St Mark the patron of?",
      choices: ["Bakers", "Writers", "Fishermen"],
      correct: 1,
    },
  ],
  "st-luke": [
    {
      question: "What was Luke's job before he followed Jesus?",
      choices: ["He was a shepherd", "He was a doctor", "He was a soldier"],
      correct: 1,
    },
    {
      question: "Who was Luke's dear companion on his travels?",
      choices: ["St Peter", "St John", "St Paul"],
      correct: 2,
    },
    {
      question: "Which beautiful story is only found in Luke's Gospel?",
      choices: ["The Good Samaritan", "The Great Flood", "The Tower of Babel"],
      correct: 0,
    },
    {
      question: "Who did Luke is said to have painted pictures of?",
      choices: ["A village baker", "Mary, the mother of Jesus", "Herod the king"],
      correct: 1,
    },
    {
      question: "What second book did Luke write?",
      choices: ["A book of medicines", "A map of the world", "The Acts of the Apostles"],
      correct: 2,
    },
  ],
  "st-theresa-calcutta": [
    {
      question: "What was Mother Teresa called before?",
      choices: ["Anna", "Alice", "Agnes"],
      correct: 2,
    },
    {
      question: "What is the family of sisters Mother Teresa started called?",
      choices: ["Missionaries of Charity", "The Quiet Gardeners", "The Royal Helpers"],
      correct: 0,
    },
    {
      question: "What did she open a home for?",
      choices: ["People who fish", "The sick and dying who had no one", "The king's horses"],
      correct: 1,
    },
    {
      question: "What was her famous secret of holy life?",
      choices: ["Do big things loudly", "Do nothing at all", "Do small things with great love"],
      correct: 2,
    },
    {
      question: "In which year was she declared a saint?",
      choices: ["2016", "2000", "1997"],
      correct: 0,
    },
  ],
  "st-maria-goretti": [
    {
      question: "How old was Maria Goretti when she died?",
      choices: ["Eleven", "Twenty", "Fifty"],
      correct: 0,
    },
    {
      question: "What did Maria say even while she was hurt?",
      choices: ["I am too scared to pray", "I forgive him and want him in heaven", "I will escape to Rome"],
      correct: 1,
    },
    {
      question: "What did Maria do every day?",
      choices: ["She hid in the attic", "She collected coins", "Her chores and her prayers"],
      correct: 2,
    },
    {
      question: "Who is St Maria the patron saint of?",
      choices: ["Young people", "Sea captains", "Astronomers"],
      correct: 0,
    },
    {
      question: "What is the message of Maria's story?",
      choices: ["Running away is wisest", "Love and forgiveness are stronger than hate", "Being rich is best"],
      correct: 1,
    },
  ],
  "st-augustine": [
    {
      question: "What did Augustine keep saying when told to do the right thing?",
      choices: ["Ask someone else", "Later… just not yet", "Yes, right away"],
      correct: 1,
    },
    {
      question: "What did Monica do for seventeen years?",
      choices: ["Prayed and wept for her son", "Hid in a garden", "Sailed around the world"],
      correct: 0,
    },
    {
      question: "What did the bishop tell Monica?",
      choices: ["The child of so many tears will never perish", "Give up on your son", "Move to Rome at once"],
      correct: 0,
    },
    {
      question: "What voice did Augustine hear in the garden?",
      choices: ["Thunder in the clouds", "A roaring lion", "A child singing, take up and read"],
      correct: 2,
    },
    {
      question: "What does Augustine's story teach us?",
      choices: ["No one is ever too lost to be found", "Mothers should stop praying", "Cleverness is enough"],
      correct: 0,
    },
  ],
  "st-monica": [
    {
      question: "Who did Monica marry?",
      choices: ["A quiet fisherman", "The bishop of Milan", "Patricius, who had a fiery temper"],
      correct: 2,
    },
    {
      question: "How did Monica answer her husband's anger?",
      choices: ["She shouted even louder", "With quiet kindness", "She ran away from home"],
      correct: 1,
    },
    {
      question: "How long did Monica pray for Augustine?",
      choices: ["A single night", "One week", "Seventeen years"],
      correct: 2,
    },
    {
      question: "What did Monica do when Augustine sailed to Italy?",
      choices: ["She got on a ship and followed him", "She moved to Egypt", "She forgot about him"],
      correct: 0,
    },
    {
      question: "Who is St Monica the patron saint of?",
      choices: ["Sailors", "Mothers", "Bakers"],
      correct: 1,
    },
  ],
  "st-josephine-bakhita": [
    {
      question: "What does the name Bakhita mean?",
      choices: ["Fortunate", "Little fish", "Runaway"],
      correct: 0,
    },
    {
      question: "Where was Bakhita born?",
      choices: ["In France", "In Italy", "In Sudan"],
      correct: 2,
    },
    {
      question: "Who treated Bakhita with gentleness?",
      choices: ["The slave traders", "A circus lion", "Callisto Legnani"],
      correct: 2,
    },
    {
      question: "What name did she take when she was baptized?",
      choices: ["Clare", "Josephine", "Agnes"],
      correct: 1,
    },
    {
      question: "What did Bakhita say about the men who stole her?",
      choices: ["She would sail away forever", "She would forgive them and kiss their hands", "She would never speak again"],
      correct: 1,
    },
  ],
  "st-vincent-de-paul": [
    {
      question: "What job did young Vincent do as a boy?",
      choices: ["He baked bread", "He herded sheep", "He sailed ships"],
      correct: 1,
    },
    {
      question: "What changed Vincent's life?",
      choices: ["A dying man's confession", "Finding a gold coin", "Winning a race"],
      correct: 0,
    },
    {
      question: "Who helped Vincent start the Daughters of Charity?",
      choices: ["Louise", "His sheepdog", "The king of France"],
      correct: 0,
    },
    {
      question: "What did Vincent call the poor?",
      choices: ["Strangers", "A nuisance", "Our masters"],
      correct: 2,
    },
    {
      question: "Who is St Vincent the patron saint of?",
      choices: ["Astronauts", "Chefs", "Charities"],
      correct: 2,
    },
  ],
  "st-augustine-zhao-rong": [
    {
      question: "What was Augustine's job before he converted?",
      choices: ["A soldier who guarded prisoners", "A fisherman", "A baker"],
      correct: 0,
    },
    {
      question: "What convinced Augustine to become Christian?",
      choices: ["The bravery of the Christian prisoners", "A bag of gold", "A thunderstorm"],
      correct: 0,
    },
    {
      question: "What did Augustine become?",
      choices: ["A palace guard", "A sailor", "A Catholic priest"],
      correct: 2,
    },
    {
      question: "What happened when the soldiers caught Father Augustine?",
      choices: ["He was thrown in prison but refused to deny Christ", "He ran away to Rome", "He gave up his faith at once"],
      correct: 0,
    },
    {
      question: "How many martyrs of China were declared saints with him?",
      choices: ["Twelve", "One hundred and twenty", "One thousand"],
      correct: 1,
    },
  ],
  "st-lawrence-ruiz": [
    {
      question: "Where was Lawrence Ruiz born?",
      choices: ["In Manila", "In Rome", "In Paris"],
      correct: 0,
    },
    {
      question: "What was Lawrence's church job as a boy?",
      choices: ["Polishing the organ", "Ringing the biggest bell", "Altar server"],
      correct: 2,
    },
    {
      question: "Why did Lawrence have to flee?",
      choices: ["He was falsely accused of a crime", "He missed his boat", "He wanted an adventure"],
      correct: 0,
    },
    {
      question: "What famous words did Lawrence say?",
      choices: ["If I had a thousand lives, I would offer them all to God", "Take me back to Manila", "I give up"],
      correct: 0,
    },
    {
      question: "What makes Lawrence special in history?",
      choices: ["He invented fireworks", "He was the tallest saint", "He was the first Filipino saint"],
      correct: 2,
    },
  ],
  "st-michael-archangel": [
    {
      question: "What does the name Michael mean?",
      choices: ["Keeper of keys", "Who is like God?", "Bringer of lunch"],
      correct: 1,
    },
    {
      question: "Which angel rebelled against God?",
      choices: ["Lucifer", "Raphael", "Gabriel"],
      correct: 0,
    },
    {
      question: "What happened in the war in heaven?",
      choices: ["Michael won and the rebels were cast out", "Everyone took a nap", "The stars fell down"],
      correct: 0,
    },
    {
      question: "Who especially asks St Michael for protection?",
      choices: ["Fishermen only", "Soldiers and police officers", "Bakers and chefs"],
      correct: 1,
    },
    {
      question: "What does St Michael's victory teach us?",
      choices: ["God always wins", "Battles are fun", "Evil always wins"],
      correct: 0,
    },
  ],
  "st-gabriel-archangel": [
    {
      question: "What does the name Gabriel mean?",
      choices: ["Loud trumpet", "Fast runner", "God is my strength"],
      correct: 2,
    },
    {
      question: "Who did Gabriel visit in the Temple?",
      choices: ["Old priest Zechariah", "A Roman soldier", "A shepherd boy"],
      correct: 0,
    },
    {
      question: "How did Gabriel greet Mary?",
      choices: ["Hide quickly!", "Hail, full of grace!", "Good luck up there!"],
      correct: 1,
    },
    {
      question: "What did Mary answer?",
      choices: ["Come back tomorrow", "Ask someone else", "Let it be done to me"],
      correct: 2,
    },
    {
      question: "Where do we repeat Gabriel's words today?",
      choices: ["In the Hail Mary prayer", "In a birthday song", "On a treasure map"],
      correct: 0,
    },
  ],
  "st-raphael-archangel": [
    {
      question: "What does the name Raphael mean?",
      choices: ["God heals", "Big fish", "Long road"],
      correct: 0,
    },
    {
      question: "Who did Raphael guide on a journey?",
      choices: ["The king's army", "Tobias", "A lost camel"],
      correct: 1,
    },
    {
      question: "What leaped out of the river at Tobias?",
      choices: ["A golden crown", "A singing frog", "A giant fish"],
      correct: 2,
    },
    {
      question: "What happened when Tobias used the fish medicine?",
      choices: ["Tobit's blindness was healed", "It started to rain", "Everyone fell asleep"],
      correct: 0,
    },
    {
      question: "Who is St Raphael the patron saint of?",
      choices: ["Blacksmiths", "Travellers", "Librarians"],
      correct: 1,
    },
  ],
  "st-john-paul-ii": [
    {
      question: "What was John Paul II called as a boy, and where was he born?",
      choices: ["Patrick, in Ireland", "Karol, in Poland", "Giovanni, in Rome"],
      correct: 1,
    },
    {
      question: "What did he say from the balcony when elected pope?",
      choices: ["Good night!", "Watch and learn!", "Be not afraid!"],
      correct: 2,
    },
    {
      question: "What happened to the Pope in 1981?",
      choices: ["He was shot, survived, and forgave the gunman", "He retired to a farm", "He learned to fly"],
      correct: 0,
    },
    {
      question: "What great gathering did he start?",
      choices: ["A cooking contest", "World Youth Day", "A football league"],
      correct: 1,
    },
    {
      question: "What was special about his election as pope?",
      choices: ["He was the youngest ever", "He was elected by children", "He was the first non-Italian pope in 455 years"],
      correct: 2,
    },
  ],
  "st-gregory-the-great": [
    {
      question: "What did Gregory give up to become a monk?",
      choices: ["His pet goat", "His fishing boat", "His riches and palace"],
      correct: 2,
    },
    {
      question: "What humble title did Gregory take?",
      choices: ["Servant of the servants of God", "King of Rome", "Lord of the palace"],
      correct: 0,
    },
    {
      question: "What church music is named after Gregory?",
      choices: ["Opera", "Gregorian chant", "Rock and roll"],
      correct: 1,
    },
    {
      question: "Who did Gregory send to England?",
      choices: ["An army of knights", "A choir of canaries", "A monk named Augustine with forty companions"],
      correct: 2,
    },
    {
      question: "What did Gregory say about the English slave boys?",
      choices: ["Not Angles, but Angels!", "Send them home at once!", "Teach them to juggle!"],
      correct: 0,
    },
  ],
  "st-bernadette": [
    {
      question: "What was Bernadette doing when she saw the Lady?",
      choices: ["Gathering firewood", "Swimming in the sea", "Climbing a mountain"],
      correct: 0,
    },
    {
      question: "What did the Lady wear?",
      choices: ["A suit of armour", "A white dress with a blue sash", "A red cloak and boots"],
      correct: 1,
    },
    {
      question: "What happened when Bernadette scratched the dirt?",
      choices: ["Gold coins popped out", "Nothing at all", "Muddy water bubbled up"],
      correct: 2,
    },
    {
      question: "What name did the Lady give?",
      choices: ["The Queen of France", "The Immaculate Conception", "The River Fairy"],
      correct: 1,
    },
    {
      question: "What does Bernadette's story teach us?",
      choices: ["Never drink spring water", "God chooses the smallest and poorest for great things", "Only rich people see visions"],
      correct: 1,
    },
  ],
  "st-faustina": [
    {
      question: "What was Faustina's birth name?",
      choices: ["Joan of Arc", "Helena Kowalska", "Maria Goretti"],
      correct: 1,
    },
    {
      question: "What streamed from Jesus' Heart in the vision?",
      choices: ["A flock of doves", "A shower of stars", "Two rays, one red and one pale"],
      correct: 2,
    },
    {
      question: "What words did Jesus ask to be written under the image?",
      choices: ["Jesus, I trust in You", "Good luck to all", "See you soon"],
      correct: 0,
    },
    {
      question: "Who helped Faustina have the painting made?",
      choices: ["A travelling artist", "Father Sopoćko", "The mayor"],
      correct: 1,
    },
    {
      question: "When is the Feast of Mercy that Jesus asked for?",
      choices: ["Christmas morning", "Every Friday night", "The Sunday after Easter"],
      correct: 2,
    },
  ],
  "st-jerome": [
    {
      question: "What did young Jerome love more than being good?",
      choices: ["His horse", "His stamp collection", "His books"],
      correct: 2,
    },
    {
      question: "Where did Jerome go to pray and learn?",
      choices: ["The desert", "A circus", "A castle"],
      correct: 0,
    },
    {
      question: "What hard language did Jerome teach himself?",
      choices: ["Dolphin clicks", "Hebrew", "Pirate talk"],
      correct: 1,
    },
    {
      question: "How did Jerome help the lion?",
      choices: ["He gave it a haircut", "He taught it to read", "He pulled a thorn from its paw"],
      correct: 2,
    },
    {
      question: "What great work did Jerome finish in Bethlehem?",
      choices: ["Translating the whole Bible into Latin", "Building a tower", "Painting the cave walls"],
      correct: 0,
    },
  ],
  "st-maximilian-kolbe": [
    {
      question: "What did Our Lady offer young Raymond?",
      choices: ["Two crowns, white and red", "A bag of marbles", "A new puppy"],
      correct: 0,
    },
    {
      question: "How did Maximilian spread love of Mary?",
      choices: ["With carrier pigeons", "With printing presses and magazines", "With skywriting"],
      correct: 1,
    },
    {
      question: "Where was Maximilian imprisoned?",
      choices: ["A lighthouse", "A bakery", "Auschwitz"],
      correct: 2,
    },
    {
      question: "What did Maximilian say when Franciszek cried out?",
      choices: ["Take me instead", "Run for your life", "Hide behind me"],
      correct: 0,
    },
    {
      question: "What does St Maximilian's story teach us?",
      choices: ["Printing is boring", "Love lays down its life for a friend", "Prisons are fun"],
      correct: 1,
    },
  ],
  "st-joseph": [
    {
      question: "What was Joseph's job?",
      choices: ["A baker", "A carpenter", "A fisherman"],
      correct: 1,
    },
    {
      question: "What did the angel tell Joseph in his dream?",
      choices: ["Run away to Rome", "Hide the baby", "Do not be afraid, take Mary as your wife"],
      correct: 2,
    },
    {
      question: "Where did Joseph take Mary and Jesus to escape Herod?",
      choices: ["To Egypt", "To Spain", "To the mountains of the moon"],
      correct: 0,
    },
    {
      question: "What did Joseph teach Jesus?",
      choices: ["How to sail ships", "Carpentry and honest work", "How to juggle"],
      correct: 1,
    },
    {
      question: "How many words of Joseph are recorded in the Bible?",
      choices: ["A thousand", "Fifty-two", "Not a single one"],
      correct: 2,
    },
  ],
  "st-christopher": [
    {
      question: "What did the giant Reprobus want most?",
      choices: ["To eat the biggest cake", "To sleep all day", "To serve the greatest king"],
      correct: 2,
    },
    {
      question: "What job did the hermit give Reprobus?",
      choices: ["Carry travellers across the river", "Count the stars", "Polish the church bells"],
      correct: 0,
    },
    {
      question: "What happened as Reprobus carried the Child?",
      choices: ["The river dried up", "The Child grew heavier than the world", "The Child sang a song"],
      correct: 1,
    },
    {
      question: "Who was the Child, really?",
      choices: ["A lost prince", "A talking fish", "Jesus"],
      correct: 2,
    },
    {
      question: "Who is St Christopher the patron saint of?",
      choices: ["Travellers", "Chefs", "Librarians"],
      correct: 0,
    },
  ],
  "st-peter-julian": [
    {
      question: "What did little Peter Julian love most?",
      choices: ["Jesus in the Eucharist", "Toy soldiers", "Horse racing"],
      correct: 0,
    },
    {
      question: "What did Peter Julian found?",
      choices: ["A football club", "A circus", "Priests and sisters devoted to the Eucharist"],
      correct: 2,
    },
    {
      question: "What did he invite everyone to do?",
      choices: ["Stay home and sleep", "Ignore the church", "Come and adore Jesus"],
      correct: 2,
    },
    {
      question: "What did Peter Julian say the Eucharist is?",
      choices: ["A nice symbol", "Jesus Himself", "Just bread"],
      correct: 1,
    },
    {
      question: "What is Peter Julian called?",
      choices: ["The fastest runner", "The Apostle of the Eucharist", "The king of France"],
      correct: 1,
    },
  ],
  "st-alphonsus-liguori": [
    {
      question: "What was young Alphonsus?",
      choices: ["A lighthouse keeper", "A lawyer who never lost", "A fisherman"],
      correct: 1,
    },
    {
      question: "What made him leave the courtroom forever?",
      choices: ["He won too much money", "He got bored of wigs", "One terrible mistake that lost his case"],
      correct: 2,
    },
    {
      question: "Who did Alphonsus preach to?",
      choices: ["The poorest villagers", "Only kings", "Nobody at all"],
      correct: 0,
    },
    {
      question: "What family did he found?",
      choices: ["A sailing crew", "The Redemptorists", "A circus family"],
      correct: 1,
    },
    {
      question: "Who is Alphonsus the patron saint of?",
      choices: ["Astronauts", "Chefs", "Confessors"],
      correct: 2,
    },
  ],
  "st-basil": [
    {
      question: "What was special about Basil's family?",
      choices: ["They owned a circus", "They were all sailors", "Many of them are saints too"],
      correct: 2,
    },
    {
      question: "What did Basil do with his fortune?",
      choices: ["Gave it to the poor", "Buried it in the desert", "Bought a palace"],
      correct: 0,
    },
    {
      question: "What did Basil build outside the city?",
      choices: ["A giant statue of himself", "A hospital city for the poor and sick", "A race track"],
      correct: 1,
    },
    {
      question: "Who tried to frighten Basil into giving up?",
      choices: ["A dragon", "His own shadow", "The emperor"],
      correct: 2,
    },
    {
      question: "What does Basil teach us?",
      choices: ["Faith without works is just noise", "Money buys happiness", "Hide from the poor"],
      correct: 0,
    },
  ],
  "st-agnes": [
    {
      question: "How old was Agnes?",
      choices: ["About twelve", "About fifty", "About ninety"],
      correct: 0,
    },
    {
      question: "Why did Agnes refuse to marry?",
      choices: ["She wanted to travel", "She belonged to Christ", "She disliked cake"],
      correct: 1,
    },
    {
      question: "What animal is Agnes always painted with?",
      choices: ["A lion", "A parrot", "A lamb"],
      correct: 2,
    },
    {
      question: "What are the blessed lambs' wool used for?",
      choices: ["Archbishops' scarves", "Winter socks", "Football jerseys"],
      correct: 0,
    },
    {
      question: "Who is Agnes the patron saint of?",
      choices: ["Deep sea divers", "Young girls and purity", "Race car drivers"],
      correct: 1,
    },
  ],
  "st-fabian": [
    {
      question: "What was Fabian before becoming pope?",
      choices: ["A wealthy banker", "An unknown farmer", "A famous general"],
      correct: 1,
    },
    {
      question: "What landed on Fabian's head?",
      choices: ["A falling apple", "A paper hat", "A snow-white dove"],
      correct: 2,
    },
    {
      question: "What did the crowd shout?",
      choices: ["He is the one! God has chosen him!", "Send him away!", "Louder, please!"],
      correct: 0,
    },
    {
      question: "What did Fabian do as pope?",
      choices: ["Took long holidays", "Organized the Church and sent missionaries", "Built a bigger palace"],
      correct: 1,
    },
    {
      question: "How did Fabian die?",
      choices: ["Of old age in bed", "He disappeared at sea", "Martyred for refusing to deny Christ"],
      correct: 2,
    },
  ],
  "st-sebastian": [
    {
      question: "What was Sebastian's secret?",
      choices: ["He was afraid of horses", "He couldn't swim", "He was a Christian"],
      correct: 2,
    },
    {
      question: "What did the soldiers do to Sebastian?",
      choices: ["Shot him full of arrows", "Tickled him", "Sent him to bed"],
      correct: 0,
    },
    {
      question: "Who nursed Sebastian back to health?",
      choices: ["A passing goat", "A widow named Irene", "The emperor himself"],
      correct: 1,
    },
    {
      question: "What did Sebastian do once he recovered?",
      choices: ["Hid in a cave", "Sailed to Spain", "Walked back and confronted the emperor"],
      correct: 2,
    },
    {
      question: "Who is Sebastian the patron saint of?",
      choices: ["Soldiers and athletes", "Bakers and chefs", "Librarians"],
      correct: 0,
    },
  ],
  "st-timothy": [
    {
      question: "Who taught Timothy the Scriptures as a boy?",
      choices: ["His grandmother Lois and mother Eunice", "A travelling circus", "Nobody at all"],
      correct: 0,
    },
    {
      question: "Which apostle took Timothy on his journeys?",
      choices: ["A camel driver", "Paul", "A pirate captain"],
      correct: 1,
    },
    {
      question: "What did Paul call Timothy?",
      choices: ["My little problem", "My runaway servant", "My dear child"],
      correct: 2,
    },
    {
      question: "What city did Timothy become bishop of?",
      choices: ["Ephesus", "Paris", "London"],
      correct: 0,
    },
    {
      question: "What does Timothy teach us?",
      choices: ["Stay home always", "God loves to use young people", "Only old people matter"],
      correct: 1,
    },
  ],
  "st-titus": [
    {
      question: "What was Titus's special gift?",
      choices: ["Talking to fish", "Making angry people friends again", "Juggling fire"],
      correct: 1,
    },
    {
      question: "Where did Paul send Titus to make peace?",
      choices: ["The moon", "A bakery", "Corinth"],
      correct: 2,
    },
    {
      question: "Which wild island did Titus shepherd?",
      choices: ["Crete", "A floating island", "An island of cats"],
      correct: 0,
    },
    {
      question: "What did Paul's letter to Titus teach?",
      choices: ["Take long naps", "Be gentle and do good", "Argue louder"],
      correct: 1,
    },
    {
      question: "Whose feast day does Titus share?",
      choices: ["Nobody's", "A dragon's", "Timothy's"],
      correct: 2,
    },
  ],
  "st-angela-merici": [
    {
      question: "What sad thing did Angela notice?",
      choices: ["Too many holidays", "Not enough cake", "Poor girls got no schooling"],
      correct: 2,
    },
    {
      question: "What did Angela see in her vision?",
      choices: ["A ladder of light with singing girls", "A mountain of gold", "A flying ship"],
      correct: 0,
    },
    {
      question: "What did Angela found in 1535?",
      choices: ["A zoo", "The Ursulines, to teach girls", "A bakery"],
      correct: 1,
    },
    {
      question: "How did Angela tell her sisters to govern?",
      choices: ["With strict shouting", "With locked doors", "With kindness, like mothers"],
      correct: 2,
    },
    {
      question: "Who is Angela the patron saint of?",
      choices: ["Teachers and schoolgirls", "Race car drivers", "Astronauts"],
      correct: 0,
    },
  ],
  "st-thomas-aquinas": [
    {
      question: "What rude nickname did classmates give Thomas?",
      choices: ["The Dumb Ox", "The Noisy Rooster", "The Sleepy Sloth"],
      correct: 0,
    },
    {
      question: "What did his family do when he joined the Dominicans?",
      choices: ["Ignored him", "Kidnapped and locked him up", "Threw a party"],
      correct: 1,
    },
    {
      question: "What did his teacher Albert predict?",
      choices: ["He will fail every test", "He will become a sailor", "His bellowing will be heard around the world"],
      correct: 2,
    },
    {
      question: "What is Thomas's greatest book called?",
      choices: ["The Summa", "The Cookbook", "The Pirate Map"],
      correct: 0,
    },
    {
      question: "What beautiful song did Thomas write?",
      choices: ["Row Row Row Your Boat", "The Tantum Ergo", "Happy Birthday"],
      correct: 1,
    },
  ],
  "st-john-bosco": [
    {
      question: "What did John dream at nine years old?",
      choices: ["A mountain of homework", "Wild boys becoming gentle, and a Lady guiding him", "Flying elephants"],
      correct: 1,
    },
    {
      question: "How did John attract village boys?",
      choices: ["Free ice cream", "Loud fireworks", "Juggling and magic tricks"],
      correct: 2,
    },
    {
      question: "What did Bosco say about hopeless boys?",
      choices: ["There are none, only unloved ones", "Avoid them all", "Lock them up"],
      correct: 0,
    },
    {
      question: "What family did Bosco found?",
      choices: ["A navy", "The Salesians", "A circus troupe"],
      correct: 1,
    },
    {
      question: "What was Bosco's motto about joy?",
      choices: ["Never smile", "Frown more", "Serve the Lord with gladness"],
      correct: 2,
    },
  ],
  "st-agatha": [
    {
      question: "Where was Agatha from?",
      choices: ["Egypt", "Norway", "Sicily"],
      correct: 2,
    },
    {
      question: "Why did the governor arrest Agatha?",
      choices: ["She refused to marry him or deny Christ", "She stole his horse", "She sang too loudly"],
      correct: 0,
    },
    {
      question: "Who appeared to comfort Agatha in prison?",
      choices: ["Her pet cat", "St Peter", "A palace guard"],
      correct: 1,
    },
    {
      question: "What miracle is linked to Agatha's veil?",
      choices: ["It turned into gold", "It flew away", "It stopped Mount Etna's lava"],
      correct: 2,
    },
    {
      question: "Why is Agatha the patron saint of bakers?",
      choices: ["Her little plate looks like loaves of bread", "She owned a bakery in Rome", "She baked cakes for the emperor"],
      correct: 0,
    },
  ],
  "st-peter-chanel": [
    {
      question: "Where did Peter Chanel sail as a missionary?",
      choices: ["The Pacific islands", "The North Pole", "The moon"],
      correct: 0,
    },
    {
      question: "What tiny island did he land on?",
      choices: ["Atlantis", "Futuna", "Hawaii"],
      correct: 1,
    },
    {
      question: "How did Peter win hearts?",
      choices: ["Magic tricks", "Loud shouting", "Gentleness, language, and serving the sick"],
      correct: 2,
    },
    {
      question: "Why did the chief order Peter killed?",
      choices: ["He feared losing power as people converted", "Peter ate his lunch", "Peter snored"],
      correct: 0,
    },
    {
      question: "What happened to Futuna after Peter's death?",
      choices: ["It sank into the sea", "The whole island became Christian", "Everyone forgot him"],
      correct: 1,
    },
  ],
  "st-catherine-siena": [
    {
      question: "What number child was Catherine?",
      choices: ["The 3rd", "The 25th", "The 1st"],
      correct: 1,
    },
    {
      question: "What did Catherine do to avoid marriage?",
      choices: ["Ran to the forest", "Hid in a barrel", "Cut off her long hair"],
      correct: 2,
    },
    {
      question: "Who did Catherine persuade to return to Rome?",
      choices: ["The Pope", "A pirate king", "Her neighbour"],
      correct: 0,
    },
    {
      question: "What book did Catherine dictate?",
      choices: ["A pirate map", "The Dialogue", "A cookbook"],
      correct: 1,
    },
    {
      question: "What title was Catherine given?",
      choices: ["Queen of Siena", "Captain of ships", "Doctor of the Church"],
      correct: 2,
    },
  ],
  "st-rita": [
    {
      question: "What did little Rita dream of becoming?",
      choices: ["A queen", "A sailor", "A nun"],
      correct: 2,
    },
    {
      question: "How did Rita change her difficult husband?",
      choices: ["With patience, kindness, and prayer", "With shouting", "With magic spells"],
      correct: 0,
    },
    {
      question: "How did Rita finally enter the convent?",
      choices: ["She disguised herself", "Her patron saints lifted her over the wall", "She dug a tunnel"],
      correct: 1,
    },
    {
      question: "What miracle happened when Rita was dying?",
      choices: ["It rained candy", "Stars fell down", "A rose bloomed in the snow"],
      correct: 2,
    },
    {
      question: "Who is Rita the patron saint of?",
      choices: ["Impossible causes", "Lost socks", "Flat tyres"],
      correct: 0,
    },
  ],
  "st-felicitas": [
    {
      question: "How many sons did Felicitas have?",
      choices: ["Seven", "Two", "Twelve"],
      correct: 0,
    },
    {
      question: "What did the judge order the family to do?",
      choices: ["Dance a jig", "Sacrifice to false gods", "Sing a song"],
      correct: 1,
    },
    {
      question: "What did Felicitas cry to her sons?",
      choices: ["Run away fast!", "Give up now!", "Look up to heaven!"],
      correct: 2,
    },
    {
      question: "What did Pope Gregory say about Felicitas?",
      choices: ["She was martyred in her sons and herself", "She was too noisy", "She baked well"],
      correct: 0,
    },
    {
      question: "What does Felicitas teach mothers?",
      choices: ["Avoid church", "Want heaven for your children most of all", "Keep them home always"],
      correct: 1,
    },
  ],
  "st-sharbel": [
    {
      question: "Where was Sharbel from?",
      choices: ["The streets of Paris", "The mountains of Lebanon", "The deserts of Egypt"],
      correct: 1,
    },
    {
      question: "What name did Youssef take as a monk?",
      choices: ["Barnaby", "Felix", "Sharbel"],
      correct: 2,
    },
    {
      question: "How did Sharbel live as a hermit?",
      choices: ["One meal, hard bed, endless prayer", "Feasts and parties", "Travelling the world"],
      correct: 0,
    },
    {
      question: "What wonders appeared over his tomb?",
      choices: ["Falling snow", "Mysterious glowing lights", "Fireworks"],
      correct: 1,
    },
    {
      question: "What does Sharbel teach us?",
      choices: ["Talk constantly", "Avoid mountains", "Silence with God is louder than noise"],
      correct: 2,
    },
  ],
  "st-gertrude": [
    {
      question: "Where was little Gertrude raised?",
      choices: ["A pirate ship", "A royal palace", "The convent school of Helfta"],
      correct: 2,
    },
    {
      question: "What changed Gertrude at twenty-six?",
      choices: ["A vision of Jesus", "A new dress", "A lost kitten"],
      correct: 0,
    },
    {
      question: "What did Gertrude hear in her famous vision?",
      choices: ["A choir of frogs", "The beating of Jesus' Sacred Heart", "Thunder and lightning"],
      correct: 1,
    },
    {
      question: "What book did Gertrude write?",
      choices: ["A book of recipes", "A travel guide", "The Herald of Divine Love"],
      correct: 2,
    },
    {
      question: "Why is Gertrude called the Great?",
      choices: ["For her holiness and wisdom", "For her height", "For her wealth"],
      correct: 0,
    },
  ],
  "st-andrew-dung-lac": [
    {
      question: "Where was Andrew Dũng-Lạc from?",
      choices: ["Vietnam", "Ireland", "Brazil"],
      correct: 0,
    },
    {
      question: "What did Andrew do when freed from prison?",
      choices: ["Hid in a cave", "Walked straight back to his people", "Sailed to Rome"],
      correct: 1,
    },
    {
      question: "How did Andrew die?",
      choices: ["Of old age", "He moved away", "Beheaded for refusing the cross-trampling"],
      correct: 2,
    },
    {
      question: "How many martyrs were canonized together in 1988?",
      choices: ["One hundred and seventeen", "Three", "Ten thousand"],
      correct: 0,
    },
    {
      question: "What do the martyrs teach us?",
      choices: ["Avoid Vietnam", "Faith survives any storm together", "Give up quickly"],
      correct: 1,
    },
  ],
  "st-francis-xavier": [
    {
      question: "What question changed Francis's life?",
      choices: ["Who ate my lunch?", "What profits a man to gain the world and lose his soul?", "Where is my homework?"],
      correct: 1,
    },
    {
      question: "How did Francis gather children in villages?",
      choices: ["Fireworks", "Free toys", "Ringing a little bell"],
      correct: 2,
    },
    {
      question: "Which new land did Francis sail to?",
      choices: ["Japan", "Antarctica", "The moon"],
      correct: 0,
    },
    {
      question: "Which country did Francis dream of reaching?",
      choices: ["Iceland", "China", "Peru"],
      correct: 1,
    },
    {
      question: "Who is Francis Xavier the patron saint of?",
      choices: ["Surfers", "Chefs", "Missions"],
      correct: 2,
    },
  ],
  "st-stephen": [
    {
      question: "What was Stephen chosen to do first?",
      choices: ["Build a tower", "Count money", "Serve food to poor widows"],
      correct: 2,
    },
    {
      question: "What did Stephen's face shine like?",
      choices: ["An angel's", "The sun at noon", "A polished shoe"],
      correct: 0,
    },
    {
      question: "What did Stephen see when he looked up?",
      choices: ["A thunderstorm", "The heavens opened and Jesus", "A flock of geese"],
      correct: 1,
    },
    {
      question: "What did Stephen pray as he died?",
      choices: ["Run away, friends!", "I give up!", "Lord, do not hold this sin against them"],
      correct: 2,
    },
    {
      question: "Who watched the coats at Stephen's stoning?",
      choices: ["A young man named Saul", "Nobody at all", "A Roman dog"],
      correct: 0,
    },
  ],
  "st-paul": [
    {
      question: "What was Paul's name before he converted?",
      choices: ["Saul", "Barnaby", "Julius"],
      correct: 0,
    },
    {
      question: "What knocked Saul off his horse?",
      choices: ["A strong sneeze", "A flash of blinding heavenly light", "A falling coconut"],
      correct: 1,
    },
    {
      question: "What did the voice from the light say?",
      choices: ["Turn back at once!", "Dinner is ready!", "Saul, Saul, why are you hurting Me?"],
      correct: 2,
    },
    {
      question: "Who baptized Saul in Damascus?",
      choices: ["Ananias", "The emperor", "A passing shepherd"],
      correct: 0,
    },
    {
      question: "How many of Paul's letters are in our Bible?",
      choices: ["Two", "One hundred", "Thirteen"],
      correct: 2,
    },
  ],
  "st-ignatius-loyola": [
    {
      question: "What ended Ignatius's soldiering days?",
      choices: ["He lost his sword", "He fell off his horse", "A cannonball smashed his legs"],
      correct: 2,
    },
    {
      question: "What books healed his boredom in bed?",
      choices: ["Cookbooks", "A Life of Christ and saints' lives", "Pirate adventures"],
      correct: 1,
    },
    {
      question: "What did Ignatius notice about his daydreams?",
      choices: ["Holy thoughts left lasting peace", "Knights were boring", "Sleep was best"],
      correct: 0,
    },
    {
      question: "What family did Ignatius found?",
      choices: ["A circus troupe", "A navy", "The Jesuits"],
      correct: 2,
    },
    {
      question: "What does the Jesuit motto mean?",
      choices: ["Run everywhere", "For the greater glory of God", "Never give up lunch"],
      correct: 1,
    },
  ],
  "st-felicity-perpetua": [
    {
      question: "Who were Perpetua and Felicity?",
      choices: ["Two lighthouse keepers", "Two Christian mothers", "Two Roman queens"],
      correct: 1,
    },
    {
      question: "What did Perpetua write in prison?",
      choices: ["A diary of everything that happened", "A cookbook", "A treasure map"],
      correct: 0,
    },
    {
      question: "What did Perpetua dream about?",
      choices: ["Flying elephants", "A mountain of cake", "Climbing a ladder to heaven"],
      correct: 2,
    },
    {
      question: "What happened to Felicity in prison?",
      choices: ["She became queen", "Her baby girl was born safely", "She escaped at night"],
      correct: 1,
    },
    {
      question: "When are the two mothers honoured?",
      choices: ["March 7th", "Christmas Day", "Every Monday"],
      correct: 0,
    },
  ],
  "st-mariam-vattalil": [
    {
      question: "What does the name Rani mean?",
      choices: ["Little flower", "Brave soldier", "Queen"],
      correct: 2,
    },
    {
      question: "Which sisters did Mariam join?",
      choices: ["The Franciscan Clarists", "A sailing crew", "A circus troupe"],
      correct: 0,
    },
    {
      question: "Who was cheating the poor villagers?",
      choices: ["Cruel moneylenders", "Travelling merchants", "The village baker"],
      correct: 0,
    },
    {
      question: "What did Rani Maria do when attacked?",
      choices: ["She ran away", "She fought back", "She forgave her attacker"],
      correct: 2,
    },
    {
      question: "What did her family do afterwards?",
      choices: ["They forgot her", "They forgave the killer", "They moved away"],
      correct: 1,
    },
  ],
  "st-beatrice-rome": [
    {
      question: "Who were Beatrice's brothers?",
      choices: ["Romulus and Remus", "Hiccup and Sneeze", "Simplicius and Faustinus"],
      correct: 2,
    },
    {
      question: "What brave thing did Beatrice do for her brothers?",
      choices: ["She buried them with honour", "She hid their sandals", "She wrote them a letter"],
      correct: 0,
    },
    {
      question: "What did the judge offer Beatrice?",
      choices: ["A crown of gold", "Riches and freedom for incense to false gods", "A trip to Egypt"],
      correct: 1,
    },
    {
      question: "What did Beatrice answer?",
      choices: ["Maybe tomorrow", "Ask someone else", "My brothers did not bend, neither will I"],
      correct: 2,
    },
    {
      question: "When is Beatrice honoured with her brothers?",
      choices: ["Every Friday", "July 29th", "Christmas Day"],
      correct: 1,
    },
  ],
  "st-peter-pattarini": [
    {
      question: "What was Peter's job in Imola?",
      choices: ["A baker", "A sailor", "A famous lawyer and magistrate"],
      correct: 2,
    },
    {
      question: "Why did Peter have to flee Imola?",
      choices: ["The Guelphs conquered the city", "He wanted a holiday", "He lost his keys"],
      correct: 0,
    },
    {
      question: "Which knights did Peter join?",
      choices: ["Knights who joust", "The Knights Hospitallers", "Knights of the round table"],
      correct: 1,
    },
    {
      question: "Where did Peter serve the sick?",
      choices: ["The hospital of San Jacopo in Florence", "A ship at sea", "A mountain cave"],
      correct: 0,
    },
    {
      question: "What does Peter's story teach us?",
      choices: ["Stay bitter forever", "Losing everything can be the start of everything", "Avoid hospitals"],
      correct: 1,
    },
  ],
  "st-hugh-genoa": [
    {
      question: "Where was Hugh born?",
      choices: ["In Egypt", "Near Alessandria, Italy", "On a ship"],
      correct: 1,
    },
    {
      question: "What did young Hugh join?",
      choices: ["A circus", "A navy of pirates", "The Third Crusade"],
      correct: 2,
    },
    {
      question: "What did Hugh trade his sword for?",
      choices: ["A washbasin for the sick", "A golden crown", "A faster horse"],
      correct: 0,
    },
    {
      question: "How long did Hugh serve in the Genoa hospital?",
      choices: ["One week", "More than fifty years", "A single afternoon"],
      correct: 1,
    },
    {
      question: "When is St Hugh's feast day?",
      choices: ["October 8th", "Christmas Day", "Easter Monday"],
      correct: 0,
    },
  ],
  "st-john-xxiii": [
    {
      question: "What was John XXIII called as a boy?",
      choices: ["Angelo Roncalli", "Giovanni Pizza", "Marco Polo"],
      correct: 0,
    },
    {
      question: "What did Angelo do in the great war?",
      choices: ["He hid at home", "He was a chaplain to the wounded", "He sailed away"],
      correct: 1,
    },
    {
      question: "What honour did he receive in 1956?",
      choices: ["Bailiff in the Order of Malta", "King of Italy", "Captain of a ship"],
      correct: 0,
    },
    {
      question: "What great meeting did he open in 1962?",
      choices: ["The Olympic Games", "A cooking contest", "The Second Vatican Council"],
      correct: 2,
    },
    {
      question: "What was his motto?",
      choices: ["Obedience and Peace", "Never smile", "Run fast"],
      correct: 0,
    },
  ],
  "st-gerard-jerusalem": [
    {
      question: "What job did Gerard ask for in Jerusalem?",
      choices: ["Soldier", "Helping the sick in the hospice", "Palace guard"],
      correct: 1,
    },
    {
      question: "What did Gerard hide in his cloak during the siege?",
      choices: ["Small loaves of bread", "Gold coins", "Sharp stones"],
      correct: 0,
    },
    {
      question: "What did the rulers find when they checked?",
      choices: ["Bread", "Plain stones", "Silver keys"],
      correct: 1,
    },
    {
      question: "When did the Pope approve Gerard's Order?",
      choices: ["February 15th, 1113", "Christmas Day", "Easter Monday"],
      correct: 0,
    },
    {
      question: "What did Gerard call the sick?",
      choices: ["A nuisance", "Our lords", "Strangers"],
      correct: 1,
    },
  ],
};
