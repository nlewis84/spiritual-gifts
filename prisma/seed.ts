import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Array of questions with their text and question number
const questions: {
  text: string;
  questionNumber: number;
  gift: string;
}[] = [
  { text: "I have the ability to organize ideas, resources, time, and people effectively.", questionNumber: 1, gift: "Administration" },
  { text: "I am willing to study and prepare for the task of teaching.", questionNumber: 2, gift: "Teaching" },
  { text: "I am able to relate the truths of God to specific situations.", questionNumber: 3, gift: "Wisdom" },
  { text: "I have a God-given ability to help others grow in their faith.", questionNumber: 4, gift: "Shepherding" },
  { text: "I possess a special ability to communicate the truth of salvation.", questionNumber: 5, gift: "Evangelism" },
  { text: "I have the ability to make critical decisions when necessary.", questionNumber: 6, gift: "Leadership" },
  { text: "I am sensitive to the hurts of people.", questionNumber: 7, gift: "Mercy" },
  { text: "I experience joy in meeting needs through sharing possessions.", questionNumber: 8, gift: "Giving" },
  { text: "I enjoy studying.", questionNumber: 9, gift: "Knowledge" },
  { text: "I have delivered God’s message of warning and judgment.", questionNumber: 10, gift: "Prophecy" },
  { text: "I am able to sense the true motivation of persons and movements.", questionNumber: 11, gift: "Discernment" },
  { text: "I have a special ability to trust God in difficult situations.", questionNumber: 12, gift: "Faith" },
  { text: "I have a strong desire to contribute to the establishment of new churches.", questionNumber: 13, gift: "Apostleship" },
  { text: "I take action to meet physical and practical needs rather than merely talking about or planning how to help.", questionNumber: 14, gift: "Service/Helps" },
  { text: "I enjoy entertaining guests in my home.", questionNumber: 15, gift: "Hospitality" },
  { text: "I can adapt my guidance to fit the maturity of those working with me.", questionNumber: 16, gift: "Leadership" },
  { text: "I can delegate and assign meaningful work.", questionNumber: 17, gift: "Administration" },
  { text: "I have an ability and desire to teach.", questionNumber: 18, gift: "Teaching" },
  { text: "I am usually able to analyze a situation correctly.", questionNumber: 19, gift: "Wisdom" },
  { text: "I have a natural tendency to encourage others.", questionNumber: 20, gift: "Exhortation" },
  { text: "I am willing to take the initiative in helping other Christians grow in their faith.", questionNumber: 21, gift: "Shepherding" },
  { text: "I have an acute awareness of other people’s emotions, such as loneliness, pain, fear, and anger.", questionNumber: 22, gift: "Mercy" },
  { text: "I am a cheerful giver.", questionNumber: 23, gift: "Giving" },
  { text: "I spend time digging into facts.", questionNumber: 24, gift: "Knowledge" },
  { text: "I feel that I have a message from God to deliver to others.", questionNumber: 25, gift: "Prophecy" },
  { text: "I can recognize when a person is genuine/honest.", questionNumber: 26, gift: "Discernment" },
  { text: "I am a person of vision (a clear mental portrait of a preferable future given by God). I am able to communicate vision in such a way that others commit to making the vision a reality.", questionNumber: 27, gift: "Leadership" },
  { text: "I am willing to yield to God’s will rather than question and waver.", questionNumber: 28, gift: "Faith" },
  { text: "I would like to be more active in getting the gospel to people in other countries.", questionNumber: 29, gift: "Apostleship" },
  { text: "It makes me happy to do things for people in need.", questionNumber: 30, gift: "Service/Helps" },
  { text: "I am successful in getting a group to do its work joyfully.", questionNumber: 31, gift: "Hospitality" },
  { text: "I am able to make strangers feel at ease.", questionNumber: 32, gift: "Evangelism" },
  { text: "I have the ability to teach to a variety of different learning styles.", questionNumber: 33, gift: "Teaching" },
  { text: "I can identify those who need encouragement.", questionNumber: 34, gift: "Exhortation" },
  { text: "I have trained Christians to be more obedient disciples of Christ.", questionNumber: 35, gift: "Shepherding" },
  { text: "I am willing to do whatever it takes to see others come to Christ.", questionNumber: 36, gift: "Evangelism" },
  { text: "I am drawn to people who are hurting.", questionNumber: 37, gift: "Mercy" },
  { text: "I am a generous giver.", questionNumber: 38, gift: "Giving" },
  { text: "I am able to discover new truths in Scripture.", questionNumber: 39, gift: "Knowledge" },
  { text: "I have spiritual insights from Scripture concerning issues and people that compel me to speak out.", questionNumber: 40, gift: "Prophecy" },
  { text: "I can sense when a person is acting in accordance with God’s will.", questionNumber: 41, gift: "Discernment" },
  { text: "I can trust in God even when things look dark.", questionNumber: 42, gift: "Faith" },
  { text: "I can determine where God wants a group to go and help it get there.", questionNumber: 43, gift: "Leadership" },
  { text: "I have a strong desire to take the gospel to places where it has never been heard.", questionNumber: 44, gift: "Apostleship" },
  { text: "I enjoy reaching out to new people in my church and community.", questionNumber: 45, gift: "Evangelism" },
  { text: "I am sensitive to the needs of people.", questionNumber: 46, gift: "Mercy" },
  { text: "I have been able to make effective and efficient plans for accomplishing the goals of a group.", questionNumber: 47, gift: "Administration" },
  { text: "I often am consulted when fellow Christians are struggling to make difficult decisions.", questionNumber: 48, gift: "Wisdom" },
  { text: "I think about how I can comfort and encourage others in my congregation.", questionNumber: 49, gift: "Mercy" },
  { text: "I am able to give spiritual direction to others.", questionNumber: 50, gift: "Shepherding" },
  { text: "I am able to present the gospel to lost persons in such a way that they accept the Lord and His salvation.", questionNumber: 51, gift: "Evangelism" },
  { text: "I possess an unusual capacity to understand the feelings of those in distress.", questionNumber: 52, gift: "Mercy" },
  { text: "I have a strong sense of stewardship based on the recognition that God owns all things.", questionNumber: 53, gift: "Giving" },
  { text: "I have delivered to other persons messages that have come directly from God.", questionNumber: 54, gift: "Prophecy" },
  { text: "I can sense when a person is acting under God’s leadership.", questionNumber: 55, gift: "Discernment" },
  { text: "I try to be in God’s will continually and be available for His use.", questionNumber: 56, gift: "Faith" },
  { text: "I feel that I should take the gospel to people who have different beliefs from me.", questionNumber: 57, gift: "Evangelism" },
  { text: "I have an acute awareness of the physical needs of others.", questionNumber: 58, gift: "Mercy" },
  { text: "I am skilled in setting forth positive and precise steps of action.", questionNumber: 59, gift: "Administration" },
  { text: "I like to meet visitors at church and make them feel welcome.", questionNumber: 60, gift: "Hospitality" },
  { text: "I explain Scripture in such a way that others understand it.", questionNumber: 61, gift: "Teaching" },
  { text: "I can usually see spiritual solutions to problems.", questionNumber: 62, gift: "Wisdom" },
  { text: "I welcome opportunities to help people who need comfort, consolation, encouragement, and counseling.", questionNumber: 63, gift: "Mercy" },
  { text: "I feel at ease in sharing Christ with nonbelievers.", questionNumber: 64, gift: "Evangelism" },
  { text: "I can influence others to perform to their highest God-given potential.", questionNumber: 65, gift: "Leadership" },
  { text: "I recognize the signs of stress and distress in others.", questionNumber: 66, gift: "Mercy" },
  { text: "I desire to give generously and unpretentiously to worthwhile projects and ministries.", questionNumber: 67, gift: "Giving" },
  { text: "I can organize facts into meaningful relationships.", questionNumber: 68, gift: "Knowledge" },
  { text: "God gives me messages to deliver to His people.", questionNumber: 69, gift: "Prophecy" },
  { text: "I am able to sense whether people are being honest when they tell of their religious experiences.", questionNumber: 70, gift: "Discernment" },
  { text: "I enjoy presenting the gospel to persons of other cultures and backgrounds.", questionNumber: 71, gift: "Evangelism" },
  { text: "I enjoy doing little things that help people.", questionNumber: 72, gift: "Service/Helps" },
  { text: "I can give a clear, uncomplicated presentation of the gospel.", questionNumber: 73, gift: "Evangelism" },
  { text: "I have been able to apply biblical truth to the specific needs of my church.", questionNumber: 74, gift: "Teaching" },
  { text: "God has used me to encourage others to live Christlike lives.", questionNumber: 75, gift: "Exhortation" },
  { text: "I have sensed the need to help other people become more effective in their ministries.", questionNumber: 76, gift: "Service/Helps" },
  { text: "I like to talk about Jesus to those who do not know Him.", questionNumber: 77, gift: "Evangelism" },
  { text: "I have the ability to make strangers feel comfortable in my home.", questionNumber: 78, gift: "Hospitality" },
  { text: "I have a wide range of study resources and know how to secure information.", questionNumber: 79, gift: "Knowledge" },
  { text: "I feel assured that a situation will change for the glory of God even when the situation seems impossible.", questionNumber: 80, gift: "Faith" },
];


  // Array of gift names
  const gifts = [
    { name: "Leadership" },
    { name: "Administration" },
    { name: "Teaching" },
    { name: "Knowledge" },
    { name: "Wisdom" },
    { name: "Prophecy" },
    { name: "Discernment" },
    { name: "Exhortation" },
    { name: "Shepherding" },
    { name: "Faith" },
    { name: "Evangelism" },
    { name: "Apostleship" },
    { name: "Service/Helps" },
    { name: "Mercy" },
    { name: "Giving" },
    { name: "Hospitality" },
  ];

  async function seed() {
    const email = "rachel@remix.run";
  
    // cleanup the existing database
    await prisma.user.delete({ where: { email } }).catch(() => {
      // no worries if it doesn't exist yet
    });
  
    const hashedPassword = await bcrypt.hash("racheliscool", 10);
  
    await prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });

      // Seed the Gift table
  for (const gift of gifts) {
    await prisma.gift.create({
      data: gift,
    });
    console.log(`Gift "${gift.name}" seeded.`);
  }

  
    // Create the Question records and link to the corresponding gift
    for (const { text, questionNumber, gift } of questions) {
      const selectedGift = await prisma.gift.findFirst({
        where: { name: gift },
      });
      if (!selectedGift) {
        throw new Error(`Gift with name "${gift}" not found.`);
      }
  
      const createdQuestion = await prisma.question.create({
        data: {
          text,
          questionNumber,
          gift: {
            connect: { id: selectedGift.id }, // Link to the corresponding gift by id
          },
        },
      });
      console.log(`Created question ${createdQuestion.id} with number ${questionNumber}`);
    }
  
    console.log(`Database has been seeded. 🌱`);
  }
  
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });