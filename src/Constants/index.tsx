import { ProductOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const QUESTION_QUIZ = [
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?",
    correct_answer: "A Study in Scarlet",
    incorrect_answers: [
      "The Sign of the Four",
      "A Case of Identity",
      "The Doings of Raffles Haw",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "Who was the author of the 1954 novel, &quot;Lord of the Flies&quot;?",
    correct_answer: "William Golding",
    incorrect_answers: ["Stephen King", "F. Scott Fitzgerald", "Hunter Fox"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "In the novel 1984, written by George Orwell, what is the name of the totalitarian regime that controls Oceania?",
    correct_answer: "INGSOC",
    incorrect_answers: [
      "Neo-Bolshevism",
      "Obliteration of the Self",
      "Earth Alliance",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question: "Which is NOT a book in the Harry Potter Series?",
    correct_answer: "The House Elf",
    incorrect_answers: [
      "The Chamber of Secrets",
      "The Prisoner of Azkaban",
      "The Deathly Hallows",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question: "Who wrote &quot;A Tale of Two Cities&quot;?",
    correct_answer: "Charles Dickens",
    incorrect_answers: ["Charles Darwin", "Mark Twain", "Roald Dahl"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "What was the first ever entry written for the SCP Foundation collaborative writing project?",
    correct_answer: "SCP-173",
    incorrect_answers: ["SCP-001", "SCP-999", "SCP-1459"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "What is the name of the three headed dog in Harry Potter and the Sorcerer&#039;s Stone?",
    correct_answer: "Fluffy",
    incorrect_answers: ["Spike", "Poofy", "Spot"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question: "Which of the following is the world&#039;s best-selling book?",
    correct_answer: "The Lord of the Rings",
    incorrect_answers: [
      "The Little Prince",
      "Harry Potter and the Philosopher&#039;s Stone",
      "The Da Vinci Code",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question:
      "What was Sir Handel&#039;s original name in &quot;The Railway Series&quot; and it&#039;s animated counterpart &quot;Thomas and Friends?&quot;",
    correct_answer: "Falcon",
    incorrect_answers: ["Eagle", "Kyte", "Swallow"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Books",
    question: "Who wrote &quot;Harry Potter&quot;?",
    correct_answer: "J.K. Rowling",
    incorrect_answers: [
      "J.R.R. Tolkien",
      "Terry Pratchett",
      "Daniel Radcliffe",
    ],
  },
];

export const TOTAL_TIMER = 15;

export const NAV_ITEMS = [
  {
    key: "/products",
    icon: <ProductOutlined />,
    label: <Link to="/products">Products</Link>,
  },
  {
    key: "/talents",
    icon: <UserOutlined />,
    label: <Link to="/talents">Talents</Link>,
  },
];

export const SELECT_POSISI = [
  { value: "Frontend Developer", label: "Frontend" },
  { value: "Backend Developer", label: "Backend" },
  { value: "Mobile Developer", label: "Mobile" },
  { value: "Quality Assurance", label: "Quality Assurance" },
];

export const SELECT_DIVISI = [
  { value: "IT Development", label: "IT Development" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "IT Network", label: "IT Network" },
];
