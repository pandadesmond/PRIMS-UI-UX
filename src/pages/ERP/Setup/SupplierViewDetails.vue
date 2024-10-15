<template>
<!-- {{payload_new_2}} -->
<q-form ref="submit_form">
    
<!--breadcrumbs label-->
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Supplier" icon="business"/>

            </div>
        </div>

<!--First column, row--> 
                    <div class="row row_section">   
                        <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 

<!--contact label-->
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
<subtitle-1 style="margin-top: 0px;"><Label text="Contact"  style="background-color: transparent; margin-left: 7px;"/></subtitle-1>
</div>
</div>

<!--Name-->
<!--the row is for open first column(located inside)-->
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <LabelInputVertical 
                         :readonly="false" 
                        :no_label="true" 
                        :text="'Name'" 
                        v-model:pass_value="payload_new_2.name" 
                        :dbComponentBehavior="dbComponentBehavior.name"/> 
                </div>
            </div>

<!--Address 1-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <LabelInputVertical 
                :readonly="false" 
                :no_label="true" 
                :text="'Address'" 
                v-model:pass_value="payload_new_2.add1" 
                :dbComponentBehavior="dbComponentBehavior.address1"/> 
        </div>
    </div>

<!--Address 2-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                :readonly="false" 
                :no_label="true"
                :text="'Address1'"  
                 v-model="payload_new_2.add2" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>

<!--Address 3-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                :readonly="false" 
                :no_label="true" 
                :text="'Address2'" 
                v-model="payload_new_2.add3" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>

<!--Address 4-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                :readonly="false" 
                :no_label="true"
                :text="'Address3'" 
                v-model="payload_new_2.add4" 
                :dbComponentBehavior="dbComponentBehavior.address1"/>
        </div>
    </div>

<!--Tel-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Tel'"
                      v-model:pass_value="payload_new_2.tel"
                      :dbComponentBehavior="dbComponentBehavior.tel" /> 
                </div>
            </div>

<!--Mobile-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Mobile'"
                      v-model:pass_value="payload_new_2.mobile"
                      :dbComponentBehavior="dbComponentBehavior.mobile" /> 
                </div>
            </div>

<!--Fax-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Fax'"
                      v-model:pass_value="payload_new_2.fax"
                      :dbComponentBehavior="dbComponentBehavior.fax" />
                </div>
            </div>

<!--Contact1-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Contact1'"
                      v-model:pass_value="payload_new_2.contact"
                      :dbComponentBehavior="dbComponentBehavior.contact1" /> 
                </div>
            </div>

<!--Conatct2-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Contact2'"
                      v-model:pass_value="payload_new_2.contact2"
                      :dbComponentBehavior="dbComponentBehavior.contact2" />
                </div>
            </div>

<!--Email-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Email'"
                      v-model:pass_value="payload_new_2.email"
                      :dbComponentBehavior="dbComponentBehavior.email" /> 
                </div>
            </div>

<!--City-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'City'"
                      v-model:pass_value="payload_new_2.city"
                      :dbComponentBehavior="dbComponentBehavior.city" />
                </div>
            </div>

<!--State-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'State'"
                      v-model:pass_value="payload_new_2.state"
                      :dbComponentBehavior="dbComponentBehavior.state" />
                </div>
            </div>

<!--Country-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Country'"
                      v-model:pass_value="payload_new_2.country"
                      :dbComponentBehavior="dbComponentBehavior.country" />
                </div>
            </div>

<!--Postcode-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Postcode'"
                      v-model:pass_value="payload_new_2.postcode"
                      :dbComponentBehavior="dbComponentBehavior.postcode" />
                </div>
            </div>

<!--Region-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Region'"
                      v-model:pass_value="payload_new_2.region"
                      :dbComponentBehavior="dbComponentBehavior.region" />
                </div>
            </div>

<!--dattn-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'dattn'"
                      v-model:pass_value="payload_new_2.dattn"
                      :dbComponentBehavior="dbComponentBehavior.dattn" />
                </div>
            </div>

