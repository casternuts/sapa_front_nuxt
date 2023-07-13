<script lang="ts" setup>
import { useCounter } from '~/stores/counter'
import { useIdentity } from '~/stores/identity'
import { useAnalysis } from '~/stores/analysis'
import { capitalize } from '~/utils/str'
import cButton from '~/components/Button.vue'
import BarChart  from '~/components/charts/BarChart.vue'
import Grid  from '~/components/grid/grid.vue'
import Easygrid  from '~/components/grid/easygrid.vue'
import LineChart  from '~/components/charts/LineChart.vue'
import ReviewEasygrid  from '~/components/grid/reviewGridEasy.vue'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.test.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.test.description'),
    },
  ],
}))

// const counter = useCounter()
// const identity = useIdentity()
const analysis = useAnalysis();

const data = [
        {
            "id": 1,
            "review": "Mis1ti123124124124",
           
        },
       
    ]
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.startanalysis.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageSectionTitle
          :text="$t('pages.startanalysis.section_analysis')"
          class="capitalize"
        />
        <!-- <div class="mb-2">
          <span class="capitalize">{{ $t('pages.startanalysis.full_name') }} : </span>
          <span>{{ identity.fullName }}</span>
        </div> -->
        <div class="mb-4">
        <form style="margin-bottom:20px;">   
          <div class="container">
           
              <div class="from-date to-date" >
                
                <label for="from-date" class="mb-2 text-sm font-medium text-gray-900" style="font-size:1.2rem; margin-right: 10px;">기간 설정</label>
                <input type="date" class="input bg-gray-100" v-model="analysis.searchFrom" placeholder="From date" style=" border: 1px solid; margin:5px; border-radius: 5%;">
                <label for="to-date">~</label>
                <input type="date" class="input bg-gray-100"  v-model="analysis.searchTo" placeholder="To date" style=" border: 1px solid; margin:5px; border-radius: 5%;">
              </div>
</div>
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
         
            
            <input type="search" id="default-search" v-model="analysis.searchString" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="지금 떠오르는 키워드 입력!" required>
            <cButton   @click="analysis.searchGpt" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</cButton>
        </div>
      </form>
      <div class="grid grid-cols-3 gap-4 overflow-auto h-full">
        <div class="bg-white text-white p-4 h-30vh overflow-auto border-solid border border-slate-300" >
          <div class="cardheader">
              <div>
                <h4 class="text-xl font-semibold leading-6 text-gray-800" style="float:left">GPT 키워드</h4>
                <button class="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center ml-auto" style="float:right">추가</button>
              </div>
              <!-- 카드헤더 하단에 얇은 하얀색 실선 추가 -->
            <hr class="bg-white w-full"/>
          </div>
          <template v-for="(item,idx) in analysis.gptResult">
              <div class="flex flex-wrap" style="margin-top:15px;">
                <div class="bg-green-500 text-white px-2 py-1 rounded-md flex items-center">
                  <h2 class="text-sm font-semibold leading-5 text-white px-2 py-1">{{item.title}}</h2>
                   <template v-for="(tag,idx) in item.keywords"> 
                  <button class="bg-blue-500 text-white px-2 py-1 rounded-md" style="margin-left:5px;">{{ tag }}</button>                
                 </template>
                </div>
                </div>
              </template>
        </div>
        <div class="bg-white text-white p-4 h-30vh overflow-auto border-solid border border-slate-300" >
          <div class="cardheader">
                <div>
                    <h4 class="text-xl font-semibold leading-6 text-gray-800" style="float:left">네이버 트랜드</h4>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center ml-auto" style="float:right">추가</button>
                  </div>
                <!-- 카드헤더 하단에 얇은 하얀색 실선 추가 -->
                <hr class="bg-white w-full"/>
            </div>
             
                  <LineChart></LineChart>
               
        </div>
        <div class="bg-white text-white p-4 h-30vh overflow-auto border-solid border border-slate-300" >
          <div class="cardheader">
                <div>
                    <h4 class="text-xl font-semibold leading-6 text-gray-800" style="float:left">관련 상품리스트</h4>
                    <div></div>
                    <div class="flex items-center">
                      <input type="text" v-model="analysis.searchKeywordInput" placeholder="상품명" class="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500" style="
    width: 70%;
    margin-left: 20px;
    margin-bottom: 5px;
    border: 1px solid dimgray;
    border-radius: 5px;
    color:black;
">
    <button type="button" class="ml-1 px-2 py-1 bg-blue-500 text-white" @click="analysis.searchReviewSelectGrid(analysis.searchKeywordInput)" style="
        margin-bottom: 5px;
        border-radius: 5px;
    ">검색</button>
</div>
                   
 
                  </div>
                <!-- 카드헤더 하단에 얇은 하얀색 실선 추가 -->
                <hr class="bg-white w-full"/>
            </div>
            <Easygrid ></Easygrid>
            <!-- <Grid :rows="analysis.getItemData"></Grid> -->
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 overflow-auto h-full" style="margin-top:15px;">
        <div class="bg-white text-white p-4 h-30vh overflow-auto border-solid border border-slate-300" >
          <div class="cardheader">
                <div>
                    <h4 class="text-xl font-semibold leading-6 text-gray-800" style="float:left">관련 후기 요약</h4>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center ml-auto" style="float:right">엑셀</button>
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center ml-auto" style="float:right">자세히</button>
                  </div>
                <!-- 카드헤더 하단에 얇은 하얀색 실선 추가 -->
                <hr class="bg-white w-full"/>
            </div>
            <ReviewEasygrid ></ReviewEasygrid>

            <!-- <Grid :rows="data"></Grid> -->
           
            
        </div>
        <div class="bg-white text-white p-4 h-30vh overflow-auto border-solid border border-slate-300" >
          <div class="cardheader">
                <div>
                    <h4 class="text-xl font-semibold leading-6 text-gray-800" style="float:left">마케팅 인사이트</h4>
                   
                  </div>
                <!-- 카드헤더 하단에 얇은 하얀색 실선 추가 -->
                <hr class="bg-white w-full"/>
            </div>
             <p style="color:black" v-html="analysis.getInsight"></p> 
        </div>
    
      </div>
          <!-- <div
            class="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2"
          >
            <FormTextInput
              v-model="identity.firstName"
              size="md"
              class="w-full md:w-1/3"
            />
            
            <Button
              class="capitalize w-full md:w-auto"
              :text="$t('pages.startanalysis.reset')"
              type="secondary"
              size="md"
              @click.prevent="identity.reset"
            /> 
          </div>-->
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
