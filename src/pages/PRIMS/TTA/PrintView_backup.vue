<!-- Print TTA that display tab_article by component_type of article-->
<template>
    <div class="bg-white">
        <div class="row justify-end q-pa-md">
            <q-btn icon="print" color="primary" text-color="white" @click="handlePrint"></q-btn>
        </div>
        <div id="report_print" v-if="!loading" class="q-pa-md">
            <div class="row small_text justify-between">
                <div class="col-8 text-bold text-left">
                    <div class="row" style="font-size:12px"><span>{{json.company.name}} ({{json.company.reg_no}} ({{json.company.old_reg_no}}))</span></div>
                    <div class="row" style="font-size:12px">
                        <span v-if="json.concept.length>0">{{json.concept.map(entry=>entry.concept_info.banner).join(', ')}}</span>
                    </div>
                    <div class="row text-weight-light">
                        <span>{{json.concept.length > 0 ? json.concept[0].concept_info.address : ""}}</span>
                    </div>
                </div>
                <div class="col-2 text-bold">
                    <div>STRICTLY CONFIDENTIAL</div>
                    <div class="row text-weight-light"><span>Ref No: {{json.refno}}</span></div>
                    <div class="row text-weight-light"><span>Date: {{displayDate(json.effective_date_from,'dd.mm.yyyy')}}</span></div>
                </div>
            </div>
            <div class="row q-py-xs" style="font-size: 14px">
                <div class="col-12 text-bold text-center">
                    Trading Term Agreement
                </div>
            </div>
            <div>
                <table style="width: 100%">
                    <tr>
                        <td style="width:20%"><span>Deal To:</span></td>
                        <td style="width:20%"><span>{{displayText(json.supplier_to_code)}}</span></td>
                        <td><span>Vendor Name:</span></td>
                        <td colspan="3"><span>{{displayText(json.supplier_ref)}}</span></td>
                    </tr>

                    <tr>
                        <td><span>Deduct From:</span></td>
                        <td><span>{{displayText(json.supplier_to_code)}}</span></td>
                        <td><span>Vendor Name:</span></td>
                        <td colspan="3"><span>{{displayText(json.supplier_ref)}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Company Reg. No:</span></td>
                        <td><span v-if="json.supplier">{{displayText(json.supplier.old_brn)}}</span></td>
                        <td><span>Address:</span></td>
                        <td colspan="3"><span v-if="json.supplier">{{displayText(json.supplier.address1)}} {{displayText(json.supplier.address2)}} {{displayText(json.supplier.address3)}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Division:</span></td>
                        <td><span>{{displayDivision}}</span></td>
                        <td><span>Tel No:</span></td>
                        <td style="width: 15%"><span v-if="json.supplier">{{displayText(json.supplier.telephone)}}</span></td>
                        <td style="width: 15%"><span>Fax No:</span></td>
                        <td style="width: 15%"><span v-if="json.supplier">{{displayText(json.supplier.fax_no)}}</span></td>
                    </tr>

                    <tr>
                        <td colspan="2"><span>Total Purchase:</span></td>
                        <td><span>This Year (YTD)-2024 07</span></td>
                        <td><span></span></td>
                        <td><span>This Year (YTD)-2023 07</span></td>
                        <td><span></span></td>
                    </tr>

                    <tr v-if="proposal">
                        <td colspan="2"><span></span></td>
                        <td><span>Last Year (YTD)-2023</span></td>
                        <td><span></span></td>
                        <td><span>Last 2 Year (YTD)-2022</span></td>
                        <td><span></span></td>
                    </tr>
                </table>
            </div>

            <div v-if="proposal" class="row q-mt-sm">
                <table style="width: 100%">
                    <tr>
                        <th style="border: none; width: 40%;"></th>
                        <th class="text-center bg-black text-white" colspan="3" style="width:30%"><span>Previous</span></th>
                        <th class="text-center bg-black text-white" colspan="3" style="width:30%"><span>Current</span></th>
                    </tr>
                    
                    <tr>
                        <td><span>Trading Term Year</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{displayDate(json.prev_tta.effective_date_from,'yyyy')}}</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,'yyyy')}}</span></td>
                    </tr>

                    
                    <tr>
                        <td><span>Trading Agreement No.</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{json.prev_tta.refno}}</span></td>
                        <td class="text-center" colspan="3"><span>{{json.refno}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Agreement Effective Date</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{displayDate(json.prev_tta.effective_date_from,'dd.mm.yyyy')}}</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,'dd.mm.yyyy')}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Terms (From statement date)</span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Discount</span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                    </tr>
                </table>
                    
                <table v-for="(tab,index) in json.tta_tab" :key="index">
                    <tbody v-if="tab.type=='RB'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:30%"><span>%</span></td>
                            <td class="text-center" colspan="3" style="width:30%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='AF' || tab.type=='PEN'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:30%"><span>Amount</span></td>
                            <td class="text-center" colspan="3" style="width:30%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="3"><span></span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>                                                

                    <tbody v-else-if="tab.type=='PDFE'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="2" style="width:20%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '$' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='ALW'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Site Group</span></td>
                            <td class="text-center" colspan="2" style="width: 20%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Site Group</span></td>
                            <td class="text-center" colspan="2" style="width: 20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='TIR'">
                        <tr class="label_row">
                            <td colspan="2">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width: 10%"><span>Growth %</span></td>
                            <td class="text-center" style="width: 10%"><span>Growth Target</span></td>
                            <td class="text-center" style="width: 10%"><span>%</span></td>
                            <td class="text-center" style="width: 10%"><span>Growth %</span></td>
                            <td class="text-center" style="width: 10%"><span>Growth Target</span></td>
                            <td class="text-center" style="width: 10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <tr>
                                <td class="text-right" colspan="2"><span>{{index+1}}st Tier</span></td>
                                <td class="text-center" style="width: 10%"><span></span></td>
                                <td class="text-center" style="width: 10%"><span></span></td>
                                <td class="text-center" style="width: 10%"><span></span></td>
                                <td class="text-center" style="width: 10%"><span></span></td>
                                <td class="text-center" style="width: 10%"><span>{{article.rebate_to == null ? "Onwards" : formatAmount(article.rebate_to,'$')}}</span></td>
                                <td class="text-center" style="width: 10%"><span>{{formatAmount(article.rate,'%')}}</span></td>
                            </tr>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='PDFR' || tab.type=='EPS'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == 'month' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == 'month' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='NST' || tab.type=='STRE'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:10%"><span>Store Type/ Period (in Month)</span></td>
                            <td class="text-center" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" style="width:10%"><span>%</span></td>
                            <td class="text-center" style="width:10%"><span>Store Type/ Period (in Month)</span></td>
                            <td class="text-center" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" style="width:10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else>
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="2" style="width: 20%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                            <td class="text-center" colspan="2" style="width: 20%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '$' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="2"><span></span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>

            <div v-else>
                <table style="width: 100%">
                    <tr>
                        <th style="border: none; width: 40%;"></th>
                        <th class="text-center bg-black text-white" colspan="3" style="width:60%"><span>Current</span></th>
                    </tr>
                    
                    <tr>
                        <td><span>Trading Term Year</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,'yyyy')}}</span></td>
                    </tr>

                    
                    <tr>
                        <td><span>Trading Agreement No.</span></td>
                        <td class="text-center" colspan="3"><span>{{json.refno}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Agreement Effective Date</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,'dd.mm.yyyy')}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Terms (From statement date)</span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Discount</span></td>
                        <td class="text-center" colspan="3"><span></span></td>
                    </tr>
                </table>
                    
                <table v-for="(tab,index) in json.tta_tab" :key="index">
                    <tbody v-if="tab.type=='RB'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:60%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='AF' || tab.type=='PEN'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:60%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>                                                

                    <tbody v-else-if="tab.type=='PDFE'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="2" style="width:40%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '$' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='ALW'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width: 20%"><span>Site Group</span></td>
                            <td class="text-center" colspan="2" style="width: 40%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='TIR'">
                        <tr class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width: 20%"><span>Growth %</span></td>
                            <td class="text-center" style="width: 20%"><span>Growth Target</span></td>
                            <td class="text-center" style="width: 20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <tr>
                                <td class="text-right" colspan="2"><span>{{index+1}}st Tier</span></td>
                                <td class="text-center" style="width: 10%"><span></span></td>
                                <td class="text-center" style="width: 10%"><span>{{article.rebate_to == null ? "Onwards" : formatAmount(article.rebate_to,'$')}}</span></td>
                                <td class="text-center" style="width: 10%"><span>{{formatAmount(article.rate,'%')}}</span></td>
                            </tr>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='PDFR' || tab.type=='EPS'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:20%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:40%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2"><span>{{article.name}}</span></td>
                                    <td><span>{{article.remark1}}</span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{{article.remark2}}</span></td>
                                    <td class="text-center" colspan="1"><span></span></td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.name}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == 'month' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == 'month' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.type=='NST' || tab.type=='STRE'">
                        <tr v-if="tab.tab_article.length>0" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:20%"><span>Store Type/ Period (in Month)</span></td>
                            <td class="text-center" style="width:20%"><span>Amount</span></td>
                            <td class="text-center" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center"><span></span></td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else>
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="2" style="width: 40%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1 && article.component_type == 'target_ratetype_rate_remark'">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? formatAmount(article.value1,article.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.remark2}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option2 == '$' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option2 == '%' ? formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center" colspan="2">
                                        <span>
                                        {{
                                            article.option1 == '$' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '$' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span>
                                        {{
                                            article.option1 == '%' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == '%' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>

            <div class="row q-my-md q-gutter-sm small_text">
                <div class="col-12"><span>Distributor List</span></div>
                <div class="col-12">
                    <div class="row q-px-md" style="border-top: 1px solid; border-bottom: 1px solid">
                        <div class="col-2"><span>No</span></div>
                        <div class="col-4"><span>Distributor</span></div>
                        <div class="col-6"><span>Vendor</span></div>
                    </div>                    
                </div>
                <div v-for="(distributor,index) in json.distributor" :key="index" class="col-12 q-px-md">
                    <div class="row">
                        <div class="col-2"><span>{{index+1}}</span></div>
                        <div class="col-4"><span>{{distributor.refno}}</span></div>
                        <div class="col-6"><span>{{distributor.name}}</span></div>
                    </div>
                </div>
            </div>

            <div class="row q-mt-xl small_text no_break" v-if="json.conditionTrade">
                <div v-html="json.conditionTrade.cot_info.cot_value"></div>
            </div>

            <div class="row no_break">
                <table>
                    <tr v-if="json.concept">
                        <td class="text-center" colspan="3"><span>For and on behalf of<br/>{{json.company.name}} & {{json.concept.name}}</span></td>
                        <td><span>Term and conditions acknowledged and accepted for and on behalf of the above-named company</span></td>
                    </tr>
                    <tr>
                        <td style="height:100px; width: 25%;" class="vertical-top"><span>Issued By</span></td>
                        <td style="height:100px; width: 25%;" class="vertical-top"><span>Authorised By</span></td>
                        <td style="height:100px; width: 25%;" class="vertical-top"><span>Approved By</span></td>
                        <td style="height:100px; width: 25%;" class="vertical-top"><span>(Company stamp and signature)</span></td>
                    </tr>
                    <tr>
                        <td style="height: 100px">
                            <div class="q-gutter-sm" style="height: 30%"><span>Name:</span><span>{{json.issued_by}}</span></div>
                            <div class="q-gutter-sm" style="height: 30%"><span>Designation:</span><span></span></div>
                            <div class="q-gutter-sm" style="height: 30%"><span>Date:</span><span>{{json.issued_date}}</span></div>
                        </td>
                        <td style="height: 100px">
                            <div class="q-gutter-sm" style="height:30%"><span>Name:</span><span>{{json.authorised_by}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Designation:</span><span></span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Date:</span><span>{{json.authorised_date}}</span></div>
                        </td>
                        <td style="height:100px">
                            <div class="q-gutter-sm" style="height:30%"><span>Name:</span><span>{{json.approve_by}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Designation:</span><span></span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Date:</span><span>{{json.approve_date}}</span></div>
                        </td>
                        <td style="height:100px">
                            <div class="q-gutter-sm" style="height:30%"><span>Name (in full):</span><span></span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Designation:</span><span></span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Date:</span><span></span></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <q-inner-loading
        :showing="loading"
        color="primary"
    />
</template>

<script>
import { Notify } from "quasar";

export default {
    data() {
        return{
            json: {},
            proposal: false,
            loading: true,
        }
    },
    computed:{
        displayDivision(){
            return this.json.division.map((entry)=>entry.action_description).join(', ');
        },
    },
    async mounted(){
        this.loading = true;

        this.proposal = this.$route.query.type == 'proposal' ? true : false;

        if(this.$route.query.tta_guid == "")
        {
            this.showNotify('negative','Unable to identify TTA guid.');
            this.$router.push({name: 'tta'});
        }

        // get tta details
        var payload = {
            'tta_guid': this.$route.query.tta_guid,
        }

        var pass_obj = {
            "dispatch": 'tta/trigger_get_tta',
            "getter": 'tta/get_tta',
            "app": this,
            "payload": payload,
        }

        var tta_details = await this.$dispatch(pass_obj);

        if(tta_details.status)
        {
            this.json = tta_details.response.data;

            // get previous tta
            if(this.json.previous_tta_guid != "" && this.proposal)
            {
                this.json.prev_tta = await this.getPrevTTA(this.json.previous_tta_guid);
            }

            // get company
            var payload = {
                'company_guid': this.json.company_guid,
            }

            var pass_obj = {
                "dispatch": 'general/trigger_get_company',
                "getter": 'general/get_company',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            if(response.status)
            {
                this.json.company = response.response.data;
            }

            // get supplier
            if(this.json.supplier_to)
            {
                var payload = {
                    'supplier_guid': this.json.supplier_to,
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_get_supplier',
                    "getter": 'general/get_supplier',
                    "app": this,
                    "payload": payload,
                }

                var response = await this.$dispatch(pass_obj);

                if(response.status)
                {
                    this.json.supplier = response.response.data;
                }
            }            

            // get distributor value
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_distributor_list',
                "getter": 'tta/get_distributor',
                "app": this,
                "payload": payload,
            }

            var distributor = await this.$dispatch(pass_obj);


            if(distributor.status)
            {
                const data = distributor.response.data;
                this.json.distributor = data.results;
            }

            // get division value
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_division_list',
                "getter": 'tta/get_division',
                "app": this,
                "payload": payload,
            }

            var division = await this.$dispatch(pass_obj);


            if(division.status)
            {
                const data = division.response.data;
                this.json.division = data.results;
            }

            // get concept (banner) value
            this.json.concept = {};
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_banner_list',
                "getter": 'tta/get_banner',
                "app": this,
                "payload": payload,
            }

            var banner = await this.$dispatch(pass_obj);


            if(banner.status)
            {
                const data = banner.response.data;
                this.json.concept = data.results;
            }

            // get tab for tta
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_tab_list',
                "getter": 'tta/get_tab',
                "app": this,
                "payload": payload,
            }

            var tta_tab = await this.$dispatch(pass_obj);

            if(tta_tab.status)
            {
                var ttaTab = tta_tab.response.data.results;
                for(var i in ttaTab)
                {
                    if(ttaTab[i].type == "TIR")
                    {
                        // get tier
                        var payload = {
                            params: {
                                'tta_guid': this.$route.query.tta_guid,
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_get_tta_tir_list',
                            "getter": 'tta/get_tir',
                            "app": this,
                            "payload": payload,
                        }

                        var tier = await this.$dispatch(pass_obj);

                        if(tier.status)
                        {
                            ttaTab[i].tab_article = tier.response.data.results;
                        }
                    }
                    else
                    {
                        // get article for tta tab
                        var payload = {
                            params: {
                                'tta_tab_guid': ttaTab[i].tta_tab_guid,
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_get_tta_tab_article_list',
                            "getter": 'tta/get_article',
                            "app": this,
                            "payload": payload,
                        }

                        var tab_article = await this.$dispatch(pass_obj);
                        
                        if(tab_article.status)
                        {
                            var tab_article_list = tab_article.response.data.results;
                            ttaTab[i].tab_article = tab_article_list;
                        }
                    }
                    
                }
            }
            this.json.tta_tab = ttaTab;

            // get condition of trade for tta
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_cot_list',
                "getter": 'tta/get_cot',
                "app": this,
                "payload": payload,
            }

            var tta_cot = await this.$dispatch(pass_obj);

            if(tta_cot.status)
            {
                this.json.conditionTrade = tta_cot.response.data.results[0];         
            }
        }
        console.log(this.json);
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.handlePrint();
            },500)
        })
        this.loading = false;
    },
    methods:{
        async getPrevTTA(guid)
        {
            var payload = {
                'tta_guid': guid,
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta',
                "getter": 'tta/get_tta',
                "app": this,
                "payload": payload,
            }

            var response = await this.$dispatch(pass_obj);

            var obj = {};
            if(!response.status)
            {
                this.showNotify('negative','Fail to load TTA details.');
                this.$router.push({name: 'tta'});
            }

            obj = response.response.data;

            // get tab for tta
            var payload = {
                params: {
                    'tta_guid': guid,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_tab_list',
                "getter": 'tta/get_tab',
                "app": this,
                "payload": payload,
            }

            var tta_tab = await this.$dispatch(pass_obj);

            if(tta_tab.status)
            {
                var ttaTab = tta_tab.response.data.results;
                for(var i in ttaTab)
                {
                    if(ttaTab[i].type == "TIR")
                    {
                        // get tier
                        var payload = {
                            params: {
                                'tta_guid': guid,
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_get_tta_tir_list',
                            "getter": 'tta/get_tir',
                            "app": this,
                            "payload": payload,
                        }

                        var tier = await this.$dispatch(pass_obj);

                        if(tier.status)
                        {
                            ttaTab[i].tab_article = tier.response.data.results;
                        }
                    }
                    else
                    {
                        // get article for tta tab
                        var payload = {
                            params: {
                                'tta_tab_guid': ttaTab[i].tta_tab_guid,
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_get_tta_tab_article_list',
                            "getter": 'tta/get_article',
                            "app": this,
                            "payload": payload,
                        }

                        var tab_article = await this.$dispatch(pass_obj);
                        
                        if(tab_article.status)
                        {
                            var tab_article_list = tab_article.response.data.results;
                            ttaTab[i].tab_article = tab_article_list;
                        }
                    }
                    
                }
            }
            obj.tta_tab = ttaTab;

            return obj;
        },
        formatAmount(value, type) {
            if (value === null || value === undefined) {
                return '';
            }

            value = Number(value);
            if (isNaN(value)) {
                console.error("Invalid value:", value);
                return '';
            }

            if (type === "$") {
                value = value.toFixed(2);
            } else if (type === "%") {
                value = value.toFixed(1);
            } else if (type === "qty") {
                value = value.toFixed(0);
            }

            const parts = value.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];

            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            const formattedNumber = numberPart.replace(thousands, ",");

            return formattedNumber + (decimalPart ? "." + decimalPart : "");
        },
        handlePrint()
        {
            window.onafterprint = () => {
                // this.$router.push({name: 'tta'});
            };
            window.print();
        },
        displayDate(date, format)
        {
            var curDate = new Date(date);
            var day = curDate.getDate();
            var month = curDate.getMonth() +1;
            var year = curDate.getFullYear();

            const formatRegex = /dd|mm|yyyy|yy/g;

            const formattedDate = format.replace(formatRegex, (match) => {
                switch (match) {
                    case 'dd': return day;
                    case 'mm': return month;
                    case 'yyyy': return year;
                    case 'yy': return year.slice(-2);
                    default: return match;
                }
            });

            return formattedDate;
        },
        displayText(value)
        {
            if(value)
            {
                return value;
            }
            return "";
        },
        showNotify(type, message) 
        {
            if(type == "negative")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 99999999999,
                    position: 'top',
                    actions: [
                        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
                    ],
                    badgeStyle: "opacity: 0",
                })
            }

            if(type == "positive")
            {
                Notify.create({
                    group: 'my-group',
                    type: type,
                    message: message,
                    html: true,
                    timeout: 1000,
                    position: 'top',
                    badgeStyle: "opacity: 0",

                })
            }

            if(type == "info")
            {
                    Notify.create({
                    type: type,
                    message: message,
                    timeout: 99999999,
                    position: 'top',
                    badgeStyle: "opacity: 0",
                    html: true,
                    actions: [
                        { label: 'OK', color: 'white', round: true, handler: () => { } }
                    ]
                })
            }
        },
    }
}
</script>

<style scoped>
.small_text
{
  font-size: 10px;
}

table
{
    font-size: 10px;
    width: 100%;
    border-collapse: collapse;
    background-color:white;
}

td {
  border: 1px solid #b2b5ba;
  padding: 2px 8px;
}

tr {
    height: 20px;
}

.no_break{
    page-break-inside: avoid;
}

.label_row{
    background: black;
    color: white;
}

@media print{
  /* @page {margin: 0.5cm; size: landscape} */
  @page {margin: 0.5cm; size: portrait; }
  body { margin: 1.6cm; }

  table tr:first-child {
    /* background-color: #e6e6e6; */
    -webkit-print-color-adjust: exact; /* Ensures background color is printed */
  }

  .header_row
  {
    padding: 3px !important;
    max-height: 15px;
  }

  .wider_col
  {
    width: 18%
  }
}
</style>