<!--Member Number-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Member No.'"
                      v-model:pass_value="payload_new_2.memberno"
                      :dbComponentBehavior="dbComponentBehavior.memberno" />
                </div>
            </div>

<!--Member Account Number-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Member Account Number'"
                      v-model:pass_value="payload_new_2.member_accno"
                      :dbComponentBehavior="dbComponentBehavior.member_accno" />
                </div>
            </div>




<!--close the row first column(located inside)-->
</div>
<!--close first columm--> 
</div>

<!--Second column--> 
<div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" >
<!--the row is for open second column(located inside)-->

 <div class="row row_section">

<!--Payment label-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
<subtitle-1 style="margin-top: 0px;"><Label text="Payment"  style="background-color: transparent"/></subtitle-1>
</div>
</div>

<!--Code-->

        
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Code'"
                      v-model:pass_value="payload_new_2.code"
                      :dbComponentBehavior="dbComponentBehavior.code" />
                </div>
            </div>

<!--Link Code-->
            <div class="card_section col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Link Code'"
                      v-model:pass_value="payload_new_2.code"
                      :dbComponentBehavior="dbComponentBehavior.code" />
                </div>       
            </div>  
                    <div class="card_section col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                        <div class="component_div">       
                            <Button
                            class="button_save"
                            :type="'button'"
                            padding="xs"
                            color="primary"
                            icon="search"
                            style="margin-top: 33px;"
                            :top_button="true" 
                            @click="searchButton"
                            />                         
                           <!--v-on:receiveChange="callUpdate()"-->

<!--Search dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showSearchTask">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label text="Account Code Pick" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <div class="card_section col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                <div class="component_div">       
            <q-btn
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
                </div>
            </div>
        </q-card-section>

<!--Search label-->       
<q-card-section>
        <!--<div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputHorizontal 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Search'" 
                        v-model:pass_value="json.text" 
                        :dbComponentBehavior="dbComponentBehavior.text"/>
                </div>
            </div>
        </div>--> 

<!--Table server(change)--> 
             <TablePagination 
                :row_per_page="[20,40,60,80,100,0]" 
                v-on:main_list="handleList" 
                v-on:main_delete="handleDelete" 
                v-on:receiveRequestTable="handleTableChange" 
                :title="table_title_2" 
                :table_data="test_data" 
                :table_column="test_column_2"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
            />
<!-- v-on:main_action="handleAction"-->
<!-- v-on:main_edit="handleEdit"  -->


  </q-card-section> 

<!--Dialog button (bottom-right)-->   
        <q-card-actions align="right">
   <div class="row row_section" >
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="component_div"> 
                        <Button
                           class="button_save"
                           v-close-popup
                           :text="'PICK'"
                           :type="'button'" />
                    </div>
                </div>
            </div>
  
          <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
       <Button
          class="button_save"
          v-close-popup
          :text="'CLOSE'"
          :type="'button'" />
      </div>
      </div>
 
        </q-card-actions>
   </q-card>
</q-dialog>

<!--Search dialog close div(row,col,comp_div)-->   
</div>       
</div>  
</div> 

<!--q-btn-->
</div>       
</div> 

<!--Comapny Reg.No-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Company Reg.No'"
                      v-model:pass_value="payload_new_2.reg_no"
                      :dbComponentBehavior="dbComponentBehavior.regno" />
                </div>            
            </div>

<!--GST No-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'GST No'"
                      v-model:pass_value="payload_new_2.gst_no"
                      :dbComponentBehavior="dbComponentBehavior.gstno" /> 
                </div>            
            </div>

<!--GST Tax Code-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelSelectVertical 
                         style="margin-left: 0px; max-height: 1px; display:inline;" 
                         :readonly="false" 
                         :no_label="true" 
                         :text="'GST Tax Code'" 
                         v-model:pass_value="payload_new_2.tax_code" 
                         :dbComponentBehavior="dbComponentBehavior.select"
/>               
     </div>            
            </div>

