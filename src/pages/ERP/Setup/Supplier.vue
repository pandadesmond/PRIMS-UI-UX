<template>
<!--{{json_new}}
<br>-->
<!--{{table_data}}
{{table_data_supplier_browser}}
<br>-->
<!--{{table_data_supplier}}
<br>-->
<!--{{payload_new}}-->
<!--q-form but unable to update-->
<q-form ref="submit_form">
    
<!--breadcrumbs label-->
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px; margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                <Chip text="Setup" icon="tune"/> / <Chip text="Supplier" icon="business"/>

            </div>
        </div>

<!--Search label-->
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




<!--tab-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <q-card>
                <q-card-section>
                    <q-toolbar>
                        <q-tabs
                        v-model="tab"
                        dense
                        class="text-black"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                        shrink stretch
                        >
                            <q-tab name="browse" label="Browse" />
                            <q-tab name="detail" label="Detail" />
                        </q-tabs>
                    </q-toolbar>
                 <q-separator />

<!--Browse table-->
                <q-tab-panels v-model="tab" :animated="false">
                    <q-tab-panel name="browse">
<!--Table without all info API, only results with first 20-->
                                <Table 
                                :row_per_page="[20,40,60,80,100,0]" 
                                v-on:main_edit="handleEdit" 
                                :title="table_title" 
                                :table_data="table_data_supplier_browser" 
                                :table_column="table_column"
                                :action_button="true"
                                :edit_button="true"
                                />
                                <!-- v-on:main_action="handleAction"  
                                v-on:main_list="handleList" 
                                v-on:main_delete="handleDelete" \
                                :view_button="true"
                                :delete_button="true" -->  

<!--Table wit all info API-->                                
                                <TablePagination 
                                :hide_footer="false" 
                                :button_no_outline="true"
                                :row_per_page="[20,40,60,80,100]"
                                v-on:main_edit="handleEdit" 
                                v-on:receiveRequestTable="handleTableChange" 
                                :table_column="test_column" 
                                :table_data="test_data" 
                                :action_button="true"
                                :edit_button="true"
                                title="Browse(new)"
                                />
                            <!--:view_button="true"
                                :delete_button="true"
                                :top_button="true"-->
                    </q-tab-panel>

<!--Details-->
                    <q-tab-panel name="detail">

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
                            :top_button="true" f
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
                :button_no_outline="true"
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


<!--Grouping(this is hardcopy since no API provided)
<div class="card_section col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
<div class="component_div"> 
        <LabelSelectVertical 
            style="margin-left: 0px; max-height: 1px; display:inline;" 
            :readonly="false" 
            :no_label="true" 
            :text="'Grouping'" 
            v-model:pass_value="json.grouping" 
            :dbComponentBehavior="dbComponentBehavior.select"

/>               
     </div>            
            </div>
                    <div class="card_section col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1">
                        <div class="component_div">       
                            <q-btn
                            padding="xs"
                            color="primary"
                            icon="reorder"
                            style="margin-top: 33px;"
                            :top_button="true" 
                            @click="listButton"
                            />-->

<!--List dialog
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showListTask">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label text="Group Setup" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>-->

<!--Grouping       
<q-card-section>
        <div class="row row_section">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <Label text="Grouping" class="text-subtitle1" style="background-color:transparent;"/>
                    <Input
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Grouping'" 
                        v-model:pass_value="json.text" 
                        :dbComponentBehavior="dbComponentBehavior.text"/>
                </div>
            </div>
        </div>
<br>-->
<!--Table
             <Table 
                :row_per_page="[20,40,60,80,100,0]" 
                v-on:main_action="handleAction" 
                v-on:main_edit="handleEdit" 
                v-on:main_list="handleList" 
                v-on:main_delete="handleDelete" 
                :title="table_title_3" 
                :table_data="table_data_3" 
                :table_column="table_column_3"
                :action_button="true"
                :edit_button="true"
                :view_button="true"
                :delete_button="true"
            />--> 

