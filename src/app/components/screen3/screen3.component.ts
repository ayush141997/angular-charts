import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen3',
  templateUrl: './screen3.component.html',
  styleUrls: ['./screen3.component.scss']
})
export class Screen3Component implements OnInit {

  constructor() {
      this.out['wordCount'] = 0,
      this.out['articleCount'] = 0,
      this.out['vowelCount'] = 0,
      this.out['maxWordLength'] = 0,
      this.out['minWordLength'] = 0
  }

  ngOnInit() {
  }

  out: object = {}

  /* To analyze the data
  @Param text: input text to analyze
  */
  calculate(text) {
    Promise.all([this.countWords(text),this.countArticles(text), this.countVowels(text),
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

  /* To count the words
  @Param text: input text to analyze
  
  @return count: Count of words
  */
  async countWords(text: string): Promise<number> {
    let count = 0
    if (text) {
      count = await text.split(/\/| |,/).filter(word => word!='').length
    }
    return count
  }

  /* To count the articles
  @Param text: input text to analyze
  
  @return count: Count of articles
  */
  async countArticles(text): Promise<number> {
    let count:number = 0
    if(text){
      let temp1: string[] = await text.split(/\/| |,/).filter(word => word!='').filter(e => {
        const articles = ['a', 'an', 'the']
        e.toLowerCase()
        return articles.includes(e)
      })
      count = temp1.length
    }
    return count
  }

  /* To get the words array excluding the articles
  @Param text: input text to analyze
  
  @return count: array of words without articles
  */
  async getWordsWithoutArticles(text): Promise<string[]> {
    return await text.split(/\/| |,/).filter(word => word!='').filter(e => {
      const articles = ['a', 'an', 'the']
      e.toLowerCase()
      return !articles.includes(e)
    })
  }

  /* To count the vowels
  @Param text: input text to analyze
  
  @return count: Count of vowels
  */
  async countVowels(text): Promise<number> {
    let vowelCount: number = 0
    if(text){
      const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
      if(wordsWithoutArticles.length != 0){
        wordsWithoutArticles.forEach(e => {
          vowelCount += e.split("").filter(char => {
            const vowels = ['a', 'e', 'i', 'o', 'u']
            char.toLowerCase()
            return vowels.includes(char)
          }).length
        })
      }
    }
    return vowelCount
  }

  /* To get the max word length
  @Param text: input text to analyze
  
  @return count: max count
  */
  async getMaxLength(text): Promise<number> {
    let maxLength: number = 0
    if(text){
      const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
      if(wordsWithoutArticles.length != 0){
        wordsWithoutArticles.forEach(word => {
          if (word.length > maxLength) {
            maxLength = word.length
          }
        })
      }
    }
    return maxLength
  }

  /* To get the min word length
  @Param text: input text to analyze
  
  @return count: min count
  */
  async getMinLength(text): Promise<number> {
    let minLength: number = 0
    if(text){
      const wordsWithoutArticles = await this.getWordsWithoutArticles(text)
      if(wordsWithoutArticles.length != 0){
        console.log(wordsWithoutArticles)
        minLength = wordsWithoutArticles[0].length
        wordsWithoutArticles.forEach(word => {
          if (word.length < minLength) {
            minLength = word.length
          }
        })
      }
    }
    return minLength
  }
}