<!--GST effective date-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelDatepickerVertical 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'GST Effective Date'" 
                        v-model:pass_value="payload_new_2.gst_start_date" 
                        :dbComponentBehavior="dbComponentBehavior.GST_effective_date"/>
                </div>
            </div>

<!--SST No-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'SST No'"
                      v-model:pass_value="payload_new_2.sstdefaulttaxintno"
                      :dbComponentBehavior="dbComponentBehavior.sstdefaulttaxintno" /> 
                </div>
            </div>   

<!--SST Reg No.-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'SST Reg No.'"
                      v-model:pass_value="payload_new_2.sstregno"
                      :dbComponentBehavior="dbComponentBehavior.sstregno" />
                </div>
            </div>  

<!--SST Default Code-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                     <LabelSelectVertical 
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'SST Default Code'" 
                        v-model:pass_value="payload_new_2.sstdefaultcode" 
                        :dbComponentBehavior="dbComponentBehavior.select"

/>               
     </div>            
            </div>

<!--SST effective date-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelDatepickerVertical 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'SST Effective Date'" 
                        v-model:pass_value="payload_new_2.ssteffectivedate" 
                        :dbComponentBehavior="dbComponentBehavior.SST_effective_date"/>
                </div>
            </div>

<!--Currency-->
<div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
<div class="component_div"> 
        <LabelSelectVertical 
            style="margin-left: 0px; max-height: 1px; display:inline;" 
            :readonly="false" 
            :no_label="true" 
            :text="'Currency'" 
            v-model:pass_value="payload_new_2.currency_code" 
            :dbComponentBehavior="dbComponentBehavior.select"

/>               
     </div>            
            </div>

<!--Multi tax rate-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelCheckboxVertical 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Multi tax rate'" 
                        v-model:pass_value="payload_new_2.multi_tax_rate" 
                        :dbComponentBehavior="dbComponentBehavior.multi_tax_rate"
                        :true-value = "1"
                        :false-value = "0" />
                </div>
            </div>

<!--Reg no-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Reg No.'"
                      v-model:pass_value="payload_new_2.reg_no"
                      :dbComponentBehavior="dbComponentBehavior.reg_no" />
                </div>
            </div> 

<!--bank Acc #-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Bank Acc #'"
                      v-model:pass_value="payload_new_2.bankacc"
                      :dbComponentBehavior="dbComponentBehavior.bank_acc" />
                </div>
            </div>

<!--Account Number-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Account Number'"
                      v-model:pass_value="payload_new_2.acc_no"
                      :dbComponentBehavior="dbComponentBehavior.acc_no" />
                </div>
            </div> 

<!--Payment Terms-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelSelectVertical 
                         style="margin-left: 0px; max-height: 1px; display:inline;" 
                         :readonly="false" 
                         :no_label="true" 
                         :text="'Payment Terms'" 
                         v-model:pass_value="payload_new_2.term" 
                         :dbComponentBehavior="dbComponentBehavior.select"

/>               
     </div>            
            </div>

<!--Accept Debit-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Accept Debit'"
                      v-model:pass_value="payload_new_2.accpdebit"
                      :dbComponentBehavior="dbComponentBehavior.accpdebit" /> 
                </div>
            </div> 

<!--Accept Credit-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Accept Credit'"
                      v-model:pass_value="payload_new_2.accpcredit"
                      :dbComponentBehavior="dbComponentBehavior.accpcredit" />
                </div>
            </div> 

<!--Rule Code-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Rule Code'"
                      v-model:pass_value="payload_new_2.rules_code"
                      :dbComponentBehavior="dbComponentBehavior.rules_code" />
                </div>
            </div> 

<!--Pcode-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'P.Code'"
                      v-model:pass_value="payload_new_2.pcode"
                      :dbComponentBehavior="dbComponentBehavior.pcode" />
                </div>
            </div>

