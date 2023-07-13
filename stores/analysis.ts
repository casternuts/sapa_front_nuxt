import { defineStore } from 'pinia'
import axios from 'axios'

export interface target {
  title: any
 
}
export interface IAnalysisState {
  gptResult: any
  backEndResult: Object
  searchString: string
  searchFrom: string
  searchTo: string
  startdate: any
  endDate: any
  timeUnit: any
  chartData :any
  load:any,
  itemdata:any,
  reviewSelectData:any,
  reviewInsightData:any
}
export const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}
export const useAnalysis = defineStore('analysis', {
  state: (): IAnalysisState => ({
    gptResult: '',
    backEndResult: '',
    searchString:'',
    startdate:'',
    endDate:'',
    timeUnit:'',
    chartData:null,
    load:false,
    itemdata:'',
    searchFrom:'',
    searchTo:'',
    reviewSelectData:'',
    reviewInsightData:'분석된 내용이 없습니다'
  }),
  actions: {
    async searchGpt() {
      try {
        console.log(this.searchFrom)
        console.log(this.searchTo)
        const data = await axios.get('http://127.0.0.1:8000/api/v1/search/keyword/'+this.searchString+'/'+this.searchFrom+'/'+this.searchTo)
        this.gptResult = data.data.results;
        this.startdate = data.data.startdate;
        
        this.endDate = data.data.endDate;
        this.timeUnit = data.data.timeUnit;
         console.log(data.data);

         console.log( this.gptResult);
        
        //  let labels:any =[];
         let labels: any[] = this.gptResult[0].data.map((value: any) => value.period );
         let datasets :any=[];
        
         for(let i =0; i< this.gptResult.length; i++){
          let targetData :any = {};
          let targets :any = this.gptResult[i];
          let period: any[] = targets.data.map((value: any) => value.period );
          let ratio : any[] = targets.data.map((value: any) => value.ratio );
          labels = period;
          targetData.label = targets.title;
          let color:any = Math.random()*0xffffff;
          targetData.backgroundColor ="#"+(parseInt(color)).toString(16);
          targetData.data = ratio;


          datasets.push(targetData);
          console.log(targetData)
         }
        
         let chartData :any = {};
         chartData.labels = labels;
         chartData.datasets = datasets;
        this.chartData =chartData;
        console.log(this.chartData)

        this.load = true;

        }
        catch (error) { 
          alert(error)
          await console.log(error)
      }
     await console.log(this.searchString);
    },
    //차트 클릭시
    async searchItem(searchKeyword:any,category:any) {
      try {
        console.log(this.gptResult);
        console.log(this.gptResult[searchKeyword].keywords);
        this.gptResult[searchKeyword].keywords.join(',')
         const itemdata = await axios.get('http://127.0.0.1:8000/api/v1/search/itemcsv3/'+this.gptResult[searchKeyword].keywords.join(',')+'/'+category)
         this.itemdata = JSON.parse(itemdata.data);
    
         console.log(this.itemdata);
         

         
       
        
        //  let labels:any =[];
        

        }
        catch (error) { 
          alert(error)
          await console.log(error)
      }
     await console.log(this.searchString);
    },
     //차트 클릭시
     async searchReviewSelectGrid(searchKeyword:any) {
      try {
        console.log(searchKeyword);
        //console.log(this.gptResult[searchKeyword].keywords);
       // this.gptResult[searchKeyword].keywords.join(',')
         const reviewResult = await axios.get('http://127.0.0.1:8000/api/v1/search/reviewFunction/'+ searchKeyword)
         this.reviewSelectData =  JSON.parse(reviewResult.data)
        
         console.log( this.reviewSelectData);

         const reviewInsightResult = await axios.get('http://127.0.0.1:8000/api/v1/search/reviewselect/'+ searchKeyword)
         this.reviewInsightData =  JSON.parse(reviewInsightResult.data)
        

        }
        catch (error) { 
          alert(error)
          await console.log(error)
      }
     //await console.log(this.searchKeyword);
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
    getResults():any{
      return this.gptResult
    },
    getloaded(state):any{
      return state.load
    },
    getchartData(state):any{
      return state.chartData
    },
    getItemData(state):any{
      return state.itemdata
    },
    getReviewSelectData(state):any{
      return state.reviewSelectData
    },getInsight(state):any{
      return state.reviewInsightData
    },
    
  },
})
