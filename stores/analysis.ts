import { defineStore } from 'pinia'
import axios from 'axios'

export interface target {
  title: any
 
}
export interface IAnalysisState {
  gptResult: any
  // eslint-disable-next-line prettier/prettier
  backEndResult: Object
  searchString: string
  searchFrom: string
  searchTo: string
  startdate: any
  endDate: any
  timeUnit: any
  chartData :any
  load:any
  itemdata:any
  searchKeywordInput:any
  reviewSelectData:any
  reviewInsightData:any
  spinnergrid1:Boolean
  spinnergrid2:Boolean
  spinnergrid3:Boolean
  spinnergrid4:Boolean
  spinnergrid5:Boolean
  popupOpen:Boolean
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
function pad(number:number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}
const today = new Date();

// 한 달 전
const lastMonth   = today.getFullYear() + "-" + pad(today.getMonth())  + "-" + pad((today.getDate()));

// 하루 전
const yesterday = today.getFullYear() + "-" + pad((today.getMonth() +1)) + "-" + pad(today.getDate()-1);

console.log(lastMonth)
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
     searchFrom: lastMonth,
     searchTo:  yesterday,
    // searchFrom: '20230601',
    // searchTo:  '20230630',
    reviewSelectData:'',
    reviewInsightData:'분석된 내용이 없습니다',
    searchKeywordInput:'',
    spinnergrid1:false,
    spinnergrid2:false,
    spinnergrid3:false,
    spinnergrid4:false,
    spinnergrid5:false,
    popupOpen:false
  }),
  actions: {
    async searchGpt() {
      try {
        // 로딩 스피너 애니메이션
        this.spinnergrid1=true;
        // 로딩 스피너 애니메이션
        this.spinnergrid2=true;
        console.log(this.searchFrom)
        console.log(this.searchTo)
        const data = await axios.get('http://127.0.0.1:8000/api/v1/search/keyword/'+this.searchString+'/'+this.searchFrom+'/'+this.searchTo)
        this.gptResult = data.data.results;
        this.startdate = data.data.startdate;
        
        this.endDate = data.data.endDate;
        this.timeUnit = data.data.timeUnit;
         console.log(data.data);

         console.log( this.gptResult);
         // 로딩 스피너 애니메이션
        this.spinnergrid1=false;
         
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
            //로딩 스피너 애니메이션
            this.spinnergrid2=false;

        }
        catch (error) { 
          alert("GPT 서버 혹은 네이버 API와 통신 중 에러가 발생했습니다(호출제한 등) 다시 시도해 주세요")
          await console.log(error)
          this.spinnergrid1=false;
          this.spinnergrid2=false;
      }
     await console.log(this.searchString);
    },
    // 차트 클릭시
    async searchItem(searchKeyword:any,category:any) {
      try {
            // 로딩 스피너 애니메이션
            this.spinnergrid3=true;
        console.log(this.gptResult);
        console.log(this.gptResult[searchKeyword].keywords);
        this.gptResult[searchKeyword].keywords.join(',')
         const itemdata = await axios.get('http://127.0.0.1:8000/api/v1/search/itemcsv3/'+this.gptResult[searchKeyword].keywords.join(',')+'/'+category)
         this.itemdata = JSON.parse(itemdata.data);
    
         console.log(this.itemdata);
         
    // 로딩 스피너 애니메이션
    this.spinnergrid3=false;

        }
        catch (error) { 
          alert(error)
          await console.log(error)
              // 로딩 스피너 애니메이션
    this.spinnergrid3=false;
      }
     await console.log(this.searchString);
    },
     // 그리드 클릭시
     async searchReviewSelectGrid(searchKeyword:any) {
      try {
            // 로딩 스피너 애니메이션
            this.spinnergrid4=true;
             
        console.log(searchKeyword);
     
         const reviewResult = await axios.get('http://127.0.0.1:8000/api/v1/search/reviewFunction/'+ searchKeyword)
         this.reviewSelectData =  JSON.parse(reviewResult.data)
           // 로딩 스피너 애니메이션
           this.spinnergrid4=false;
         console.log( this.reviewSelectData);
        // 로딩 스피너 애니메이션
        this.spinnergrid5=true;
         const reviewInsightResult = await axios.get('http://127.0.0.1:8000/api/v1/search/reviewselect/'+ searchKeyword)
         this.reviewInsightData = reviewInsightResult.data.replace(/\n/g, "<br>"); 
        
     // 로딩 스피너 애니메이션
     this.spinnergrid5=false;
        }
        catch (error) { 
          alert("GPT 서버와 통신 중 에러 혹은 정상적인 리뷰 데이터를 찾을 수 없습니다.")
          await console.log(error)
               // 로딩 스피너 애니메이션
        this.spinnergrid4=false;
               // 로딩 스피너 애니메이션
        this.spinnergrid5=false;
      }
     // await console.log(this.searchKeyword);
    },
    openPopup(open:boolean){
      console.log(open);
      this.popupOpen = open
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
    getSpinner1(state):any{
      return state.spinnergrid1
    },
    getSpinner2(state):any{
      return state.spinnergrid2
    },
    getSpinner3(state):any{
      return state.spinnergrid3
    },
    getSpinner4(state):any{
      return state.spinnergrid4
    },
    getSpinner5(state):any{
      return state.spinnergrid5
    },
    
   
    
  },
})