<!--Dialog button (bottom-right) 
        <q-card-actions align="right">
            <q-btn 
            label="Add" 
            color="primary" 
            v-close-popup />
  
          <q-btn 
            label="Close" 
            color="primary" 
            v-close-popup />
 
        </q-card-actions>
 </q-card-section> 

   </q-card>
</q-dialog>-->  

<!--Search dialog close div(row,col,comp_div) 
</div>       
</div>  
</div> -->  

<!--q-btn
</div>       
</div> -->  

<!--Name Appear in Document(this is hardcopy since no API provided)
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <LabelInputVertical :readonly="false" :no_label="true" :text="'Name Appear in Document'" v-model:pass_value="json.name_doc" :dbComponentBehavior="dbComponentBehavior.name"/> 
                </div>
            </div>-->

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
    <div class="card_section col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        <div class="component_div">
            <LabelInputHorizontal 
            :readonly="false" 
            :no_label="true" 
            :text="'Search'" 
            v-model:pass_value="json.text" 
            :dbComponentBehavior="dbComponentBehavior.text"
            style="margin-left: 10px;"/>
        </div>
    </div>
 
    <br/>
    <br/>
    <br/>
<!--open another column for table-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <Table 
                :row_per_page="[20,40,60,80,100,0]" 
                :top_button="true" 
                v-on:head_button="addButton" 
                v-on:main_action="handleAction" 
                
                :title="table_title_1" 
                :table_data="table_data_supplier" 
                :table_column="table_column_1"
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
                :button_no_outline="true"
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



<!--Action dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showAction">
         <q-card style="width: 700px; max-width:90vw;">
            <q-card-section class="row bg-primary text-white">
           <Label text="Edit Record" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>
<q-card-section class="q-pt-none">

<!--Branch-->
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">             
                <LabelSelectVertical 
                    style="margin-left: 0px; max-height: 1px; display:inline;" 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'Branch'" 
                    v-model:pass_value="payload_new.code"
                    :dbComponentBehavior="dbComponentBehavior.select"
                    :options="json_new"
                    option-label="code"/>                    
            </div>
            </div>

<!--Purchase Limit-->
           <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="component_div">     
                     <LabelInputVertical
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Purchase Limit($)'" 
                        v-model:pass_value="payload_new.creditlimit" 
                        :dbComponentBehavior="dbComponentBehavior.text"
/>

            </div>
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


<!--close button(bottom-right)-->

        <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="component_div text-right">   
        <Button
          class="button_save"
          v-close-popup
          :text="'CLOSE'"
          :type="'button'" />
      </div>
      </div>
             
    </div> 

</q-card-section>
               </q-card>
               </q-dialog>
               </div>
               </div>
               </div>

<!--Addbutton dialog-->
<div class="row row_section">
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
        <q-dialog v-model="showAddTask">
         <q-card style="width: 700px; max-width:80vw;">
            <q-card-section class="row bg-primary text-white">
           <Label text="Add New Record" class="text-subtitle1" style="background-color:transparent;"/>
          <q-space/> 
            <q-btn 
                v-close-popup
                flat 
                round 
                dense
                icon="close" />
        </q-card-section>
 

        <q-card-section >
        <div class="row row_section">

<!--Active-->
           <!--<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                 <Label text="Active" class="text-subtitle1" style="background-color:transparent;"/>           
                <Checkbox 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'Active'" 
                    v-model:pass_value="json.active" 
                    :dbComponentBehavior="dbComponentBehavior.active"/>

            </div>
            </div>-->

<!--Branch-->
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">          
                     <LabelSelectVertical 
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Branch'" 
                        v-model:pass_value="payload_new.code"
                        :dbComponentBehavior="dbComponentBehavior.select"
/>

            </div>
            </div>

<!--AR customer-->
          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                <Label text="AR Customer" class="text-subtitle1" style="background-color:transparent;"/>            
                     <Input 
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'AR Customer'" 
                        v-model:pass_value="json.ar_cust" 
                        :dbComponentBehavior="dbComponentBehavior.text"
/>

            </div>
            </div>-->


<!--AP supplier-->
           <!--<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                <Label text="AP Supplier" class="text-subtitle1" style="background-color:transparent;"/>            
                     <Input 
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'AP Supplier'" 
                        v-model:pass_value="json.ap_supp" 
                        :dbComponentBehavior="dbComponentBehavior.text"
/>

            </div>
            </div>-->

<!--Purchase Limit-->
           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div">      
                     <LabelInputVertical
                        style="margin-left: 0px; max-height: 1px; display:inline;" 
                        :readonly="false" 
                        :no_label="true" 
                        :text="'Purchase Limit($)'" 
                        v-model:pass_value="payload_new.creditlimit" 
                        :dbComponentBehavior="dbComponentBehavior.text"
/>

            </div>
            </div>

<!--IS IBT-->
          <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                 <Label text="IS IBT" class="text-subtitle1" style="background-color:transparent;"/>           
                <Checkbox 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'IS IBT'" 
                    v-model:pass_value="json.isibt" 
                    :dbComponentBehavior="dbComponentBehavior.isibt"/>

            </div>
            </div>-->

<!--IS ICT-->
           <!--<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                 <Label text="IS IBT" class="text-subtitle1" style="background-color:transparent;"/>           
                <Checkbox 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'IS ICT'" 
                    v-model:pass_value="json.isict" 
                    :dbComponentBehavior="dbComponentBehavior.isict"/>

            </div>
            </div>-->

<!--GST-->
           <!--<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="component_div"> 
                 <Label text="GST" class="text-subtitle1" style="background-color:transparent;"/>           
                <Checkbox 
                    :readonly="false" 
                    :no_label="true" 
                    :text="'GST'" 
                    v-model:pass_value="json.gst" 
                    :dbComponentBehavior="dbComponentBehavior.gst"/>

            </div>
            </div>-->

            </div>
        </q-card-section>

     <q-card-section>
         <div class="row row_section">
           <q-icon name="home" size="20px"/>
           <Label
             text="Information"
             class="text-subtitle1"
             style="background-color:transparent; margin-top: -5px;" />
           
<!--Address 1-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <LabelInputVertical
              :readonly="false"
              :no_label="true"
              :text="'Address'"
              v-model:pass_value="payload_new.dadd1"
              :dbComponentBehavior="dbComponentBehavior.text"
              style="margin-left: 0px;" />
        </div>
    </div>

<!--Address 2-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input  
                style="margin-left: 0px;"
                :readonly="false" 
                :no_label="true"
                :text="'Address'"  
                 v-model="payload_new.dadd2" 
                :dbComponentBehavior="dbComponentBehavior.text"/>
        </div>
    </div>

<!--Address 3-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                style="margin-left: 0px;"
                :readonly="false" 
                :no_label="true" 
                :text="'Address'" 
                v-model="payload_new.dadd3" 
                :dbComponentBehavior="dbComponentBehavior.text"/>
        </div>
    </div>

<!--Address 4-->
    <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <Input 
                style="margin-left: 0px;"
                :readonly="false" 
                :no_label="true"
                :text="'Address'" 
                v-model="payload_new.dadd4" 
                :dbComponentBehavior="dbComponentBehavior.text"/>
        </div>
    </div>

<!--Contact-->
            <!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <Label text="Contact" class="text-subtitle1" style="background-color:transparent;"/> 
                    <Input :readonly="false" :no_label="true" :text="'Contact'" v-model:pass_value="json_new.contact" :dbComponentBehavior="dbComponentBehavior.text"/> 
                </div>
            </div>-->

<!--Tel-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                   <LabelInputVertical
                     :readonly="false"
                     :no_label="true"
                     :text="'Tel'"
                     v-model:pass_value="payload_new.dtel"
                     :dbComponentBehavior="dbComponentBehavior.text"
                     style="margin-left: 0px;" /> 
                </div>
            </div>

<!--Fax-->
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <LabelInputVertical
                      :readonly="false"
                      :no_label="true"
                      :text="'Fax'"
                      v-model:pass_value="payload_new.dfax"
                      :dbComponentBehavior="dbComponentBehavior.text"
                      style="margin-left: 0px;" /> 
                </div>
            </div>

<!--Email-->
            <!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="component_div">
                    <Label text="Email" class="text-subtitle1" style="background-color:transparent;"/> 
                    <Input :readonly="false" :no_label="true" :text="'Email'" v-model:pass_value="json_new.email" :dbComponentBehavior="dbComponentBehavior.text"/> 
                </div>
            </div>-->
</div>
    </q-card-section>

<!--dialog bottom button-->
        <q-card-actions align="right">
            <div class="row row_section" >
                <div class="card_section col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div class="component_div"> 
                         <Button
                           class="button_save"
                           v-on:receiveChange="callUpdate()"
                           :text="'ADD'"
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
                </div>           
            </div> 
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
             
    </div>                     

<!--close tab panel-->                          
</q-tab-panel>
<!--close tab panels-->  
</q-tab-panels>          
<!--close whole card-->         
 </q-card-section>
            </q-card>
        </div>
    </div>
</div>
</q-form>

<!--<q-form ref="submit_form">-->
<!--Browse table(dialog)-->
<!--Action dialog-->
<!--<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div">
<q-dialog v-model="showAction">
<q-card style="width: 700px; max-width:80vw;">
<q-card-section class="row bg-primary text-white">
<Label text="Edit HQ" class="text-subtitle1" style="background-color:transparent;"/>
<q-space/> 
<q-btn 
v-close-popup
flat 
round 
dense
icon="close" />
</q-card-section>

<q-card-section class="q-pt-none">
<div class="row row_section">-->
<!--code-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Code" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Code'" 
v-model="payload_new.code" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Name-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Name" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Name'" 
v-model="payload_new.name" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Reg No-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Reg No" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Reg No'" 
v-model="payload_new.reg_no" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--GST No-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="GST No" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'GST No'" 
v-model="payload_new.gst_no" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Tax code-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Tax Code" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Tax Code'" 
v-model="payload_new.taxcode" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Term-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Term" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Term'" 
v-model="payload_new.term" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Contact-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Contact" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Contact'" 
v-model="payload_new.contact" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Mobile-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Mobile" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Mobile'" 
v-model="payload_new.mobile" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Tel-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Tel" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Tel'" 
v-model="payload_new.tel" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Fax-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Fax" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Fax'" 
v-model="payload_new.fax" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Account No-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Account No" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="'Account No'" 
v-model="payload_new.acc_no" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>-->

<!--Address 1-->
<!--<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div"> 
<Label text="Address 1" class="text-subtitle1" style="background-color:transparent;"/>
<Input :readonly="false" 
:no_label="true" 
:text="Address1" 
v-model="payload_new.add1" 
:dbComponentBehavior="dbComponentBehavior.text"/>

</div>
</div>

</div>
</q-card-section>

<q-card-actions align="right">

<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div text-right"> 
<Button class="button_save" v-on:receiveChange="callUpdate()" :text="'SAVE'" :type="'button'" />
</div>
</div>
</div>

<div class="row row_section">
<div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
<div class="component_div text-right"> 
<Button class="button_save" v-on:receiveChange="callUpdate()" :text="'CANCLE'" :type="'button'" />
</div>
</div>
</div>
</q-card-actions>
</q-card>
</q-dialog>
</div>
</div>
</div>

</q-form>-->

</template>

