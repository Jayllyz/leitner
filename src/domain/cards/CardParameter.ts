export class CardContent {
  question: string;
  answer: string;
  tag?: string;

  constructor(question: string, answer: string, tag?: string) {
    this.question = question;
    this.answer = answer;
    this.tag = tag;
  }
}
