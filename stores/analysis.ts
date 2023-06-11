import { defineStore } from 'pinia'
import axios from 'axios'
export interface IAnalysisState {
  gptResult: string
  backEndResult: string
  searchString: string
}

export const useAnalysis = defineStore('analysis', {
  state: (): IAnalysisState => ({
    gptResult: '',
    backEndResult: '',
    searchString:''
  }),
  actions: {
    async searchGpt() {
      try {
        const data = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.gptResult = data.data
         console.log(data.data);
        }
        catch (error) { 
          alert(error)
          await console.log(error)
      }
     await console.log(this.searchString);
    },
    setGptResult(searchString: string) {
      this.gptResult = searchString;
    },
    setBackEndResult(backEndResult: string) {
      this.backEndResult = backEndResult
    },
    reset() {
      this.gptResult = ''
      this.backEndResult = ''
    },
  },
  getters: {
    fullResult(): string {
      return `${this.gptResult} ${this.backEndResult}`
    },
  },
})
