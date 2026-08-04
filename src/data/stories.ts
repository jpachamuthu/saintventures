export type StoryPalette = "gold" | "dawn" | "sea" | "ember" | "azure" | "forest" | "rose";
export type ArtVariant = "saint" | "sword" | "lamp" | "rosary" | "birds" | "rose";

export type Story = {
  id: string;
  title: string;
  saint: string;
  blurb: string;
  minutes: number;
  age: number;
  palette: StoryPalette;
  art: ArtVariant;
  source: string;
  pages: string[];
};

export const stories: Story[] = [
  {
    id: "st-anthony",
    title: "The Miracle of St Anthony",
    saint: "St Anthony of Padua",
    blurb:
      "A quiet, bookish friar is too afraid to speak in front of people — until his shaky knees carry him toward the biggest miracle of his life.",
    minutes: 6,
    age: 3,
    palette: "ember",
    art: "saint",
    source: "Butler's Lives of the Saints (public domain)",
    pages: [
      "Long ago, in a sunny city called Lisbon, there lived a boy named Fernando. He loved two things more than anything: listening to stories from the Bible, and asking why. Why did the stars stay up at night? Why did birds never get lost? His father was a soldier and hoped Fernando would be one too — but Fernando's heart kept turning, quietly, toward God.",
      "When Fernando grew up, he became a friar and took a new name: Anthony. He loved books and quiet corners, and he thought his whole life would be spent reading in a small stone room. He was good at listening. He was not, he thought, very good at speaking in front of people. His knees shook just thinking about it.",
      "One day, the friars needed someone — anyone — to preach at a big gathering, and no one else was ready. “Anthony, will you try?” they asked. His stomach flipped like a fish out of water. But he said yes, took a breath, and stood up in front of the crowd.",
      "And then something wonderful happened. The words came — clear, warm, and wise — as if they had been waiting inside him his whole life. The crowd went silent, then leaned forward, then wept, then smiled. Nobody could believe that quiet, bookish Anthony had a voice like that.",
      "News of the preaching friar spread from town to town. But Anthony didn't just talk to people who wanted to listen. One day, in a town where hardly anyone would come to hear him, he walked down to the river instead — and began to preach to the fish.",
      "It sounds silly, but watch: hundreds of fish rose to the surface, poked their heads out of the water, and lined up in neat rows, as if they, too, wanted to hear about God's love. People from the town came running to see the strange sight — and stayed to listen themselves.",
      "Years later, Anthony was praying alone late at night, holding a book, when the room filled with a soft light. He looked up — and there, sitting on the page of his book, was a little child, glowing gently, smiling right at him. It was the Christ Child himself, come to visit the friar who loved Him so much.",
      "Anthony held out his arms, and the little light-filled child let himself be held, the way any small child rests in someone they trust. Anthony didn't need words this time. He just stayed very still, and very happy, until the light faded and the room was quiet again.",
      "Anthony spent his life doing simple, kind things: helping the poor, comforting the sad, finding lost and broken things — and helping people find their way back to what mattered. That's why, still today, people who've lost something — a key, a memory, even hope — often say a little prayer and ask St Anthony to help them find it.",
      "Anthony was never the loudest or the bravest-seeming boy in the room. He was just willing to say yes, even with shaky knees. And that turned out to be enough — because the biggest miracles usually start with someone small, saying yes.",
    ],
  },
  {
    id: "st-joan",
    title: "The Girl Who Wore a Sword",
    saint: "St Joan of Arc",
    blurb:
      "A village girl who could not read or write hears a voice and rides off to save a whole country — with nothing but a white banner and a very brave heart.",
    minutes: 8,
    age: 4,
    palette: "azure",
    art: "sword",
    source: "Butler's Lives of the Saints (public domain)",
    pages: [
      "In a little French village called Domrémy, a long time ago, there lived a girl named Jehanne — which means Joan. She helped her mother with the sheep and her father in the fields. But in her heart, she was always listening for something more.",
      "One summer day, in her father's garden, the air suddenly turned golden. Joan heard a gentle voice calling her name. It was the voice of a messenger from God, and it brought her a very surprising job.",
      "“Joan,” the voice said, “the people of France are sad and lost. Will you help the young prince become king?” Joan was only a village girl. She could not read or write. “How can I do this?” she asked. “I don't even own a sword.”",
      "But Joan said yes. She cut her hair short, wore clothes like the soldiers, and rode a big white horse. At first, the princes laughed at her. A girl who hears voices? But Joan's eyes were so honest and so brave that, little by little, they began to listen.",
      "Joan carried a beautiful white banner covered in flowers — and she would not carry a weapon. “I will never hurt anyone,” she said. “I will just lead the way, and the soldiers will protect me.”",
      "The great city of Orléans was surrounded by enemies. Everyone said saving it was impossible. But Joan walked forward with her banner, and her courage was so bright that the gates of the city opened, and the people cheered. Orléans was saved!",
      "After that, Joan rode beside the young prince all the way to the huge cathedral at Reims, where he was crowned king. Flowers fell in the streets, bells rang, and Joan smiled the biggest smile of her life.",
      "But the story was not all sunshine. Later, Joan was captured and locked in a cold stone tower. Judges asked her confusing questions, over and over. “Why did you listen to those voices?” But Joan stayed honest and true, no matter how frightened she felt.",
      "She never pretended to be someone she wasn't. The soldiers who guarded her said her courage never left her — not even on her last, hardest day.",
      "Years later, everyone came to understand what a gift she had been. Today, St Joan of Arc is a great saint and a protector of France and of soldiers. And every time someone is brave in a quiet, honest way, her story lives on.",
    ],
  },
  {
    id: "st-clare",
    title: "Clare's Bright Light",
    saint: "St Clare of Assisi",
    blurb:
      "A rich girl slips out of her big house one night to follow God — and her little lamp of faith outshines even an army of soldiers.",
    minutes: 6,
    age: 3,
    palette: "gold",
    art: "lamp",
    source: "Butler's Lives of the Saints (public domain)",
    pages: [
      "Long ago, in a sunny town called Assisi, a little girl named Clare lived in a tall stone house. Her family was rich, with shiny dishes and fine clothes. But Clare kept her eyes on something brighter.",
      "She loved to listen to the young preacher Francis, who talked about being poor and gentle, like the birds. His words made Clare's heart feel light, like a little candle flame.",
      "On Palm Sunday night, Clare slipped out of her big house, through the quiet streets, and ran to the little church where Francis was waiting. “I want to follow God,” she whispered. Francis smiled, and cut her hair as a sign of her new life.",
      "Clare gave away her pretty dresses and wore a plain grey robe. She and her friends began to live in a small, poor home called San Damiano, right next to the garden where the olive trees grew.",
      "Clare's sisters were called the Poor Ladies. They had almost nothing — no shoes, no money — but their little house was full of joy and singing. Clare liked to say they were the richest people in the whole town.",
      "One morning, there was no bread in the house. “Let's all sit down and thank God,” Clare said, “and then we'll see.” When they opened the cupboard, there were enough loaves for everyone — and no one ever knew where they came from!",
      "Another time, when Clare was very sick, she could not go to the chapel for Christmas Mass. So God showed her the Mass anyway, right from her bed — the singing, the bright lights, and the little town all appeared to her like a picture.",
      "One terrible day, soldiers came marching toward San Damiano, and the sisters were so scared. But Clare took the golden box with the Blessed Sacrament, held it high, and prayed. The soldiers turned and ran away — every single one of them.",
      "When the danger passed, Clare put the golden box down and smiled. “God is with us,” she said gently. “We have nothing to be afraid of.” That is why people have always known her as a strong, brave protector.",
      "Clare was ill for many years, but she was never sad. Her sisters said she was like a bright lamp that never went out. Today, St Clare is the patron saint of television — because she saw God's wonders from far away — and her light still shines on.",
    ],
  },
  {
    id: "st-pio",
    title: "Padre Pio and the Little Miracles",
    saint: "St Pio of Pietrelcina",
    blurb:
      "A cheerful farm boy becomes a humble friar who carries Jesus' marks — and tells everyone he meets to pray, hope, and not worry.",
    minutes: 7,
    age: 4,
    palette: "ember",
    art: "rosary",
    source: "Church biography (public facts); Butler's Lives of the Saints (public domain)",
    pages: [
      "In a tiny village in Italy called Pietrelcina, a boy named Francesco was born into a poor farming family. His mother always said he was born smiling — and she was right. He loved to laugh, and he loved to pray.",
      "Francesco had one secret wish: to be a Capuchin friar, one of the ones with the long brown robes. But his family needed his help in the fields. So he waited, and he prayed, and he kept his wish safe in his heart.",
      "Then, when he was grown, the friars said yes. Francesco took a new name: Pio, which means “kind.” Soon everyone called him Padre Pio — Father Pio. And it wasn't long before something unusual began to happen.",
      "People who came to him sad walked away feeling lighter. People who came angry walked away calm. It seemed Padre Pio knew what was in people's hearts even before they said a word.",
      "One evening, while Padre Pio was praying in the chapel, he felt a strange, gentle fire. From that day on, his hands, his feet, and his side carried the marks of Jesus' love — small wounds that never went away.",
      "He was shy about them and wore soft gloves to hide them. “I am only a poor, ordinary friar,” he always said. But people knew they were special, and they came from far, far away just to meet him.",
      "Padre Pio's favorite place was the confessional. Sometimes he sat there for hours and hours, listening and helping, whispering over and over: “Pray, hope, and don't worry.” Those words helped more people than anyone can count.",
      "He noticed that sick people had to travel very far to see a doctor. So he asked his friends to help him build a big hospital right in his town — the House for the Relief of Suffering. Today it still helps thousands of people.",
      "Padre Pio loved animals too. A little white cat used to sit beside him at mealtimes, and the town's birds would sing near his window. He would laugh and say even they had been sent to keep him company.",
      "Padre Pio died on a quiet September night, and the whole town lit candles for him. Today, St Pio of Pietrelcina is one of the most loved saints in the world — a friend to anyone who needs a little hope, a little prayer, and a reminder not to worry.",
    ],
  },
  {
    id: "st-francis",
    title: "The Little Poor Man of Assisi",
    saint: "St Francis of Assisi",
    blurb:
      "A rich party boy gives everything away to live like a bird in the hills — and becomes a friend to every creature under the sun.",
    minutes: 7,
    age: 3,
    palette: "forest",
    art: "birds",
    source: "Butler's Lives of the Saints (public domain)",
    pages: [
      "In the town of Assisi, a rich young man named Francis loved parties, songs, and fine clothes. His friends called him the prince of fun. But one day, something changed in his heart.",
      "After a long sickness, Francis rode through the countryside and met a poor man shivering in the cold. Instead of riding past, Francis got off his horse and gave the man his warm cloak. That one small moment made him think about everything.",
      "“I want to be poor like Jesus,” Francis said one day. He walked into an old chapel and seemed to hear a voice from the cross: “Francis, rebuild my house.” He thought the little chapel needed fixing — so he began carrying stones!",
      "He gave his fine clothes back to his father, put on a rough brown robe with a rope belt, and went to live on the hillside, trusting that God would send him everything he needed. He was poor — and he was happy.",
      "Soon other men joined him, and they became known as the friars. They called one another “brother,” and to everyone they met they gave the greeting: “Peace and goodness.”",
      "One day, Francis saw a flock of birds waiting for him in a field. “Sisters, my little bird sisters,” he said, “be glad! The sky is your home and the wind is your music.” The birds listened, then flew off singing.",
      "Another time, a hungry wolf was frightening a whole town. While everyone hid, Francis walked calmly out to meet it, and spoke to it so gently that the wolf became as gentle as a puppy.",
      "Francis loved all of God's creation. He called the sun “brother” and the moon “sister,” and he wrote a happy song about the whole world, called the Canticle of the Creatures.",
      "At the very end of his life, while praying on a quiet mountain, Francis received a special gift — the marks of Jesus' love on his hands and feet. He carried them like a secret treasure, hidden under his sleeves.",
      "Francis died singing and smiling, surrounded by his brothers. Today, St Francis of Assisi is loved all over the world — and every pet you have ever met has a special friend in him. Peace and goodness!",
    ],
  },
  {
    id: "st-therese",
    title: "The Little Flower",
    saint: "St Therese of Lisieux",
    blurb:
      "The littlest girl in a big family discovers that doing small things with great love can make a whole lifetime of big miracles.",
    minutes: 6,
    age: 3,
    palette: "rose",
    art: "rose",
    source: "Butler's Lives of the Saints (public domain)",
    pages: [
      "A long time ago, in a town in France called Lisieux, the littlest girl in a big, happy family was named Therese. Everyone called her “the little one” — and she grew up watching her big sisters love God with all their hearts.",
      "One spring, the family found a nest of tiny baby birds, and Therese helped her mother and father feed them. She loved watching them grow strong and fly away — and she decided she wanted to be brave, just like them.",
      "Then Therese got very, very sick. Her big sisters prayed to Mary, and one morning, Therese said, she saw Mary smile at her. From that day on, she began to get better — little by little, like a flower opening.",
      "Therese had one big wish: to give her whole life to God. When she was still very young, she traveled all the way to Rome to ask the Pope herself. And in the end, she got her wish!",
      "Inside the convent, Therese did not do big, amazing things. She swept floors, helped in the kitchen, and said quiet prayers. But she did them with so much love that they became big.",
      "Therese had a secret way of growing closer to God — she called it her “little way.” It meant doing small things with great love: sharing a smile, picking up a dropped pin, and never grumbling.",
      "She loved flowers, especially roses. “I will send down a shower of roses from heaven,” she once promised. “A rain of petals to fall on the people I love.”",
      "When winter came, Therese became ill and was too weak to leave her bed. But she never stopped smiling. “I am not dying,” she said. “I am entering into life.”",
      "Therese promised that after she died, she would spend her whole heaven doing good on earth — helping children, and sending roses to anyone who asked for her help.",
      "Today, St Therese of Lisieux is known as the Little Flower. People everywhere pray to her, and they say that when she helps, something small and sweet happens — a rose appears, or a worry melts away. That is her little way.",
    ],
  },
];

export const featuredStory = stories[0];