<!--Sales Agent-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Sales Agent'"
                      v-model:pass_value="payload_new_2.sales_agent"
                      :dbComponentBehavior="dbComponentBehavior.sales_agent" /> 
                </div>
            </div>

<!--Popprice Method-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Popprice Methods'"
                      v-model:pass_value="payload_new_2.poprice_method"
                      :dbComponentBehavior="dbComponentBehavior.popprice_method" />
                </div>
            </div> 

<!--Stock Return Cost Type-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Stock Return Cost Type'"
                      v-model:pass_value="payload_new_2.stock_return_cost_type"
                      :dbComponentBehavior="dbComponentBehavior.stock_return_cost_type" />
                </div>
            </div>
            
<!--Cal.Due date by-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelSelectVertical 
                         style="margin-left: 0px; max-height: 1px; display:inline;" 
                         :readonly="false" 
                         :no_label="true" 
                         :text="'Cal.Due Date by'" 
                         v-model:pass_value="payload_new_2.calduedateby" 
                         :dbComponentBehavior="dbComponentBehavior.select"

/>               
     </div>            
            </div>

<!--supcusgroup-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Supcus_group'"
                      v-model:pass_value="payload_new_2.supcusgroup"
                      :dbComponentBehavior="dbComponentBehavior.supcusgroup" />
                </div>
            </div>

<!--supcus_guid-->
            <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="true"
                      :no_label="true"
                      :text="'Supcus_guid'"
                      v-model:pass_value="payload_new_2.supcus_guid"
                      :dbComponentBehavior="dbComponentBehavior.supcus_guid" />
                </div>
            </div>







<!--close second row(inside)-->              
</div>  
<!--close second column-->  
</div>
<!--close first row-->   
</div>

<div class="row row_section justify-end">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
<!--Remark-->
            <LabelTextAreaVertical
            style="margin-left: 10px;" 
            :readonly="false"  
            :no_label="true" 
            :text="'Remark'" 
            v-model:pass_value="payload_new_2.remark" 
            :dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>
</div>

<br/>
<!--open another row for table-->   
<!--Search label(in table)-->
<div class="row row_section">

<!--open another column for table ( for table server data)-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <TablePagination
                :row_per_page="[20,40,60,80,100,0]" 
                :top_button="true" 
                v-on:head_button="addButton" 
                v-on:main_action="handleAction" 
                v-on:receiveRequestTable="handleTableChange" 
                :title="table_title_1" 
                :table_data="test_data" 
                :table_column="test_column_1"
                :action_button="true"
                style="margin-left: 10px;"
            />
                <!-- v-on:main_edit="handleEdit"  
                     v-on:main_list="handleList" 
                     v-on:main_delete="handleDelete"
                     :edit_button="true"
                     :view_button="true"
                     :delete_button="true"-->
    </div>
<!--close table row-->
</div>

<!--save button(bottom-right)-->
    <div class="row row_section justify-end">
        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-on:receiveChange="callUpdate()"
          :text="'SAVE'"
          :type="'button'" />
      </div>
      </div>           

        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
            <Button
            class="button_save"
            @click="goBack"
            :text="'BACK'"
            :type="'button'" />
      </div>
      </div>
             
    </div>                 

</q-form>

</template>

<script>
//import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
//import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import Select from 'src/components/ERP/Base/Select';
// import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical.vue';
import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
import LabelTextAreaVertical from'src/components/ERP/General/LabelTextAreaVertical' ;
//import { ref } from 'vue'
import Button from 'src/components/Base/Button';
import Chip from 'src/components/ERP/Base/Chip';

import {
    Notify
} from "quasar"

import {
  Loading,
  // optional!, for example below
  // with custom spinner
  QSpinnerTail
} from 'quasar'