<script>
import Table from 'src/components/ERP/Base/Table';
import TablePagination from 'src/components/ERP/Base/TablePagination';
import Label from 'src/components/ERP/Base/Label';
import Input from 'src/components/ERP/Base/Input';
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelSelectVertical from'src/components/ERP/General/LabelSelectVertical' ;
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
// import Select from 'src/components/ERP/Base/Select';
// import LabelCheckboxHorizontal from 'src/components/ERP/General/LabelCheckboxHorizontal.vue';
// import Checkbox from 'src/components/ERP/Base/Checkbox';
import LabelCheckboxVertical from 'src/components/ERP/General/LabelCheckboxVertical.vue';
import LabelDatepickerVertical from'src/components/ERP/General/LabelDatepickerVertical' ;
import LabelTextAreaVertical from'src/components/ERP/General/LabelTextAreaVertical' ;
import { ref } from 'vue'
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
            payload_new_2: {},
            // empty:{empty: ""},// place an object
            table_data_supplier_browser: [],
            table_data_supplier: [],
            test_data: [],
            test_pagination: [],
            showAddTask: false,
            showAction: false,
            showSearchTask: false,
            // showListTask: false,
            json:{   
                // "code": '1001',
                //"link_code": '1001',
                // "name": 'PANDA DESA MENTERI 2 (Y01)',
                //"regno": '257229K',
                //"gstno": '001400971264',
                //"tax_code": 0,   
                // "term": 0,
                // "contact": '',
                // "mobile":'',
                // "tel":'03-80206613',
                // "fax":'03-80112801',
                //"account_no":'',   
                //"GST_effective_date": '04/01/2015', 
                // "Address": 'B9-G-22 & 23, BLOCK 9, JLN PJS 2B/1',
                // "Address1": 'DESA MENTERI 2',
                // "Address2": '',
                // "Address3": 'PETALING JAYA SELANGOR',
                // "bank_acc": '',
                // "payment_term": '',
                // "cal_due_date_by": 'GRN Date',
                // "Remark": '',
                // "currency": 0,
                //"grouping": '',
                // "multi_tax_rate": '',
                // "sst_no": '',
                // "sst_default_code": 0,
                // "SST_effective_date": '01/01/2022',
                //"name_doc": 'PANDA SDN BHD',
                // "contact1": '',
                // "contact2": '',
                // "email": '',
                // "active": '',
                // "ar_cust": '',
                // "ap_supp": '',
                // //"pur_limit": '0.00',
                // "isibt": '',
                // "isict": '',
                // "gst": '',
                },
            // tax_code_options : [
            //     {
            //         "value": 0,
            //         "label": "IS-0%;Imports under special scheme with no GST incurred(eg: Approved Trader Scheme, ATMS Scheme"
            //     },
            //     {
            //         "value": 1,
            //         "label": "NR-0%;Purchase from non GST-registered supplier with no GST incurred"
            //     },
            //     {
            //         "value": 2,
            //         "label": "ZP-0%;Purchase from non GST-registered supplier with no GST incurred (eg: supplier provides transportation of goods that qualify as international services)"
            //     },
            //     {
            //         "value": 3,
            //         "label": "OP-0%;Purchase transactions which is out of the scope of GST legislation (eg: purchase of good overseas)"
            //     },
            //     {
            //         "value": 4,
            //         "label": "GP-0%;Purchase transactions disregarded under GST legislation (eg: purchase within GST group registration)"
            //     },
            //     {
            //         "value": 5,
            //         "label": "IM-GDS-0%;GST code used for Import for AutoCount Financial Accounting"
            //     },
            //     {
            //         "value": 6,
            //         "label": "TX0-0%;Purchase with GST incurred at 0% and directly attributable to taxable supplies"
            //     }
            // ],
            // payment_term_options : [
            //     {
            //         "value": 0,
            //         "label": "CASH - CASH"
            //     },
            //     {
            //         "value": 1,
            //         "label": "30 -30 DAYS"
            //     },
            //     {
            //         "value": 2,
            //         "label": "45 - 45 DAYS"
            //     },
            //     {
            //         "value": 3,
            //         "label": "60 - 60 DAYS"
            //     },
            //     {
            //         "value": 4,
            //         "label": "90 - 90 DAYS"
            //     },
            //     {
            //         "value": 5,
            //         "label": "120 -120 DAYS"
            //     },
            //     {
            //         "value": 6,
            //         "label": "15 - 15 DAYS"
            //     }
            // ],
            // cal_due_date_by_options : [
            //     {
            //         "value": 0,
            //         "label": "GRN Date"
            //     },
            //     {
            //         "value": 1,
            //         "label": "DOC. Date"
            //     },
            // ],
            // currency_options : [
            //     {
            //         "value": 0,
            //         "label": "AUD"
            //     },
            //     {
            //         "value": 1,
            //         "label": "EUR"
            //     },
            //     {
            //         "value": 2,
            //         "label": "MYR"
            //     },
            //     {
            //         "value": 3,
            //         "label": "NZD"
            //     },
            //     {
            //         "value": 4,
            //         "label": "USD"
            //     },
            // ],
            // grouping_options : [
            //     {},
            // ],
            // sst_options : [
            //     {   "value": 0,
            //         "label": "NA"
            //     },
            //     {   "value": 1,
            //         "label": "SL"
            //     },
            //     {   "value": 2,
            //         "label": "SL-5"
            //     },
            //     {   "value": 3,
            //         "label": "SV"
            //     }
            // ],
            // code_options : [
            //     {   "value": 0,
            //         "label": "PGHQ"
            //     },
            //     {   "value": 1,
            //         "label": "1001"
            //     },
            //     {   "value": 2,
            //         "label": "1002"
            //     },
            //     {   "value": 3,
            //         "label": "1003"
            //     }
            // ],
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
            //    { 
            //         name: 'blocked', 
            //         label: 'Blocked', 
            //         align: 'right',
            //         sortable: true, 
            //         required: true
            //     },
               { 
                   name: 'code', 
                   label: 'Code', 
                   field: 'code',
                   align: 'left',
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
                   align: 'right', 
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
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'left', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'left', 
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
                   align: 'left',
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
                   align: 'right', 
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
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'mobile', 
                   label: 'Mobile', 
                   field: 'mobile',
                   align: 'left', 
                   required: true,
                   sortable: true
                },
                { 
                   name: 'tel', 
                   label: 'Tel', 
                   field: 'tel',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'fax', 
                   label: 'Fax', 
                   field: 'fax',
                   align: 'left',
                   required: true, 
                   sortable: true
                },
                { 
                   name: 'acc_no', 
                   label: 'Account No', 
                   field: 'acc_no',
                   align: 'left', 
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
            //    { 
            //         name: 'active', 
            //         label: 'Active', 
            //         field: 'active', 
            //         align: 'left',
            //         sortable: true 
            //     },
               { 
                   name: 'code', 
                   label: 'Branch',
                   field: 'code', 
                   align: 'right', 
                   required: true, 
                   sortable: true
                },
            //    { 
            //        name: 'ar_customer', 
            //        label: 'AR Customer', 
            //        align: 'left', 
            //        required: true, 
            //        sortable: true
            //     },
            //    { 
            //        name: 'ap_supplier', 
            //        label: 'AP Supplier', 
            //        align: 'left', 
            //        required: true,
            //        sortable: true
            //     },
            //    { 
            //        name: 'isIBT', 
            //        label: 'IS IBT', 
            //        align: 'left', 
            //        required: true,
            //        sortable: true
            //     },
            //    { 
            //        name: 'isICT', 
            //        label: 'IS ICT', 
            //        align: 'left', 
            //        required: true,
            //        sortable: true
            //     },
            //    { 
            //        name: 'gst', 
            //        label: 'GST', 
            //        align: 'left', 
            //        required: true,
            //        sortable: true
            //     },
               { 
                   name: 'creditlimit', 
                   label: 'Purchase Limit($)', 
                   field: 'creditlimit',
                   align: 'right',
                   required: true, 
                   sortable: true
                },
                // { 
                //    name: 'created_at', 
                //    label: 'Created At', 
                //    align: 'left', 
                //    required: true,
                //    sortable: true
                // },
                // { 
                //    name: 'created_by', 
                //    label: 'Created By', 
                //    align: 'left', 
                //    required: true,
                //    sortable: true
                // },
                // { 
                //    name: 'update_at', 
                //    label: 'Update At', 
                //    align: 'left', 
                //    required: true,
                //    sortable: true
                // },
                // { 
                //    name: 'update_by', 
                //    label: 'Update By', 
                //    align: 'left', 
                //    required: true,
                //    sortable: true
                // }
                //new info which occur in API
            //    { 
            //        name: 'contact', 
            //        label: 'Contact', 
            //        field: 'contact',
            //        align: 'right',
            //        required: true, 
            //        sortable: true
            //     },
            //    { 
            //        name: 'tel', 
            //        label: 'Tel', 
            //        field: 'tel',
            //        align: 'right',
            //        required: true, 
            //        sortable: true
            //     },
            //    { 
            //        name: 'fax', 
            //        label: 'Fax', 
            //        field: 'fax',
            //        align: 'right',
            //        required: true, 
            //        sortable: true
            //     },
            //    { 
            //        name: 'email', 
            //        label: 'Email', 
            //        field: 'email',
            //        align: 'left',
            //        required: true, 
            //        sortable: true
            //     },
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

            // table_title_3:"",
            // table_data_3: [
            //     {
            //         action: '',
            //         grouping: '',
            //         edit: '',
            //     },
            //     ],
            // table_column_3: [
            //     {
            //         name: 'action',
            //         required: true,
            //         label: 'Actions',
            //         align: 'left',
            //         sortable: false
            //     },
            //    { 
            //         name: 'grouping', 
            //         label: 'Grouping', 
            //         field: 'grouping', 
            //         align: 'left',
            //         sortable: true 
            //     },
            //    { 
            //        name: 'edit', 
            //        label: 'Edit', 
            //        field: 'edit',
            //        align: 'left',  
            //        sortable: true
            //     }
            // ],

    }
    
},

