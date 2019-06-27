import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.scss']
})
export class Screen3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  out: object = {}
  calculate(text) {

    Promise.all([this.countWords(text), this.countArticles(text), this.countVowels(text),
       this.getMaxLength(text), this.getMinLength(text)])
      .then(d => {
          this.out['wordCount'] = d[0],
          this.out['articleCount'] = d[1],
          this.out['vowelCount'] = d[2],
          this.out['maxWordLength'] = d[3],
          this.out['minWordLength'] = d[4]
      })
      .catch(e => {
        console.log(e)
      })
  }

  async countWords(text: string): Promise<number> {
    let count = 0
    if (text !== "") {
      count = await text.split(/\/| |,/).length
    }
    return count
  }

  async countArticles(text): Promise<number> {
    let temp1: string[] = await text.split(/\/| |,/).filter(e => {
      const articles = ['a', 'an', 'the']
      e.toLowerCase()
      return articles.includes(e)
    })
    return temp1.length
  }

  async getWordsWithoutArticles(text): Promise<string[]> {
    return await text.split(/\/| |,/).filter(e => {
      const articles = ['a', 'an', 'the']
      e.toLowerCase()
      return !articles.includes(e)
    })
  }

  async countVowels(text): Promise<number> {
    let vowelCount: number = 0
    const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
    wordsWithoutArticles.forEach(e => {
      vowelCount += e.split("").filter(char => {
        const vowels = ['a', 'e', 'i', 'o', 'u']
        char.toLowerCase()
        return vowels.includes(char)
      }).length
    })
    return vowelCount
  }

  async getMaxLength(text): Promise<number> {
    let maxLength: number = 0
    const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
    wordsWithoutArticles.forEach(word => {
      if (word.length > maxLength) {
        maxLength = word.length
      }
    })
    return maxLength
  }

  async getMinLength(text): Promise<number> {
    const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
    let minLength: number = wordsWithoutArticles[0].length
    wordsWithoutArticles.forEach(word => {
      if (word.length < minLength) {
        minLength = word.length
      }
    })
    return minLength
  }
}