export default {
    data() {
        return {
            multiselect_value: [],
            json_new: {},
            payload_new: {},
            payload_new_2: JSON.parse(this.$route.params.data),
            // empty:{empty: ""},// place an object
            table_data_supplier_browser: [],
            table_data_supplier: [],
            test_data: [],
            test_pagination: [],
            showAddTask: false,
            showAction: false,
            showSearchTask: false,
            button:{},
            json:{   
            },
            table_title:"Browse",
            table_data: [],
            table_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    required: true,
                    sortable: false
                },
               { 
                   name: 'code', 
                   label: 'Code', 
                   field: 'code',
                   align: 'right',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'reg_no', 
                   label: 'Reg No', 
                   field: 'reg_no',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'gst_no', 
                   label: 'GST No', 
                   field: 'gst_no',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'tax_code', 
                   label: 'Tax Code', 
                   field: 'tax_code',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'term', 
                   label: 'Term', 
                   field: 'term',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'contact', 
                   label: 'Contact', 
                   field: 'contact',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'right', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'right', 
                   required: true,
                   sortable: true
                }
            ],
// table server
            test_column: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    required: true,
                    sortable: false
                },
  
               { 
                   name: 'code', 
                   label: 'Code', 
                   field: 'code',
                   align: 'right',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',
                   required: true,  
                   sortable: true
                },
               { 
                   name: 'reg_no', 
                   label: 'Reg No', 
                   field: 'reg_no',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'gst_no', 
                   label: 'GST No', 
                   field: 'gst_no',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'tax_code', 
                   label: 'Tax Code', 
                   field: 'tax_code',
                   align: 'left', 
                   sortable: true
                },
               { 
                   name: 'term', 
                   label: 'Term', 
                   field: 'term',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'contact', 
                   label: 'Contact', 
                   field: 'contact',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'right', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'right', 
                   required: true,
                   sortable: true
                }
            ],

            table_title_1:"",
            table_data_1: [ ],
            table_column_1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
               { 
                   name: 'code', 
                   label: 'Branch',
                   field: 'code', 
                   align: 'right', 
                   required: true, 
                   sortable: true
                },
               { 
                   name: 'creditlimit', 
                   label: 'Purchase Limit($)', 
                   field: 'creditlimit',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
            ],

            test_column_1: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },

               { 
                   name: 'code', 
                   label: 'Branch',
                   field: 'code', 
                   align: 'left', 
                   required: true, 
                   sortable: true
                },

               { 
                   name: 'creditlimit', 
                   label: 'Purchase Limit($)', 
                   field: 'creditlimit',
                   align: 'right',
                   required: true, 
                   sortable: true
                },

            ],

            table_title_2:"",
            table_data_2: [],
            table_column_2: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
               { 
                    name: 'acc_no', 
                    label: 'Account Code', 
                    field: 'acc_no', 
                    align: 'right',
                    sortable: true 
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',  
                   sortable: true
                }
            ],
// table server
            test_column_2: [
                {
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
               { 
                    name: 'acc_no', 
                    label: 'Account Code', 
                    field: 'acc_no', 
                    align: 'right',
                    sortable: true 
                },
               { 
                   name: 'name', 
                   label: 'Name', 
                   field: 'name',
                   align: 'left',  
                   sortable: true
                }
            ],
    }
    
},

