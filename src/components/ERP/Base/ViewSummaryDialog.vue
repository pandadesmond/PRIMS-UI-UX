<template>
     <q-card v-if="page_function == 'EditPurchaseOrder'" style="text-align:left;margin-top: 5%;">
      <q-card-section class="row header_top_mobile justify-between dialog_totalAmount" style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">
        <div class="text-left">
             <span class="dialog_totalAmount_title_font">Total Amount</span>
            <!-- <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" /> -->
          </div>
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>
        <!-- <Button_icon :disable="showAddLoading" :text="header=='PO' ? 'New PO' : header=='GR' ? 'New GR' : header == 'IBT' ? 'New IBT' : 'New DN'" :big_round="true" :flat="true" :font_color="'#1976D2'" :color="'#f1f8ff'" :icon="'add_circle'" :outline="false" size="15px" class="custom_more_button" @click="handleCreate()" /> -->
      </q-card-section>

      <q-card-section class="q-pt-none" style="padding: 8px 24px 32px 24px; ">
        <div class="card_ypadding">
          


          <div class="row dialog_totalAmount_container " style="font-size: 14px; ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">{{ $language('D0067') }}</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.SubTotal1}}</div>
                </div>
            </div>
            <!-- <q-seprator class="separator-style"></q-seprator> -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">{{ $language('D0068') }}</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.rebate_amt}}</div>
                </div>
            </div>
            <!-- <q-seprator class="separator-style"></q-seprator> -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">{{ $language('D0069') }}</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.rebate_amt}}</div>
                </div>
            </div>
            <!-- <q-seprator class="separator-style"></q-seprator> -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">{{ $language('D0070') }}</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.gst_tax_sum}}</div>
                </div>
            </div>
            <!-- <q-seprator class="separator-style"></q-seprator> -->
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">{{ $language('D0071') }}</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_total_font"><span class="dialog_totalAmount_total_inc_bg">{{currency_sign}} {{json.total_include_tax}}</span></div>
                </div>
            </div>

          </div>
<!-- style="background-color: #f0f0f0; border-radius: 10px; padding: 5px;" -->

        </div>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

    <q-card v-if="page_function=='EditGoodsReceivedNote'" style="text-align:left;margin-top: 5%;">
      <q-card-section class="row header_top_mobile justify-between dialog_totalAmount" style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">
        <div class="text-left">
             <span class="dialog_totalAmount_title_font">Total Amount</span>
            <!-- <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" /> -->
          </div>
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>
        <!-- <Button_icon :disable="showAddLoading" :text="header=='PO' ? 'New PO' : header=='GR' ? 'New GR' : header == 'IBT' ? 'New IBT' : 'New DN'" :big_round="true" :flat="true" :font_color="'#1976D2'" :color="'#f1f8ff'" :icon="'add_circle'" :outline="false" size="15px" class="custom_more_button" @click="handleCreate()" /> -->
      </q-card-section>

      <q-card-section class="" style="padding: 8px 24px 32px 24px; ">
        <div class="card_ypadding">
          <!-- <div class="row justify-center">
             <span style="font-size: 14px;"><b>Total Amount</b></span>
            <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" />
          </div> -->

          <div class="row dialog_totalAmount_container" style="font-size: 14px; ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">Gross</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.Subtotal1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">Disc</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.Discount1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">Nett</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_total_font"><span class="dialog_totalAmount_total_inc_bg">{{currency_sign}} {{json.Total}}</span></div>
                </div>
            </div>


          </div>


        </div>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>

   <!-- <q-dialog  v-model="viewSummary" persistent :position="$q.screen.width > 599 ? 'top' : 'bottom'"> -->
    <q-card v-if="page_function=='EditDebitNote' || page_function=='EditCreditNote'" style="text-align:left;margin-top: 5%;">
      <q-card-section class="row header_top_mobile justify-between dialog_totalAmount" style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);">
        <div class="text-left">
             <span class="dialog_totalAmount_title_font">Total Amount</span>
            <!-- <Button_icon :readonly="true" :big_round="true" :flat="true" :font_color="'white'" :color="'green'" :icon="'verified'" :outline="true" size="30px" /> -->
          </div>
        <!-- <Button_icon :disable="showAddLoading" :big_round="true" :flat="true" :font_color="'#928f8f'" :color="'rgba(255, 255, 255, 0.5)'" :icon="'arrow_back_ios'" :outline="true" size="12px" class="custom_back_button" @click="back()" /> -->
      <div class="text-right">
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading || showAddLoading2"/>
      </div>
        <!-- <Button_icon :disable="showAddLoading" :text="header=='PO' ? 'New PO' : header=='GR' ? 'New GR' : header == 'IBT' ? 'New IBT' : 'New DN'" :big_round="true" :flat="true" :font_color="'#1976D2'" :color="'#f1f8ff'" :icon="'add_circle'" :outline="false" size="15px" class="custom_more_button" @click="handleCreate()" /> -->
      </q-card-section>
      <q-card-section class="" style="padding: 8px 24px 32px 24px; ">
        <div class="card_ypadding"> 
          <div class="row dialog_totalAmount_container" style="font-size: 14px; ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">GROSS</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.SubTotal1}}</div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-py-xs">
                <div class="row">
                  <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 dialog_totalAmount_item_font">Tax</div>
                  <!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"><b>:</b></div> -->
                  <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right dialog_totalAmount_value_font">{{currency_sign}} {{json.gst_tax_sum}}</div>
                </div>
            </div>

          </div>


        </div>
      </q-card-section>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />
    </q-card>
    
</template>

<script>
export default {
  name: 'ViewSummaryDialog',
  props: {
    page_function: String,
    // showAddLoading: Boolean,
    // showAddLoading2: Boolean,
    // currencySign: String,
    json: Object,
    // other props as needed
  },

}
</script>

<style scoped>
.dialog_totalAmount_container {
  /* padding: 8px 24px 32px 24px; */
  gap: 10px;
}
.dialog_totalAmount {
  padding: 16px 24px;
}
.dialog_totalAmount_title_font {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-family: InterfontSemiBold;
}
.dialog_totalAmount_item_font {
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  font-family: InterfontMedium;
  color: #72777A;
}
.dialog_totalAmount_value_font {
  color: #1E90FF;
  font-family: InterfontSemiBold;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  padding: 0px 16px;
}
.dialog_totalAmount_total_font {
  color: #FFFFFF;
  font-family: InterfontSemiBold;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  padding: 0px 16px;
}
.dialog_totalAmount_total_inc_bg {
  border-radius: 8px;
  background: #1E90FF;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
}
</style>
