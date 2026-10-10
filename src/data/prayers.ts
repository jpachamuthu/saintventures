export type Prayer = {
  text: string;
  footnote: string;
};

const COMPOSED = "Original prayer composed for SaintVentures.";

/**
 * One prayer per saint, keyed by story id.
 * - Verbatim traditional prayers are public domain and footnoted as such.
 * - "After ..." entries retell the saint's own genuine words simply.
 * - Everything else is an original prayer in the saint's spirit.
 */
export const prayers: Record<string, Prayer> = {
  "st-anthony": {
    text: "St Anthony, finder of what is lost, help me find what matters most. When I lose my keys, my courage, or my way, lead me gently back to Jesus. Amen.",
    footnote: COMPOSED,
  },
  "st-joan": {
    text: "St Joan, brave girl with a banner, give me courage when I feel small. When everyone says I cannot, remind me that with God, I can. Amen.",
    footnote: COMPOSED,
  },
  "st-clare": {
    text: "St Clare, you told us to gaze upon Jesus until our hearts catch fire. Help me look at Him every day — in prayer, in others, and in the little poor things of the world. Amen.",
    footnote: "After St Clare's letters to St Agnes (public domain).",
  },
  "st-pio": {
    text: "St Pio, who carried your crosses with a smile, teach me to pray, hope, and not worry. When I suffer, help me offer it up with love, the way you did. Amen.",
    footnote: COMPOSED,
  },
  "st-francis": {
    text: "Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; and where there is sadness, joy.\n\nO Divine Master, grant that I may not so much seek to be consoled as to console; to be understood as to understand; to be loved as to love. For it is in giving that we receive; it is in pardoning that we are pardoned; and it is in dying that we are born to eternal life. Amen.",
    footnote: "Traditional prayer of St Francis (public domain).",
  },
  "st-therese": {
    text: "Little St Therese, who did small things with great love, teach my heart your little way. Help me pick up toys, share smiles, and say sorry — all for Jesus. Amen.",
    footnote: COMPOSED,
  },
  "st-jude": {
    text: "St Jude, friend of hopeless causes, I bring you my biggest worry. When everyone says there is no hope, remind me that with God nothing is impossible. Amen.",
    footnote: COMPOSED,
  },
  "st-john-baptist": {
    text: "St John the Baptist, voice in the desert, help me point everyone to Jesus the way you did. Make my heart ready, my words brave, and my life a path straight to Him. Amen.",
    footnote: COMPOSED,
  },
  "st-mary-magdalene": {
    text: "St Mary Magdalene, first to see the risen Jesus, give me a heart that never stops looking for Him. When I am sad, let me hear Him call my name too. Amen.",
    footnote: COMPOSED,
  },
  "st-fulgentius": {
    text: "St Fulgentius, radiant bishop, light up my mind to understand God's truth. When I am confused, lead me gently back to what is right. Amen.",
    footnote: COMPOSED,
  },
  "st-macarius": {
    text: "St Macarius, quiet hermit of the desert, teach me to love silence. In the noise of the day, help me find one still moment alone with God. Amen.",
    footnote: COMPOSED,
  },
  "st-genevieve": {
    text: "St Genevieve, little light of Paris, keep my lamp of faith burning bright. When scary things happen, help me pray instead of panic. Amen.",
    footnote: COMPOSED,
  },
  "st-mariam": {
    text: "Little Arab St Mariam, who loved the Holy Spirit, fill my heart with His joy. Help me love Jesus the way you did — simply, totally, and with a smile. Amen.",
    footnote: COMPOSED,
  },
  "st-christina": {
    text: "St Christina, who came back to pray for suffering souls, teach me to pray for people who are hurting. Help me offer my little pains for someone who needs them. Amen.",
    footnote: COMPOSED,
  },
  "st-mary-mackillop": {
    text: "St Mary MacKillop, who never saw a need without doing something, open my eyes to people who need help. Give me your courage to act, even when it is hard. Amen.",
    footnote: "After St Mary MacKillop's saying (public domain).",
  },
  "st-carlo-acutis": {
    text: "St Carlo, who loved Jesus in the Eucharist more than computer games, teach me to put God first. Help me use my talents to tell the world how good He is. Amen.",
    footnote: COMPOSED,
  },
  "st-peter": {
    text: "St Peter, rock of the Church, when I mess up like you did, help me say sorry and start again. Keep my feet steady on Jesus, even when the waves are big. Amen.",
    footnote: COMPOSED,
  },
  "st-andrew": {
    text: "St Andrew, the first to say yes, help me bring my friends to Jesus the way you brought Peter. Give me feet quick to follow and a heart quick to share. Amen.",
    footnote: COMPOSED,
  },
  "st-james-greater": {
    text: "St James, pilgrim apostle, walk beside me on every road I travel. When the journey is long, keep my eyes on heaven, where you already are. Amen.",
    footnote: COMPOSED,
  },
  "st-john": {
    text: "St John, beloved friend of Jesus, teach me to rest my head on His heart the way you did. Fill me with a love so big it drives out all fear. Amen.",
    footnote: COMPOSED,
  },
  "st-philip": {
    text: "St Philip, who asked to see the Father, help me see God in the people around me. When I doubt, show me Jesus, and let that be enough. Amen.",
    footnote: COMPOSED,
  },
  "st-bartholomew": {
    text: "St Bartholomew, honest seeker with no sneaky corners, make my heart truthful like yours. Help me come to Jesus just as I am. Amen.",
    footnote: COMPOSED,
  },
  "st-thomas": {
    text: "St Thomas, who touched and believed, help my doubts turn into faith like yours. When I struggle to believe, let me cry with you: my Lord and my God! Amen.",
    footnote: "After his words in the Gospel of John (public domain).",
  },
  "st-matthew": {
    text: "St Matthew, tax collector turned apostle, thank you for showing that Jesus invites everyone. When I feel left out, remind me there is a seat for me at His table. Amen.",
    footnote: COMPOSED,
  },
  "st-james-less": {
    text: "St James the Less, quiet apostle, teach me that small and hidden can still be holy. Help me serve without needing applause. Amen.",
    footnote: COMPOSED,
  },
  "st-simon-zealot": {
    text: "St Simon, whose fire for God turned into peace, calm my angry feelings. Turn all my big energy into love for Jesus and others. Amen.",
    footnote: COMPOSED,
  },
  "st-matthias": {
    text: "St Matthias, chosen quietly to take your place, help me be faithful in hidden jobs. When nobody notices, remind me that God sees. Amen.",
    footnote: COMPOSED,
  },
  "st-mark": {
    text: "St Mark, who wrote down the Good News, help me tell the story of Jesus bravely. Give me a lion's courage to never be ashamed of Him. Amen.",
    footnote: COMPOSED,
  },
  "st-luke": {
    text: "St Luke, gentle doctor and storyteller, heal the parts of my heart that hurt. Help me notice the poor and the forgotten, the way your Gospel does. Amen.",
    footnote: COMPOSED,
  },
  "st-theresa-calcutta": {
    text: "St Teresa of Calcutta, mother to the poorest, teach my hands to serve and my heart to love. Help me do small things with great love, starting at home. Amen.",
    footnote: COMPOSED,
  },
  "st-maria-goretti": {
    text: "St Maria Goretti, brave forgiver, soften my heart when someone hurts me. Help me say, like you did: I forgive, and I want us to be happy in heaven together. Amen.",
    footnote: COMPOSED,
  },
  "st-augustine": {
    text: "Late have I loved you, Beauty so old and so new! You were inside me, but I kept running outside myself after pretty empty things. You called to me and broke through my deafness. Now I burn to stay close to you. St Augustine, pray that I stop running — and rest in God. Amen.",
    footnote: "After St Augustine's Confessions (public domain).",
  },
  "st-monica": {
    text: "St Monica, mother of tears that won heaven, teach me never to stop praying for the people I love. Even when nothing changes, help me trust and keep going. Amen.",
    footnote: COMPOSED,
  },
  "st-josephine-bakhita": {
    text: "St Josephine Bakhita, free daughter of God, unchain every angry feeling in my heart. Help me forgive even big hurts, and smile the way you smiled. Amen.",
    footnote: COMPOSED,
  },
  "st-vincent-de-paul": {
    text: "St Vincent, friend of the poor, make my heart tender toward people in need. Help me serve them as I would serve Jesus Himself — quickly, gently, and with joy. Amen.",
    footnote: "After his saying to serve the poor tenderly (public domain).",
  },
  "st-augustine-zhao-rong": {
    text: "St Augustine Zhao Rong, brave soldier of Christ, give me courage to stand up for my faith. When it is hard to be Christian, help me stay strong and kind. Amen.",
    footnote: COMPOSED,
  },
  "st-lawrence-ruiz": {
    text: "St Lawrence Ruiz, who offered a thousand lives to God, make me brave like you. If I ever must choose, help me choose Jesus — with all my heart. Amen.",
    footnote: "After his words at his martyrdom (public domain).",
  },
  "st-michael-archangel": {
    text: "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray. And do thou, O Prince of the heavenly host, by the power of God, cast into hell Satan and all evil spirits who wander through the world seeking the ruin of souls. Amen.",
    footnote: "Traditional prayer to St Michael (public domain).",
  },
  "st-gabriel-archangel": {
    text: "St Gabriel, bringer of good news, help me say yes to God the way Mary did. When God asks something big of me, give me her courage and her trust. Amen.",
    footnote: COMPOSED,
  },
  "st-raphael-archangel": {
    text: "St Raphael, guide on the road, walk beside me wherever I go. Keep me safe on every journey, and lead me happily home to God. Amen.",
    footnote: COMPOSED,
  },
  "st-john-paul-ii": {
    text: "St John Paul II, pope who told the world not to be afraid, chase my fears away. Help me open wide the doors of my heart to Christ, today and always. Amen.",
    footnote: COMPOSED,
  },
  "st-gregory-the-great": {
    text: "St Gregory, servant of the servants of God, teach me that greatness means serving. Help me be first to help, last to boast, and happiest on my knees. Amen.",
    footnote: COMPOSED,
  },
  "st-bernadette": {
    text: "St Bernadette, little girl of the grotto, give me your simple trust. When I don't understand God's plans, help me pray my rosary and believe anyway. Amen.",
    footnote: COMPOSED,
  },
  "st-faustina": {
    text: "St Faustina, secretary of mercy, teach my heart your little prayer: Jesus, I trust in You. When I mess up, help me run to His mercy instead of hiding. Amen.",
    footnote: "Original prayer composed for SaintVentures, echoing her words.",
  },
  "st-jerome": {
    text: "St Jerome, lion-friend who loved the Scriptures, help me love God's word too. Open the Bible with me, and let one verse light up my whole day. Amen.",
    footnote: "After his saying on loving Scripture (public domain).",
  },
  "st-maximilian-kolbe": {
    text: "St Maximilian Kolbe, martyr of charity, teach me what love really costs. Help me share, forgive, and give — even when it hurts — the way you gave everything. Amen.",
    footnote: COMPOSED,
  },
  "st-joseph": {
    text: "O St Joseph, whose protection is so great and so gentle, guard me as you guarded Mary and Jesus. Watch over my family tonight, and keep us all safe until morning. Amen.",
    footnote: "After the traditional prayer to St Joseph (public domain).",
  },
  "st-christopher": {
    text: "St Christopher, carrier of Christ, carry me safely on every journey. Whether I walk, ride, or fly, keep your strong arms around me until I'm home. Amen.",
    footnote: COMPOSED,
  },
  "st-peter-julian": {
    text: "St Peter Julian, adorer of Jesus in the Eucharist, teach me to visit Him often. When I pass a church, remind my heart to whisper: hello, Jesus, I love you. Amen.",
    footnote: COMPOSED,
  },
  "st-alphonsus-liguori": {
    text: "St Alphonsus, gentle guide of sorry hearts, help me make a good confession. Teach me to be sorry, to tell the truth, and to start fresh with joy. Amen.",
    footnote: COMPOSED,
  },
  "st-basil": {
    text: "St Basil the Great, builder of mercy, open my eyes to people in need. Help me share my food, my toys, and my time — and never walk past someone hungry. Amen.",
    footnote: COMPOSED,
  },
  "st-agnes": {
    text: "St Agnes, pure lamb of Rome, keep my heart clean and brave. When others pressure me to do wrong, give me your smile and your strong little no. Amen.",
    footnote: COMPOSED,
  },
  "st-fabian": {
    text: "St Fabian, chosen by a dove, help me say yes whenever God points at me. Even if I feel small and unknown, remind me that heaven sees me. Amen.",
    footnote: COMPOSED,
  },
  "st-sebastian": {
    text: "St Sebastian, soldier who would not fall, give me courage that gets back up. When life shoots arrows at me, help me stand tall with Jesus. Amen.",
    footnote: COMPOSED,
  },
  "st-timothy": {
    text: "St Timothy, young helper with a big job, remind me that I am not too young. Fill me with a spirit of power and love instead of fear. Amen.",
    footnote: "After St Paul's words to Timothy (public domain).",
  },
  "st-titus": {
    text: "St Titus, peacemaker, help me stop arguments instead of starting them. Teach my words to heal, my hands to help, and my heart to forgive. Amen.",
    footnote: COMPOSED,
  },
  "st-angela-merici": {
    text: "St Angela, teacher of girls, help me love learning and love others. Bless my teachers, my school, and every girl who wants to go. Amen.",
    footnote: COMPOSED,
  },
  "st-thomas-aquinas": {
    text: "St Thomas Aquinas, brilliant and humble, light up my mind to know God. Help me study well, ask big questions, and sing His praises with joy. Amen.",
    footnote: "After his Eucharistic hymns and prayers (public domain).",
  },
  "st-john-bosco": {
    text: "St John Bosco, father of happy children, teach me to serve God with gladness. Help me play, laugh, pray, and bring my friends to Jesus too. Amen.",
    footnote: COMPOSED,
  },
  "st-agatha": {
    text: "St Agatha, brave girl of Sicily, give me courage to say no to evil and yes to Jesus. Bless our bread and our homes, and keep us safe. Amen.",
    footnote: COMPOSED,
  },
  "st-peter-chanel": {
    text: "St Peter Chanel, gentle missionary, make my heart kind to everyone — even people very different from me. Help me tell others about Jesus with a smile. Amen.",
    footnote: COMPOSED,
  },
  "st-catherine-siena": {
    text: "St Catherine, who spoke boldly to popes, give me courage to speak the truth with love. When something is wrong, help me say so — kindly, bravely, and with a smile. Amen.",
    footnote: "After her Dialogue and letters (public domain).",
  },
  "st-rita": {
    text: "St Rita, saint of impossible causes, I bring you my impossible prayer. When everyone says give up, help me hope anyway — and trust God's answer. Amen.",
    footnote: COMPOSED,
  },
  "st-felicitas": {
    text: "St Felicitas, bravest of mothers, bless my mum and all mothers. Help our family love heaven more than anything, and stay together forever with God. Amen.",
    footnote: COMPOSED,
  },
  "st-sharbel": {
    text: "St Sharbel, silent hermit, teach me to love quiet prayer. In one still moment today, help me sit with God and listen. Amen.",
    footnote: COMPOSED,
  },
  "st-gertrude": {
    text: "St Gertrude, who heard His heartbeat, let me rest my head on Jesus' heart too. Fill me with His love until it spills over onto everyone I meet. Amen.",
    footnote: COMPOSED,
  },
  "st-andrew-dung-lac": {
    text: "St Andrew Dũng-Lạc and companions, brave martyrs of Vietnam, keep my faith strong when it is hard. Help me hold onto Jesus together with my family and friends. Amen.",
    footnote: COMPOSED,
  },
  "st-francis-xavier": {
    text: "St Francis Xavier, runner to the ends of the earth, give me missionary feet. Help me tell someone about Jesus this week — with words, or simply with kindness. Amen.",
    footnote: COMPOSED,
  },
  "st-stephen": {
    text: "St Stephen, first martyr, teach me to forgive like you and Jesus did. When someone hurts me, help me pray for them instead of staying angry. Amen.",
    footnote: "After his words in the Acts of the Apostles (public domain).",
  },
  "st-paul": {
    text: "St Paul, who met Jesus in a flash of light, open my eyes to Him too. Turn my wrong turns around, and send me running to tell the world. Amen.",
    footnote: COMPOSED,
  },
  "st-ignatius-loyola": {
    text: "St Ignatius, turned around by a cannonball and a stack of books, use even my accidents and my boredom. Show me what to do with my life — all for the greater glory of God. Amen.",
    footnote: COMPOSED,
  },
  "st-felicity-perpetua": {
    text: "Sts Felicity and Perpetua, brave mothers hand in hand, help me hold onto Jesus and onto each other. When I am afraid, remind me we never walk alone. Amen.",
    footnote: COMPOSED,
  },
  "st-mariam-vattalil": {
    text: "Blessed Rani Maria, queen of forgiveness, teach my heart to forgive like yours. When someone hurts me, help me pray for them — and keep smiling. Amen.",
    footnote: COMPOSED,
  },
  "st-beatrice-rome": {
    text: "St Beatrice, faithful sister, help me love my family fiercely and stand firm gently. When doing right is hard, hold my hand the way Jesus held yours. Amen.",
    footnote: COMPOSED,
  },
  "st-peter-pattarini": {
    text: "Blessed Peter Pattarini, peacemaker and knight of mercy, turn my losses into love. When life takes something away, show me who I can serve instead. Amen.",
    footnote: COMPOSED,
  },
  "st-hugh-genoa": {
    text: "St Hugh of Genoa, faithful friend of the sick, teach me to serve quietly for a lifetime. Help me find one good work and do it with love, day after day. Amen.",
    footnote: COMPOSED,
  },
  "st-john-xxiii": {
    text: "Almighty and eternal God, who in the Blessed Pope John, you gave the world shining example of the good shepherd, grant that we, through his intercession, may radiate with joy the fullness of Christian love. We ask this through Our Lord Jesus Christ, your Son, who lives and reigns with you and the Holy Spirit, one God, for ever and ever. Amen.",
    footnote: "From Fra’ James-Michael von Stroebel; Order of Malta American Association Proprium Breviarii of the Irish Association.",
  },
  "st-gerard-jerusalem": {
    text: "O God, who exalted Blessed Gerard because of his care for the poor and the sick, and though him founded in Jerusalem The Order of Saint John the Baptist, give us the grace of seeing, as he did, the image of your Son in our brothers and sisters. We ask this through our Lord Jesus Christ your Son, who lives and reigns with you and the Holy Spirit one God, for ever and ever. Amen.",
    footnote: "From Fra’ James-Michael von Stroebel; Order of Malta American Association.",
  },
};