setup () {
    return {
    }
},
        
    components: {
    // LabelInputHorizontal,
    LabelInputVertical,
    // LabelSelectHorizontal,
    LabelSelectVertical,
    // LabelMultiSelectHorizontal,
    // LabelMultiSelectVertical,
    // LabelDatepickerHorizontal,
    LabelDatepickerVertical,
    // LabelCheckboxHorizontal,
    LabelCheckboxVertical,
    // LabelTextAreaHorizontal,
    LabelTextAreaVertical,
    // Select,
    Input,
    Label,
   //Table,
    TablePagination,
    //LabelInputHorizontal,
    // Checkbox,
    Button,
    Chip,
},
    computed: {
        dbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
        },
    },

    methods: {
        goBack(){
            // Go back to supplier (basically used for after update 'back' function)
            this.$router.push({name: "Supplier"})
        },
        addButton: function()
        {
            this.payload_new_3=this.payload_new_2;
            this.payload_new_3.searchbutton = false;
            this.payload_new_3.actionbutton = false;
            this.$router.push({name: "Supplier/details", params: {data: JSON.stringify(this.payload_new_3) } })
        },// show add //declare new name to avoid similar data crash together since the output shown are different
        addButton1: function(payload)
        {
            this.showAddTask = true
            
        }, // show dialog

        // same name but different function since one is for search another one is for edit(action); so should be fine
        searchButton: function()
        {
            // this.showSearchTask = true
            this.payload_new_3=this.payload_new_2;
            this.payload_new_3.searchbutton = true;
            this.payload_new_3.actionbutton = false;
            this.$router.push({name:'Supplier/details', params: {data: JSON.stringify(this.payload_new_3) } })
        },// show search
        handleAction: function(payload){
            console.log(payload);
            // alert(payload.locgroup_dc);
            this.showAction = true;
            payload.searchbutton = false;
            payload.actionbutton = true;
            this.payload_new_3=payload;
            this.$router.push({name: "Supplier/details", params: {data: JSON.stringify(this.payload_new_3) } })
        
        },//show edit

        showNotify(type, message) {
            Notify.create({
                type: type,
                message: message,
                timeout: 1000,
                position: 'top',
            })
        },
        showLoading()
        {
            // default options
            Loading.show()

            // fully customizable
            Loading.show({
                spinner: QSpinnerTail,
            // other props
            })
        },
        hideLoading()
        {
            setTimeout(function(){
                Loading.hide();
            },300);
        },
        
        callUpdate: function()
        {
            //do form verification before submit the form
            this.$refs['submit_form'].validate().then(valid => {

                if (!valid) {
                    //got field thats not fullfill standard
                    this.showNotify('negative', 'Please make sure all field is filled in.')
                }
                else
                {
                    //show loading icon
                    this.showLoading();
                    //already verified all the field than call save value
                    this.handleSave();
                }
            })
        },
        
        handleSave: function()

        {

//all supplier(include table and form)
// Previously used payload_new_3(reason: because declare payload_new_2 || payload in payload_new_3; not sure)
            var payload = {
                "primary_key": this.payload_new.code,
                "pass_json": this.payload_new
            };

            this.$store.dispatch('setup/trigger_edit_supplier_table', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_status_table']));
                var status = data.status;
                var response = data.response
                console.log(data);
                if(status == 'success')
                {
                    this.showNotify('positive', 'Successfully Update.')
                    //hide loading
                    this.hideLoading();
                }
                else
                {
                    this.showNotify('negative', 'Fail to update. Please contact administrator for futher actions.')
                    //hide loading
                    this.hideLoading();
                }
            });
        },
        
// table server side
handleTableChange: function(newVal)
        {

            var new_params = this.$pluginsTableParams(newVal)

            var payload = {
                params : new_params
            };
            
            this.$store.dispatch('setup/trigger_supplier_table_data_server_side', payload).then(() => {
                var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data_server_side']));

                this.test_data = data;
            });
        }

    }, 

created: function () {
        var payload = {};

        this.$store.dispatch('setup/trigger_supplier', payload).then (() => {

        var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier']));

        this.json_new = data;

        var SupplierTableDataBrowser = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data_browser']));

        this.table_data_supplier_browser = SupplierTableDataBrowser;

        var SupplierTableData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data']));

        this.table_data_supplier = SupplierTableData;

        var SupplierTableSearchData = JSON.parse(JSON.stringify(this.$store.getters['setup/get_supplier_table_data']));

        this.table_data_supplier_search = SupplierTableSearchData;
        });
    }
}
</script>

<style scoped>
.card_section {
    padding: 0px 0px 0px 0px;
}

.row_section
{
    padding-left: 10px;
    right: 10px;
}

.table_wrapper{
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    padding-top: 2px;
}

/*tool bar css desmond*/
* >>> .q-tab__content
{
    color: white !important;
}

* >>> .q-tab--active
{
    color: white !important;
}

* >>> .q-tab__indicator
{
    color: white !important;
}
  
</style>