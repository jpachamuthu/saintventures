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
  "st-mary-mackillop": [
    {
      question: "Where was Mary MacKillop born?",
      choices: ["Melbourne, Australia", "Rome, Italy", "Dublin, Ireland"],
      correct: 0,
    },
    {
      question: "What did Mary love doing for the children of the bush?",
      choices: ["Teaching them to read and write", "Giving them gold coins", "Taking them on ships"],
      correct: 0,
    },
    {
      question: "Where did the very first St Joseph's school open?",
      choices: ["In a golden church", "In a dusty old stable", "In a big castle"],
      correct: 1,
    },
    {
      question: "What did the Sisters of St Joseph promise to be?",
      choices: ["Poor like Jesus", "Rich and famous", "Brave knights"],
      correct: 0,
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
      choices: ["Computers, football and his dog", "Collecting shiny coins", "Sleeping all day"],
      correct: 0,
    },
    {
      question: "What did Carlo write a famous website about?",
      choices: ["Videos", "Miracles of the Eucharist", "Football matches"],
      correct: 1,
    },
    {
      question: "What did Carlo say about being on his phone?",
      choices: ["Use it for nothing good", "Don't ever touch it", "Use it for something good"],
      correct: 2,
    },
    {
      question: "What happened in 2025?",
      choices: ["Wake-up server", "The Pope made Carlo a saint", "Carlo started a band"],
      correct: 1,
    },
  ],
  "st-peter": [
    {
      question: "What was Peter's job before he followed Jesus?",
      choices: ["He was a fisherman", "He was a baker", "He was a soldier"],
      correct: 0,
    },
    {
      question: "What did Jesus name Simon?",
      choices: ["Peter, which means Rock", "David, which means Strong", "John, which means Kind"],
      correct: 0,
    },
    {
      question: "What did Peter say when he walked on the water?",
      choices: ["'I am scared forever'", "'If it is really you, tell me to come to you'", "'Let me swim back'"],
      correct: 1,
    },
    {
      question: "What did Jesus tell Peter to do when he asked 'Do you love me?'",
      choices: ["'Feed my sheep'", "'Sell my boat'", "'Build a big tower'"],
      correct: 0,
    },
    {
      question: "What happened when Peter was captured in Rome?",
      choices: ["He escaped on a horse", "He asked to be crucified upside down", "He became the king"],
      correct: 1,
    },
  ],
  "st-andrew": [
    {
      question: "What was Andrew's job before he followed Jesus?",
      choices: ["He was a fisherman", "He was a baker", "He was a soldier"],
      correct: 0,
    },
    {
      question: "Who was the very first person to follow Jesus?",
      choices: ["Peter", "Andrew", "John"],
      correct: 1,
    },
    {
      question: "Who did Andrew run to fetch when he found Jesus?",
      choices: ["His brother Simon", "His cousin James", "His uncle Thomas"],
      correct: 0,
    },
    {
      question: "What shape was the cross Andrew was tied to?",
      choices: ["A letter X shape", "A round circle", "An upside-down letter V"],
      correct: 0,
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
      choices: ["Zebedee", "Zechariah", "Zacchaeus"],
      correct: 0,
    },
    {
      question: "Who was the first apostle to give his life for Jesus?",
      choices: ["James the Greater", "Thomas", "Bartholomew"],
      correct: 0,
    },
    {
      question: "Where did people find James' tomb long ago?",
      choices: ["A field in Spain where a star shone", "A cave under the sea", "A palace in Rome"],
      correct: 0,
    },
    {
      question: "What country is St James the patron of?",
      choices: ["Spain", "China", "Egypt"],
      correct: 0,
    },
  ],
  "st-john": [
    {
      question: "What is John often called?",
      choices: ["The disciple whom Jesus loved", "The loudest disciple", "The strongest disciple"],
      correct: 0,
    },
    {
      question: "Who did John look after when Jesus died on the cross?",
      choices: ["Mary, the mother of Jesus", "His grandfather", "A poor farmer"],
      correct: 0,
    },
    {
      question: "What did John always say to people when he was old?",
      choices: ["Love one another", "Work harder every day", "Tell me a joke"],
      correct: 0,
    },
    {
      question: "Which book about visions did John write while on Patmos?",
      choices: ["Revelation", "The book of maps", "The book of songs"],
      correct: 0,
    },
    {
      question: "How did John die?",
      choices: ["Peacefully as a very old man", "In a great battle", "On a long voyage"],
      correct: 0,
    },
  ],
  "st-philip": [
    {
      question: "What town was Philip from?",
      choices: ["Bethsaida", "Nazareth", "Jericho"],
      correct: 0,
    },
    {
      question: "What did Jesus say to Philip?",
      choices: ["Follow me", "Sell your boat", "Feed the birds"],
      correct: 0,
    },
    {
      question: "What did Philip say to his friend Nathanael?",
      choices: ["Come and see", "Run away fast", "Stay at home"],
      correct: 0,
    },
    {
      question: "What did Philip ask Jesus at the last supper?",
      choices: ["Show us the Father", "Give us more bread", "Take us back home"],
      correct: 0,
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
      choices: ["Under a fig tree", "On a tall mountain", "By a fast river"],
      correct: 0,
    },
    {
      question: "What did Jesus say about Bartholomew?",
      choices: ["A true Israelite with no deceit", "A loud and noisy man", "A sleepy fisherman"],
      correct: 0,
    },
    {
      question: "What did Bartholomew call Jesus when he believed?",
      choices: ["Son of God, king of Israel", "A wise old teacher", "My best fishing partner"],
      correct: 0,
    },
    {
      question: "Which far land did Bartholomew preach in?",
      choices: ["A kingdom in the East", "England", "Australia"],
      correct: 0,
    },
  ],
  "st-thomas": [
    {
      question: "What brave thing did Thomas once say to his friends?",
      choices: ["Let us also go so we may die with him", "Let us wait until spring", "Let us go fishing instead"],
      correct: 0,
    },
    {
      question: "Why did Thomas first refuse to believe Jesus rose?",
      choices: ["He had not seen the nail marks", "He was too sleepy", "He was angry at Peter"],
      correct: 0,
    },
    {
      question: "What did Thomas cry out when he saw Jesus?",
      choices: ["My Lord and my God", "My boat and my net", "My family and my home"],
      correct: 0,
    },
    {
      question: "Where does tradition say Thomas took the good news?",
      choices: ["India", "Spain", "Norway"],
      correct: 0,
    },
    {
      question: "What does St Thomas teach us to bring to Jesus?",
      choices: ["Our honest doubts", "Our heavy bags", "Our biggest crowds"],
      correct: 0,
    },
  ],
  "st-matthew": [
    {
      question: "What was Matthew's job before he followed Jesus?",
      choices: ["He collected taxes", "He baked bread", "He shepherded sheep"],
      correct: 0,
    },
    {
      question: "What did Matthew leave behind when Jesus called him?",
      choices: ["His tax booth", "His family", "His fishing boat"],
      correct: 0,
    },
    {
      question: "What special book did Matthew write?",
      choices: ["The Gospel of Matthew", "The book of numbers", "A story about pirates"],
      correct: 0,
    },
    {
      question: "Who did Matthew invite to his dinner party?",
      choices: ["Many tax collectors", "Only the king's family", "Only his neighbours' children"],
      correct: 0,
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
      choices: ["Jerusalem", "Rome", "Babylon"],
      correct: 0,
    },
    {
      question: "What did James say faith without good works is like?",
      choices: ["Something dead", "A bright star", "A deep ocean"],
      correct: 0,
    },
    {
      question: "What wise advice is in the letter of James?",
      choices: ["Be quick to listen and slow to speak", "Always speak first", "Never listen to anyone"],
      correct: 0,
    },
    {
      question: "What quality did people admire in James the Less?",
      choices: ["His humility and holiness", "His loud voice", "His big house"],
      correct: 0,
    },
  ],
  "st-simon-zealot": [
    {
      question: "What group was Simon said to belong to?",
      choices: ["The Zealots", "The Shepherds", "The Sailors"],
      correct: 0,
    },
    {
      question: "What change did Jesus make in Simon?",
      choices: ["From fighting to loving", "From love to anger", "From calm to noise"],
      correct: 0,
    },
    {
      question: "What did Simon learn about Jesus' kingdom?",
      choices: ["It is won by love, not swords", "It needs many armies", "It comes from gold"],
      correct: 0,
    },
    {
      question: "Which apostle is tradition said Simon travelled with?",
      choices: ["Jude Thaddeus", "Thomas", "Andrew"],
      correct: 0,
    },
    {
      question: "What does St Simon the Zealot show us about our passions?",
      choices: ["God can turn them into holy love", "We should hide them", "They only cause trouble"],
      correct: 0,
    },
  ],
  "st-matthias": [
    {
      question: "Why was there an empty place among the twelve apostles?",
      choices: ["Judas had betrayed Jesus", "Peter moved away", "John fell asleep"],
      correct: 0,
    },
    {
      question: "What did the apostles do before choosing the new apostle?",
      choices: ["They prayed", "They sold their boats", "They left the city"],
      correct: 0,
    },
    {
      question: "How did they let God choose the new apostle?",
      choices: ["By casting lots after praying", "By holding a race", "By asking the king"],
      correct: 0,
    },
    {
      question: "Who was chosen to take the empty place?",
      choices: ["Matthias", "Barnabas", "Silas"],
      correct: 0,
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
      choices: ["The shortest of the four Gospels", "The longest book ever written", "A book about farming"],
      correct: 0,
    },
    {
      question: "Where did Mark become the first bishop?",
      choices: ["Alexandria", "Rome", "Bethlehem"],
      correct: 0,
    },
    {
      question: "What does the word Evangelist mean?",
      choices: ["A bearer of good news", "A builder of boats", "A keeper of coins"],
      correct: 0,
    },
    {
      question: "Who is St Mark the patron of?",
      choices: ["Writers", "Fishermen", "Bakers"],
      correct: 0,
    },
  ],
  "st-luke": [
    {
      question: "What was Luke's job before he followed Jesus?",
      choices: ["He was a doctor", "He was a soldier", "He was a shepherd"],
      correct: 0,
    },
    {
      question: "Who was Luke's dear companion on his travels?",
      choices: ["St Paul", "St Peter", "St John"],
      correct: 0,
    },
    {
      question: "Which beautiful story is only found in Luke's Gospel?",
      choices: ["The Good Samaritan", "The Great Flood", "The Tower of Babel"],
      correct: 0,
    },
    {
      question: "Who did Luke is said to have painted pictures of?",
      choices: ["Mary, the mother of Jesus", "Herod the king", "A village baker"],
      correct: 0,
    },
    {
      question: "What second book did Luke write?",
      choices: ["The Acts of the Apostles", "A book of medicines", "A map of the world"],
      correct: 0,
    },
  ],
  "st-theresa-calcutta": [
    {
      question: "What was Mother Teresa called before?",
      choices: ["Agnes", "Anna", "Alice"],
      correct: 0,
    },
    {
      question: "What is the family of sisters Mother Teresa started called?",
      choices: ["Missionaries of Charity", "The Quiet Gardeners", "The Royal Helpers"],
      correct: 0,
    },
    {
      question: "What did she open a home for?",
      choices: ["The sick and dying who had no one", "The king's horses", "People who fish"],
      correct: 0,
    },
    {
      question: "What was her famous secret of holy life?",
      choices: ["Do small things with great love", "Do big things loudly", "Do nothing at all"],
      correct: 0,
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
      choices: ["I forgive him and want him in heaven", "I will escape to Rome", "I am too scared to pray"],
      correct: 0,
    },
    {
      question: "What did Maria do every day?",
      choices: ["Her chores and her prayers", "She hid in the attic", "She collected coins"],
      correct: 0,
    },
    {
      question: "Who is St Maria the patron saint of?",
      choices: ["Young people", "Sea captains", "Astronomers"],
      correct: 0,
    },
    {
      question: "What is the message of Maria's story?",
      choices: ["Love and forgiveness are stronger than hate", "Being rich is best", "Running away is wisest"],
      correct: 0,
    },
  ],
  "st-augustine": [
    {
      question: "What did Augustine keep saying when told to do the right thing?",
      choices: ["Later… just not yet", "Yes, right away", "Ask someone else"],
      correct: 0,
    },
    {
      question: "What did Monica do for seventeen years?",
      choices: ["Sailed around the world", "Prayed and wept for her son", "Hid in a garden"],
      correct: 1,
    },
    {
      question: "What did the bishop tell Monica?",
      choices: ["The child of so many tears will never perish", "Give up on your son", "Move to Rome at once"],
      correct: 0,
    },
    {
      question: "What voice did Augustine hear in the garden?",
      choices: ["A roaring lion", "A child singing, take up and read", "Thunder in the clouds"],
      correct: 1,
    },
    {
      question: "What does Augustine's story teach us?",
      choices: ["Cleverness is enough", "No one is ever too lost to be found", "Mothers should stop praying"],
      correct: 1,
    },
  ],
  "st-monica": [
    {
      question: "Who did Monica marry?",
      choices: ["Patricius, who had a fiery temper", "A quiet fisherman", "The bishop of Milan"],
      correct: 0,
    },
    {
      question: "How did Monica answer her husband's anger?",
      choices: ["She shouted even louder", "With quiet kindness", "She ran away from home"],
      correct: 1,
    },
    {
      question: "How long did Monica pray for Augustine?",
      choices: ["One week", "Seventeen years", "A single night"],
      correct: 1,
    },
    {
      question: "What did Monica do when Augustine sailed to Italy?",
      choices: ["She forgot about him", "She got on a ship and followed him", "She moved to Egypt"],
      correct: 1,
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
      choices: ["In Italy", "In Sudan", "In France"],
      correct: 1,
    },
    {
      question: "Who treated Bakhita with gentleness?",
      choices: ["Callisto Legnani", "The slave traders", "A circus lion"],
      correct: 0,
    },
    {
      question: "What name did she take when she was baptized?",
      choices: ["Clare", "Josephine", "Agnes"],
      correct: 1,
    },
    {
      question: "What did Bakhita say about the men who stole her?",
      choices: ["She would forgive them and kiss their hands", "She would never speak again", "She would sail away forever"],
      correct: 0,
    },
  ],
  "st-vincent-de-paul": [
    {
      question: "What job did young Vincent do as a boy?",
      choices: ["He herded sheep", "He sailed ships", "He baked bread"],
      correct: 0,
    },
    {
      question: "What changed Vincent's life?",
      choices: ["Winning a race", "A dying man's confession", "Finding a gold coin"],
      correct: 1,
    },
    {
      question: "Who helped Vincent start the Daughters of Charity?",
      choices: ["Louise", "His sheepdog", "The king of France"],
      correct: 0,
    },
    {
      question: "What did Vincent call the poor?",
      choices: ["A nuisance", "Our masters", "Strangers"],
      correct: 1,
    },
    {
      question: "Who is St Vincent the patron saint of?",
      choices: ["Charities", "Astronauts", "Chefs"],
      correct: 0,
    },
  ],
  "st-augustine-zhao-rong": [
    {
      question: "What was Augustine's job before he converted?",
      choices: ["A baker", "A soldier who guarded prisoners", "A fisherman"],
      correct: 1,
    },
    {
      question: "What convinced Augustine to become Christian?",
      choices: ["The bravery of the Christian prisoners", "A bag of gold", "A thunderstorm"],
      correct: 0,
    },
    {
      question: "What did Augustine become?",
      choices: ["A sailor", "A Catholic priest", "A palace guard"],
      correct: 1,
    },
    {
      question: "What happened when the soldiers caught Father Augustine?",
      choices: ["He gave up his faith at once", "He was thrown in prison but refused to deny Christ", "He ran away to Rome"],
      correct: 1,
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
      choices: ["Ringing the biggest bell", "Altar server", "Polishing the organ"],
      correct: 1,
    },
    {
      question: "Why did Lawrence have to flee?",
      choices: ["He wanted an adventure", "He was falsely accused of a crime", "He missed his boat"],
      correct: 1,
    },
    {
      question: "What famous words did Lawrence say?",
      choices: ["If I had a thousand lives, I would offer them all to God", "Take me back to Manila", "I give up"],
      correct: 0,
    },
    {
      question: "What makes Lawrence special in history?",
      choices: ["He was the tallest saint", "He was the first Filipino saint", "He invented fireworks"],
      correct: 1,
    },
  ],
  "st-michael-archangel": [
    {
      question: "What does the name Michael mean?",
      choices: ["Who is like God?", "Bringer of lunch", "Keeper of keys"],
      correct: 0,
    },
    {
      question: "Which angel rebelled against God?",
      choices: ["Gabriel", "Lucifer", "Raphael"],
      correct: 1,
    },
    {
      question: "What happened in the war in heaven?",
      choices: ["Michael won and the rebels were cast out", "Everyone took a nap", "The stars fell down"],
      correct: 0,
    },
    {
      question: "Who especially asks St Michael for protection?",
      choices: ["Soldiers and police officers", "Bakers and chefs", "Fishermen only"],
      correct: 0,
    },
    {
      question: "What does St Michael's victory teach us?",
      choices: ["Evil always wins", "God always wins", "Battles are fun"],
      correct: 1,
    },
  ],
  "st-gabriel-archangel": [
    {
      question: "What does the name Gabriel mean?",
      choices: ["God is my strength", "Loud trumpet", "Fast runner"],
      correct: 0,
    },
    {
      question: "Who did Gabriel visit in the Temple?",
      choices: ["Old priest Zechariah", "A Roman soldier", "A shepherd boy"],
      correct: 0,
    },
    {
      question: "How did Gabriel greet Mary?",
      choices: ["Hail, full of grace!", "Good luck up there!", "Hide quickly!"],
      correct: 0,
    },
    {
      question: "What did Mary answer?",
      choices: ["Let it be done to me", "Come back tomorrow", "Ask someone else"],
      correct: 0,
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
      choices: ["Tobias", "A lost camel", "The king's army"],
      correct: 0,
    },
    {
      question: "What leaped out of the river at Tobias?",
      choices: ["A giant fish", "A golden crown", "A singing frog"],
      correct: 0,
    },
    {
      question: "What happened when Tobias used the fish medicine?",
      choices: ["Tobit's blindness was healed", "It started to rain", "Everyone fell asleep"],
      correct: 0,
    },
    {
      question: "Who is St Raphael the patron saint of?",
      choices: ["Travellers", "Librarians", "Blacksmiths"],
      correct: 0,
    },
  ],
  "st-john-paul-ii": [
    {
      question: "What was John Paul II called as a boy, and where was he born?",
      choices: ["Karol, in Poland", "Giovanni, in Rome", "Patrick, in Ireland"],
      correct: 0,
    },
    {
      question: "What did he say from the balcony when elected pope?",
      choices: ["Be not afraid!", "Good night!", "Watch and learn!"],
      correct: 0,
    },
    {
      question: "What happened to the Pope in 1981?",
      choices: ["He was shot, survived, and forgave the gunman", "He retired to a farm", "He learned to fly"],
      correct: 0,
    },
    {
      question: "What great gathering did he start?",
      choices: ["World Youth Day", "A football league", "A cooking contest"],
      correct: 0,
    },
    {
      question: "What was special about his election as pope?",
      choices: ["He was the first non-Italian pope in 455 years", "He was the youngest ever", "He was elected by children"],
      correct: 0,
    },
  ],
  "st-gregory-the-great": [
    {
      question: "What did Gregory give up to become a monk?",
      choices: ["His riches and palace", "His pet goat", "His fishing boat"],
      correct: 0,
    },
    {
      question: "What humble title did Gregory take?",
      choices: ["Servant of the servants of God", "King of Rome", "Lord of the palace"],
      correct: 0,
    },
    {
      question: "What church music is named after Gregory?",
      choices: ["Gregorian chant", "Rock and roll", "Opera"],
      correct: 0,
    },
    {
      question: "Who did Gregory send to England?",
      choices: ["A monk named Augustine with forty companions", "An army of knights", "A choir of canaries"],
      correct: 0,
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
      choices: ["A white dress with a blue sash", "A red cloak and boots", "A suit of armour"],
      correct: 0,
    },
    {
      question: "What happened when Bernadette scratched the dirt?",
      choices: ["Muddy water bubbled up", "Gold coins popped out", "Nothing at all"],
      correct: 0,
    },
    {
      question: "What name did the Lady give?",
      choices: ["The Queen of France", "The Immaculate Conception", "The River Fairy"],
      correct: 1,
    },
    {
      question: "What does Bernadette's story teach us?",
      choices: ["God chooses the smallest and poorest for great things", "Only rich people see visions", "Never drink spring water"],
      correct: 0,
    },
  ],
  "st-faustina": [
    {
      question: "What was Faustina's birth name?",
      choices: ["Helena Kowalska", "Maria Goretti", "Joan of Arc"],
      correct: 0,
    },
    {
      question: "What streamed from Jesus' Heart in the vision?",
      choices: ["Two rays, one red and one pale", "A flock of doves", "A shower of stars"],
      correct: 0,
    },
    {
      question: "What words did Jesus ask to be written under the image?",
      choices: ["Jesus, I trust in You", "Good luck to all", "See you soon"],
      correct: 0,
    },
    {
      question: "Who helped Faustina have the painting made?",
      choices: ["Father Sopoćko", "The mayor", "A travelling artist"],
      correct: 0,
    },
    {
      question: "When is the Feast of Mercy that Jesus asked for?",
      choices: ["The Sunday after Easter", "Christmas morning", "Every Friday night"],
      correct: 0,
    },
  ],
  "st-jerome": [
    {
      question: "What did young Jerome love more than being good?",
      choices: ["His books", "His horse", "His stamp collection"],
      correct: 0,
    },
    {
      question: "Where did Jerome go to pray and learn?",
      choices: ["The desert", "A circus", "A castle"],
      correct: 0,
    },
    {
      question: "What hard language did Jerome teach himself?",
      choices: ["Hebrew", "Pirate talk", "Dolphin clicks"],
      correct: 0,
    },
    {
      question: "How did Jerome help the lion?",
      choices: ["He pulled a thorn from its paw", "He gave it a haircut", "He taught it to read"],
      correct: 0,
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
      choices: ["With printing presses and magazines", "With skywriting", "With carrier pigeons"],
      correct: 0,
    },
    {
      question: "Where was Maximilian imprisoned?",
      choices: ["Auschwitz", "A lighthouse", "A bakery"],
      correct: 0,
    },
    {
      question: "What did Maximilian say when Franciszek cried out?",
      choices: ["Take me instead", "Run for your life", "Hide behind me"],
      correct: 0,
    },
    {
      question: "What does St Maximilian's story teach us?",
      choices: ["Love lays down its life for a friend", "Prisons are fun", "Printing is boring"],
      correct: 0,
    },
  ],
  "st-joseph": [
    {
      question: "What was Joseph's job?",
      choices: ["A carpenter", "A fisherman", "A baker"],
      correct: 0,
    },
    {
      question: "What did the angel tell Joseph in his dream?",
      choices: ["Do not be afraid, take Mary as your wife", "Run away to Rome", "Hide the baby"],
      correct: 0,
    },
    {
      question: "Where did Joseph take Mary and Jesus to escape Herod?",
      choices: ["To Egypt", "To Spain", "To the mountains of the moon"],
      correct: 0,
    },
    {
      question: "What did Joseph teach Jesus?",
      choices: ["Carpentry and honest work", "How to juggle", "How to sail ships"],
      correct: 0,
    },
    {
      question: "How many words of Joseph are recorded in the Bible?",
      choices: ["Not a single one", "A thousand", "Fifty-two"],
      correct: 0,
    },
  ],
  "st-christopher": [
    {
      question: "What did the giant Reprobus want most?",
      choices: ["To serve the greatest king", "To eat the biggest cake", "To sleep all day"],
      correct: 0,
    },
    {
      question: "What job did the hermit give Reprobus?",
      choices: ["Carry travellers across the river", "Count the stars", "Polish the church bells"],
      correct: 0,
    },
    {
      question: "What happened as Reprobus carried the Child?",
      choices: ["The Child grew heavier than the world", "The Child sang a song", "The river dried up"],
      correct: 0,
    },
    {
      question: "Who was the Child, really?",
      choices: ["Jesus", "A lost prince", "A talking fish"],
      correct: 0,
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
      choices: ["A circus", "Priests and sisters devoted to the Eucharist", "A football club"],
      correct: 1,
    },
    {
      question: "What did he invite everyone to do?",
      choices: ["Come and adore Jesus", "Stay home and sleep", "Ignore the church"],
      correct: 0,
    },
    {
      question: "What did Peter Julian say the Eucharist is?",
      choices: ["A nice symbol", "Jesus Himself", "Just bread"],
      correct: 1,
    },
    {
      question: "What is Peter Julian called?",
      choices: ["The Apostle of the Eucharist", "The king of France", "The fastest runner"],
      correct: 0,
    },
  ],
  "st-alphonsus-liguori": [
    {
      question: "What was young Alphonsus?",
      choices: ["A lawyer who never lost", "A fisherman", "A lighthouse keeper"],
      correct: 0,
    },
    {
      question: "What made him leave the courtroom forever?",
      choices: ["One terrible mistake that lost his case", "He won too much money", "He got bored of wigs"],
      correct: 0,
    },
    {
      question: "Who did Alphonsus preach to?",
      choices: ["The poorest villagers", "Only kings", "Nobody at all"],
      correct: 0,
    },
    {
      question: "What family did he found?",
      choices: ["The Redemptorists", "A circus family", "A sailing crew"],
      correct: 0,
    },
    {
      question: "Who is Alphonsus the patron saint of?",
      choices: ["Confessors", "Astronauts", "Chefs"],
      correct: 0,
    },
  ],
  "st-basil": [
    {
      question: "What was special about Basil's family?",
      choices: ["Many of them are saints too", "They owned a circus", "They were all sailors"],
      correct: 0,
    },
    {
      question: "What did Basil do with his fortune?",
      choices: ["Gave it to the poor", "Buried it in the desert", "Bought a palace"],
      correct: 0,
    },
    {
      question: "What did Basil build outside the city?",
      choices: ["A hospital city for the poor and sick", "A race track", "A giant statue of himself"],
      correct: 0,
    },
    {
      question: "Who tried to frighten Basil into giving up?",
      choices: ["The emperor", "A dragon", "His own shadow"],
      correct: 0,
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
      choices: ["She belonged to Christ", "She disliked cake", "She wanted to travel"],
      correct: 0,
    },
    {
      question: "What animal is Agnes always painted with?",
      choices: ["A lamb", "A lion", "A parrot"],
      correct: 0,
    },
    {
      question: "What are the blessed lambs' wool used for?",
      choices: ["Archbishops' scarves", "Winter socks", "Football jerseys"],
      correct: 0,
    },
    {
      question: "Who is Agnes the patron saint of?",
      choices: ["Young girls and purity", "Race car drivers", "Deep sea divers"],
      correct: 0,
    },
  ],
  "st-fabian": [
    {
      question: "What was Fabian before becoming pope?",
      choices: ["An unknown farmer", "A famous general", "A wealthy banker"],
      correct: 0,
    },
    {
      question: "What landed on Fabian's head?",
      choices: ["A snow-white dove", "A falling apple", "A paper hat"],
      correct: 0,
    },
    {
      question: "What did the crowd shout?",
      choices: ["He is the one! God has chosen him!", "Send him away!", "Louder, please!"],
      correct: 0,
    },
    {
      question: "What did Fabian do as pope?",
      choices: ["Organized the Church and sent missionaries", "Built a bigger palace", "Took long holidays"],
      correct: 0,
    },
    {
      question: "How did Fabian die?",
      choices: ["Martyred for refusing to deny Christ", "Of old age in bed", "He disappeared at sea"],
      correct: 0,
    },
  ],
  "st-sebastian": [
    {
      question: "What was Sebastian's secret?",
      choices: ["He was a Christian", "He was afraid of horses", "He couldn't swim"],
      correct: 0,
    },
    {
      question: "What did the soldiers do to Sebastian?",
      choices: ["Shot him full of arrows", "Tickled him", "Sent him to bed"],
      correct: 0,
    },
    {
      question: "Who nursed Sebastian back to health?",
      choices: ["A widow named Irene", "The emperor himself", "A passing goat"],
      correct: 0,
    },
    {
      question: "What did Sebastian do once he recovered?",
      choices: ["Walked back and confronted the emperor", "Hid in a cave", "Sailed to Spain"],
      correct: 0,
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
      choices: ["Paul", "A pirate captain", "A camel driver"],
      correct: 0,
    },
    {
      question: "What did Paul call Timothy?",
      choices: ["My dear child", "My little problem", "My runaway servant"],
      correct: 0,
    },
    {
      question: "What city did Timothy become bishop of?",
      choices: ["Ephesus", "Paris", "London"],
      correct: 0,
    },
    {
      question: "What does Timothy teach us?",
      choices: ["God loves to use young people", "Only old people matter", "Stay home always"],
      correct: 0,
    },
  ],
  "st-titus": [
    {
      question: "What was Titus's special gift?",
      choices: ["Making angry people friends again", "Juggling fire", "Talking to fish"],
      correct: 0,
    },
    {
      question: "Where did Paul send Titus to make peace?",
      choices: ["Corinth", "The moon", "A bakery"],
      correct: 0,
    },
    {
      question: "Which wild island did Titus shepherd?",
      choices: ["Crete", "A floating island", "An island of cats"],
      correct: 0,
    },
    {
      question: "What did Paul's letter to Titus teach?",
      choices: ["Be gentle and do good", "Argue louder", "Take long naps"],
      correct: 0,
    },
    {
      question: "Whose feast day does Titus share?",
      choices: ["Timothy's", "Nobody's", "A dragon's"],
      correct: 0,
    },
  ],
  "st-angela-merici": [
    {
      question: "What sad thing did Angela notice?",
      choices: ["Poor girls got no schooling", "Too many holidays", "Not enough cake"],
      correct: 0,
    },
    {
      question: "What did Angela see in her vision?",
      choices: ["A ladder of light with singing girls", "A mountain of gold", "A flying ship"],
      correct: 0,
    },
    {
      question: "What did Angela found in 1535?",
      choices: ["The Ursulines, to teach girls", "A bakery", "A zoo"],
      correct: 0,
    },
    {
      question: "How did Angela tell her sisters to govern?",
      choices: ["With kindness, like mothers", "With strict shouting", "With locked doors"],
      correct: 0,
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
      choices: ["Kidnapped and locked him up", "Threw a party", "Ignored him"],
      correct: 0,
    },
    {
      question: "What did his teacher Albert predict?",
      choices: ["His bellowing will be heard around the world", "He will fail every test", "He will become a sailor"],
      correct: 0,
    },
    {
      question: "What is Thomas's greatest book called?",
      choices: ["The Summa", "The Cookbook", "The Pirate Map"],
      correct: 0,
    },
    {
      question: "What beautiful song did Thomas write?",
      choices: ["The Tantum Ergo", "Happy Birthday", "Row Row Row Your Boat"],
      correct: 0,
    },
  ],
  "st-john-bosco": [
    {
      question: "What did John dream at nine years old?",
      choices: ["Wild boys becoming gentle, and a Lady guiding him", "Flying elephants", "A mountain of homework"],
      correct: 0,
    },
    {
      question: "How did John attract village boys?",
      choices: ["Juggling and magic tricks", "Free ice cream", "Loud fireworks"],
      correct: 0,
    },
    {
      question: "What did Bosco say about hopeless boys?",
      choices: ["There are none, only unloved ones", "Avoid them all", "Lock them up"],
      correct: 0,
    },
    {
      question: "What family did Bosco found?",
      choices: ["The Salesians", "A circus troupe", "A navy"],
      correct: 0,
    },
    {
      question: "What was Bosco's motto about joy?",
      choices: ["Serve the Lord with gladness", "Never smile", "Frown more"],
      correct: 0,
    },
  ],
  "st-agatha": [
    {
      question: "Where was Agatha from?",
      choices: ["Sicily", "Egypt", "Norway"],
      correct: 0,
    },
    {
      question: "Why did the governor arrest Agatha?",
      choices: ["She refused to marry him or deny Christ", "She stole his horse", "She sang too loudly"],
      correct: 0,
    },
    {
      question: "Who appeared to comfort Agatha in prison?",
      choices: ["St Peter", "A palace guard", "Her pet cat"],
      correct: 0,
    },
    {
      question: "What miracle is linked to Agatha's veil?",
      choices: ["It stopped Mount Etna's lava", "It turned into gold", "It flew away"],
      correct: 0,
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
      choices: ["Futuna", "Hawaii", "Atlantis"],
      correct: 0,
    },
    {
      question: "How did Peter win hearts?",
      choices: ["Gentleness, language, and serving the sick", "Magic tricks", "Loud shouting"],
      correct: 0,
    },
    {
      question: "Why did the chief order Peter killed?",
      choices: ["He feared losing power as people converted", "Peter ate his lunch", "Peter snored"],
      correct: 0,
    },
    {
      question: "What happened to Futuna after Peter's death?",
      choices: ["The whole island became Christian", "Everyone forgot him", "It sank into the sea"],
      correct: 0,
    },
  ],
  "st-catherine-siena": [
    {
      question: "What number child was Catherine?",
      choices: ["The 25th", "The 1st", "The 3rd"],
      correct: 0,
    },
    {
      question: "What did Catherine do to avoid marriage?",
      choices: ["Cut off her long hair", "Ran to the forest", "Hid in a barrel"],
      correct: 0,
    },
    {
      question: "Who did Catherine persuade to return to Rome?",
      choices: ["The Pope", "A pirate king", "Her neighbour"],
      correct: 0,
    },
    {
      question: "What book did Catherine dictate?",
      choices: ["The Dialogue", "A cookbook", "A pirate map"],
      correct: 0,
    },
    {
      question: "What title was Catherine given?",
      choices: ["Doctor of the Church", "Queen of Siena", "Captain of ships"],
      correct: 0,
    },
  ],
  "st-rita": [
    {
      question: "What did little Rita dream of becoming?",
      choices: ["A nun", "A queen", "A sailor"],
      correct: 0,
    },
    {
      question: "How did Rita change her difficult husband?",
      choices: ["With patience, kindness, and prayer", "With shouting", "With magic spells"],
      correct: 0,
    },
    {
      question: "How did Rita finally enter the convent?",
      choices: ["Her patron saints lifted her over the wall", "She dug a tunnel", "She disguised herself"],
      correct: 0,
    },
    {
      question: "What miracle happened when Rita was dying?",
      choices: ["A rose bloomed in the snow", "It rained candy", "Stars fell down"],
      correct: 0,
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
      choices: ["Sacrifice to false gods", "Sing a song", "Dance a jig"],
      correct: 0,
    },
    {
      question: "What did Felicitas cry to her sons?",
      choices: ["Look up to heaven!", "Run away fast!", "Give up now!"],
      correct: 0,
    },
    {
      question: "What did Pope Gregory say about Felicitas?",
      choices: ["She was martyred in her sons and herself", "She was too noisy", "She baked well"],
      correct: 0,
    },
    {
      question: "What does Felicitas teach mothers?",
      choices: ["Want heaven for your children most of all", "Keep them home always", "Avoid church"],
      correct: 0,
    },
  ],
  "st-sharbel": [
    {
      question: "Where was Sharbel from?",
      choices: ["The mountains of Lebanon", "The deserts of Egypt", "The streets of Paris"],
      correct: 0,
    },
    {
      question: "What name did Youssef take as a monk?",
      choices: ["Sharbel", "Barnaby", "Felix"],
      correct: 0,
    },
    {
      question: "How did Sharbel live as a hermit?",
      choices: ["One meal, hard bed, endless prayer", "Feasts and parties", "Travelling the world"],
      correct: 0,
    },
    {
      question: "What wonders appeared over his tomb?",
      choices: ["Mysterious glowing lights", "Fireworks", "Falling snow"],
      correct: 0,
    },
    {
      question: "What does Sharbel teach us?",
      choices: ["Silence with God is louder than noise", "Talk constantly", "Avoid mountains"],
      correct: 0,
    },
  ],
  "st-gertrude": [
    {
      question: "Where was little Gertrude raised?",
      choices: ["The convent school of Helfta", "A pirate ship", "A royal palace"],
      correct: 0,
    },
    {
      question: "What changed Gertrude at twenty-six?",
      choices: ["A vision of Jesus", "A new dress", "A lost kitten"],
      correct: 0,
    },
    {
      question: "What did Gertrude hear in her famous vision?",
      choices: ["The beating of Jesus' Sacred Heart", "Thunder and lightning", "A choir of frogs"],
      correct: 0,
    },
    {
      question: "What book did Gertrude write?",
      choices: ["The Herald of Divine Love", "A book of recipes", "A travel guide"],
      correct: 0,
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
      choices: ["Walked straight back to his people", "Sailed to Rome", "Hid in a cave"],
      correct: 0,
    },
    {
      question: "How did Andrew die?",
      choices: ["Beheaded for refusing the cross-trampling", "Of old age", "He moved away"],
      correct: 0,
    },
    {
      question: "How many martyrs were canonized together in 1988?",
      choices: ["One hundred and seventeen", "Three", "Ten thousand"],
      correct: 0,
    },
    {
      question: "What do the martyrs teach us?",
      choices: ["Faith survives any storm together", "Give up quickly", "Avoid Vietnam"],
      correct: 0,
    },
  ],
  "st-francis-xavier": [
    {
      question: "What question changed Francis's life?",
      choices: ["What profits a man to gain the world and lose his soul?", "Where is my homework?", "Who ate my lunch?"],
      correct: 0,
    },
    {
      question: "How did Francis gather children in villages?",
      choices: ["Ringing a little bell", "Fireworks", "Free toys"],
      correct: 0,
    },
    {
      question: "Which new land did Francis sail to?",
      choices: ["Japan", "Antarctica", "The moon"],
      correct: 0,
    },
    {
      question: "Which country did Francis dream of reaching?",
      choices: ["China", "Peru", "Iceland"],
      correct: 0,
    },
    {
      question: "Who is Francis Xavier the patron saint of?",
      choices: ["Missions", "Surfers", "Chefs"],
      correct: 0,
    },
  ],
  "st-stephen": [
    {
      question: "What was Stephen chosen to do first?",
      choices: ["Serve food to poor widows", "Build a tower", "Count money"],
      correct: 0,
    },
    {
      question: "What did Stephen's face shine like?",
      choices: ["An angel's", "The sun at noon", "A polished shoe"],
      correct: 0,
    },
    {
      question: "What did Stephen see when he looked up?",
      choices: ["The heavens opened and Jesus", "A flock of geese", "A thunderstorm"],
      correct: 0,
    },
    {
      question: "What did Stephen pray as he died?",
      choices: ["Lord, do not hold this sin against them", "Run away, friends!", "I give up!"],
      correct: 0,
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
      choices: ["A flash of blinding heavenly light", "A falling coconut", "A strong sneeze"],
      correct: 0,
    },
    {
      question: "What did the voice from the light say?",
      choices: ["Saul, Saul, why are you hurting Me?", "Turn back at once!", "Dinner is ready!"],
      correct: 0,
    },
    {
      question: "Who baptized Saul in Damascus?",
      choices: ["Ananias", "The emperor", "A passing shepherd"],
      correct: 0,
    },
    {
      question: "How many of Paul's letters are in our Bible?",
      choices: ["Thirteen", "Two", "One hundred"],
      correct: 0,
    },
  ],
};