setup () {
    return {
        tab: ref('browse')
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
    Table,
    TablePagination,
    LabelInputHorizontal,
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
        addButton: function()
        {
            this.payload_new_5=this.payload_new;
            this.payload_new_5.searchbutton = false;
            this.payload_new_5.actionbutton = false;
            this.$router.push({name: "Supplier/details/2", params: {data: JSON.stringify(this.payload_new_5) } })
        },// show add //declare new name to avoid similar data crash together since the outpust shown are different
        addButton1: function(payload)
        {
            this.showAddTask = true
            
        }, // show dialog
        searchButton: function()
        {
            // this.showSearchTask = true
            this.payload_new_5=this.payload_new;
            this.payload_new_5.searchbutton = true;
            this.payload_new_5.actionbutton = false;
            this.$router.push({name:'Supplier/details/2', params: {data: JSON.stringify(this.payload_new_5) } })
        },// show search
        handleAction: function(payload){
            console.log(payload);
            // alert(payload.locgroup_dc);
            this.showAction = true;
            payload.searchbutton = false;
            payload.actionbutton = true;
            this.payload_new_5=payload;
            this.$router.push({name: "Supplier/details/2", params: {data: JSON.stringify(this.payload_new_5) } })
        
        },//show edit

        handleEdit: function(payload){
            console.log(payload);
            this.showEdit = true;
            this.payload_new_2=payload;
            this.$router.push({name: "Supplier/view/details", params: {data: JSON.stringify(this.payload_new_2) } })
        },//show view

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