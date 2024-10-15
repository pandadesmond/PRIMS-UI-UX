<template>

    <!-- <q-card @click="ScoreCardClick" class="my_card" v-bind:style="[json_container.value3_growth == 'negative' ? 'border-left: 3px solid red;' : (json_container.value3_growth == 'normal' ? 'border-left: 3px solid #fafbfc;' : 'border-left: 3px solid green;'), json_container.value4_growth == 'negative' ? 'border-right: 3px solid red;' : (json_container.value4_growth == 'normal' ? 'border-right: 3px solid #fafbfc;' : 'border-right: 3px solid green;')]"> -->
    <q-card @click="ScoreCardClick" class="my_card" >

      <q-card-section horizontal>
        
        <q-card-section style="width: 100%;padding-right: 3px;padding-left: 10px;">
            <div class="text-h6 text-weight-medium text-overline" :style="json_container.title_style">{{json_container.title}}</div>
            <!-- <div class="text-h6 text-weight-medium text-overline" v-if="json_container.title2">{{json_container.title2}}</div> -->
            <!-- <div class="text-h6 text-weight-bold custom_font">{{json_container.prefix}}{{json_container.value1}}{{json_container.suffix}}</div> -->
            <div class="text-h6 text-weight-bold custom_font" :style="json_container.value1_style">{{json_container.value1}}</div>
            <br>
            <div class="text-h5 text-overline" style="overflow: hidden;white-space: nowrap;">
                <!-- Changes -->
                <label v-bind:style="[json_container.value3_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value3_growth == 'normal' ? 'font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value3_style]" >
                    {{json_container.value3}}
                </label>
                
                <!-- <q-icon v-if="json_container.growth == 'positive'" style="font-size:30px;color:green;margin-top:-10px;" name="arrow_upward" />
                <q-icon v-else-if="json_container.growth == 'negative'" style="font-size:30px;color:red;" name="arrow_downward" /> -->
                
            </div>

            <!-- <div class="text-overline" style="font-size: 14px;">Changes</div>
            <div class="text-overline">
                
                <label style="color:green;font-size: 30px;">3.32%<q-icon style="color:green;font-size: 35px;" name="north_east" /></label> 

            </div> -->
        </q-card-section>

        <q-separator vertical />

        <q-card-section style="width: 100%;padding-right: 3px;padding-left: 10px;">
          <!-- <div class="text-h6 text-weight-medium text-overline">Previous Year</div> -->
          <div class="text-h6 text-weight-medium text-overline" :style="json_container.title2_style">{{json_container.title2}}</div>
            <!-- <div class="text-h6 text-weight-bold custom_font">
                {{json_container.prefix}}{{json_container.value2}}{{json_container.suffix}}
            </div> -->
            <div class="text-h6 text-weight-bold custom_font" :style="json_container.value2_style">
                {{json_container.value2}}
            </div>
            <br>
<!-- 
            <div class="text-h5 text-overline text-right">
                <q-icon style="font-size:30px;color:grey;" name="undo" />
                {{json_container.previousyear}}
            </div> -->
          
            <div class="text-h5 text-overline" style="overflow: hidden;white-space: nowrap;">
                <q-tooltip anchor="top middle" v-if="json_container.value4_tooltip" :style="`font-size:`+tooltip_font_size">
                  {{json_container.value4_tooltip}}
                </q-tooltip>

                <label v-bind:style="[json_container.value4_growth == 'negative' ? 'color:red;font-size: 15px;' : json_container.value4_growth == 'normal' ? 'font-size: 15px;' : 'color:green;font-size: 15px;', json_container.value4_style]" >
                    {{json_container.value4}}
                </label> 

                <q-icon v-if="json_container.value4_growth == 'positive'" :style="['font-size:30px;color:green;', json_container.value4_style]" name="arrow_upward" />
                <q-icon v-else-if="json_container.value4_growth == 'negative'" :style="['font-size:30px;color:red;', json_container.value4_style]" name="arrow_downward" />
            </div>
            
        </q-card-section>
     
        <!-- <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div> -->
      </q-card-section>

      <!-- <q-card-actions>

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions> -->

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
      <Loading :loading="loading" />
    </q-card>

    <!-- <q-card class="my_card">

      <q-card-section horizontal>
        
        <q-card-section>

            <div class="text-overline" style="font-size: 14px;">Changes</div>
            <div class="text-overline">
                
                <label style="color:green;font-size: 30px;">3.32%<q-icon style="color:green;font-size: 35px;" name="north_east" /></label> 

            </div>

            <div class="text-h6 text-weight-medium text-overline">Net Profit In 2021</div>
            <div class="text-h5 text-weight-bold">RM 40000</div>
            
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
            

          <div class="text-h6 text-weight-medium text-overline">Previous Year</div>
            <div class="text-h5 text-weight-bold">RM 39000</div>
            <br>

            <div class="text-h5 text-overline text-right">
                <q-icon style="font-size:30px;color:grey;" name="undo" />
                2020
            </div>

        </q-card-section>
     
      </q-card-section>

    </q-card> -->

</template>

<script>
import { ref } from 'vue'
import Loading from 'src/components/Base/Loading';

export default {
    data(){
        return{
            json_container: this.json,
            loading: true,
            tooltip_font_size: "13px;",
        }
    },
    components: {
      Loading
    },
    methods: {
      ScoreCardClick: function()
      {
        this.$emit("receiveClick");
      }
    },
    name: "ScoreCard",
    props: ["json", "forceLoading"],
    watch: {
        json(newVal)
        {
            this.json_container = newVal;
            this.loading = false;
        },
        forceLoading(newVal)
        {
          if(newVal)
          {
            this.loading = true;
          }
          
        }
    }
}
</script>

<style lang="sass" scoped>
.my_card
  width: 100%
  background-color: #fafbfc
  word-break: break-all
  height: 100%
  cursor: pointer
</style>