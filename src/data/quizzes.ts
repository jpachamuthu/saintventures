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
};
