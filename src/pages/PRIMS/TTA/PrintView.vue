<template>
    <div class="bg-white">
        <div class="row justify-end q-pa-md">
            <q-btn icon="print" color="primary" text-color="white" @click="handlePrint"></q-btn>
        </div>
        <div id="report_print" v-if="!loading && json" class="q-pa-md">
            <div class="row small_text justify-between">
                <div class="col-8 text-bold text-left">
                    <div class="row" style="font-size:12px" v-for="company in json.company" :key="company">
                        <span>{{company}}</span>
                    </div>
                    <div v-if="preference.displayBanner" class="row" style="font-size:12px">
                        <span v-if="json.concept.length>0">{{json.concept.map(entry=>entry.banner).join(', ')}}</span>
                    </div>
                    <div class="row text-weight-light">
                        <span v-if="json.company.length>0">{{json.company_address ? json.company_address : ""}}</span>
                    </div>
                </div>
                <div class="col-2 text-bold">
                    <div>STRICTLY CONFIDENTIAL</div>
                    <div class="row text-weight-light"><span>Ref No: {{json.refno}}</span></div>
                    <div class="row text-weight-light"><span>Date: {{displayDate(json.effective_date_from,preference.dateFormat)}}</span></div>
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
                        <td style="width:20%">
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.code)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.code)}}</span>
                        </td>
                        <td><span>Vendor Name:</span></td>
                        <td colspan="3">
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.name)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.name)}}</span>
                        </td>
                    </tr>

                    <tr>
                        <td><span>Deduct From:</span></td>
                        <td><span>{{displayText(json.supplier_to_code)}}</span></td>
                        <td><span>Vendor Name:</span></td>
                        <td colspan="3"><span>{{displayText(json.supplier_ref)}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Company Reg. No:</span></td>
                        <td>
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.old_brn)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.old_brn)}}</span>
                        </td>
                        <td><span>Address:</span></td>
                        <td colspan="3">
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.address1)}} {{displayText(json.distributor_details.address2)}} {{displayText(json.distributor_details.address3)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.address1)}} {{displayText(json.supplier.address2)}} {{displayText(json.supplier.address3)}}</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><span>Division:</span></td>
                        <td><span>{{displayDivision}}</span></td>
                        <td><span>Tel No:</span></td>
                        <td style="width: 15%">
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.telephone)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.telephone)}}</span>
                        </td>
                        <td style="width: 15%"><span>Fax No:</span></td>
                        <td style="width: 15%">
                            <span v-if="json.distributor_details">{{displayText(json.distributor_details.fax_no)}}</span>
                            <span v-else-if="json.supplier">{{displayText(json.supplier.fax_no)}}</span>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2"><span>Total Purchase:</span></td>
                        <td><span>This Year (YTD ) - </span></td>
                        <td><span></span></td>
                        <td><span>Last Year (YTD) - </span></td>
                        <td><span></span></td>
                    </tr>

                    <tr>
                        <td colspan="2"><span></span></td>
                        <td><span>Last Year (Full Year) - </span></td>
                        <td><span></span></td>
                        <td><span>Last 2 Year (Full Year) - </span></td>
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
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta && json.prev_tta.effective_date_from">{{displayDate(json.prev_tta.effective_date_from,'yyyy')}}</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,'yyyy')}}</span></td>
                    </tr>

                    <tr>
                        <td><span>Trading Agreement No.</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{json.prev_tta.refno}}</span></td>
                        <td class="text-center" colspan="3"><span>{{json.refno}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Agreement Effective Date</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta && json.prev_tta.effective_date_from">{{displayDate(json.prev_tta.effective_date_from,preference.dateFormat)}}</span></td>
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,preference.dateFormat)}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Terms (From statement date)</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{json.prev_tta.settlement_term}}</span></td>
                        <td class="text-center" colspan="3"><span>{{json.settlement_term}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Discount</span></td>
                        <td class="text-center" colspan="3"><span v-if="json.prev_tta">{{formatAmount(json.prev_tta.settlement_discount,'%')}}</span></td>
                        <td class="text-center" colspan="3"><span>{{formatAmount(json.settlement_discount,'%')}}</span></td>
                    </tr>
                </table>
                
                <table v-for="(tab,index) in tableData" :key="index">
                    <tbody v-if="tab.header.component_type=='rate_purgrossnet_date' || tab.header.component_type=='rate_purgrossnet'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:30%"><span>%</span></td>
                            <td class="text-center" colspan="3" style="width:30%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.cur ? article.cur.name : article.prev.name}}</span></td>
                                    <td class="text-center" colspan="3">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '%' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '%' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="3">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '%' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '%' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type=='rate_cogsinvnet_date' || tab.header.component_type=='rate_cogsinvnet'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Calculated based on</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Calculated based on</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2">{{article.cur ? article.cur.name : article.prev.name}}</td>
                                    <td class="text-center" colspan="1"><span v-if="article.prev && article.prev_visible == 1">{{toNormalCase(article.prev.remark1)}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '$' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '$' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '%' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '%' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1"><span v-if="article.cur && article.cur_visible == 1">{{toNormalCase(article.cur.remark1)}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '$' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '$' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '%' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '%' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type=='dollar_rate_remark'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="2" style="width:20%"><span>Store Type</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>Store Type</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2">{{article.cur ? article.cur.name : article.prev.name}}</td>
                                    <td class="text-center" colspan="2"><span v-if="article.prev && article.prev_visible == 1">{{toNormalCase(article.prev.remark1)}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '$' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '$' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="2"><span v-if="article.cur && article.cur_visible == 1">{{toNormalCase(article.cur.remark1)}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '$' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '$' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                    
                    <tbody v-else-if="tab.header.component_type=='dollar_rate'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:30%"><span>Amount</span></td>
                            <td class="text-center" colspan="3" style="width:30%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2">{{article.cur ? article.cur.name : article.prev.name}}</td>
                                    <td class="text-center" colspan="3">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '$' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '$' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="3">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '$' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '$' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type=='months_rate_percentage' || tab.header.component_type=='days_rate_percentage' || tab.header.component_type=='promotion_percentage_amount'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2">{{article.cur ? article.cur.name : article.prev.name}}</td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == 'month' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == 'month' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '$' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '$' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '%' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '%' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == 'month' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == 'month' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '$' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '$' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '%' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '%' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type=='promotion_percentage'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width:10%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td colspan="2"><span>{{article.cur ? article.cur.name : article.prev.name}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == 'month' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == 'month' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="2">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '%' ? 
                                            formatAmount(article.prev.value1,article.prev.option1) : article.prev.option2 == '%' ? 
                                            formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == 'month' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == 'month' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="2">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '%' ? 
                                            formatAmount(article.cur.value1,article.cur.option1) : article.cur.option2 == '%' ? 
                                            formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type=='tir'">
                        <tr class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Growth %</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Growth Target</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Growth %</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Growth Target</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <tr>
                                <td class="text-right" colspan="2"><span>{{index+1}}st Tier</span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span></span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span v-if="article.prev">{{article.prev.rebate_to == null ? "Onwards" : formatAmount(article.prev.rebate_to,'$')}}</span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span v-if="article.prev">{{formatAmount(article.prev.rate,'%')}}</span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span></span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span v-if="article.cur">{{article.cur.rebate_to == null ? "Onwards" : formatAmount(article.cur.rebate_to,'$')}}</span></td>
                                <td class="text-center" colspan="1" style="width: 10%"><span v-if="article.cur">{{formatAmount(article.cur.rate,'%')}}</span></td>
                            </tr>
                        </template>
                    </tbody>

                    <tbody v-else-if="tab.header.component_type == 'target_ratetype_rate_remark'">
                        <tr v-if="tab.rows.length>0 && tab.rows.map(entry=>entry.cur_visible || entry.prev_visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.header.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Site Group</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Site Group</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 10%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.rows" :key="index">
                            <template v-if="article.cur_visible == 1 || article.prev_visible == 1">
                                <tr>
                                    <td rowspan="2">{{article.cur ? article.cur.name : article.prev.name}}</td>
                                    <td>{{article.cur ? article.cur.remark1 : article.prev.remark1}}</td>
                                    <td rowspan="2" class="text-center" colspan="1"><span v-if="article.prev && article.prev_visible == 1">{{billing_type_list.find(entry=>entry.value == article.prev.billing_type).label}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '$' ? formatAmount(article.prev.value1,article.prev.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev && article.prev_visible == 1">
                                        {{
                                            article.prev.option1 == '%' ? formatAmount(article.prev.value1,article.prev.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td rowspan="2" class="text-center" colspan="1"><span v-if="article.cur && article.cur_visible == 1">{{billing_type_list.find(entry=>entry.value == article.cur.billing_type).label}}</span></td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '$' ? formatAmount(article.cur.value1,article.cur.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur && article.cur_visible == 1">
                                        {{
                                            article.cur.option1 == '%' ? formatAmount(article.cur.value1,article.cur.option1) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{article.cur ? article.cur.remark2 : article.prev.remark2}}</td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev">
                                        {{
                                            article.prev.option2 == '$' ? formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.prev">
                                        {{
                                            article.prev.option2 == '%' ? formatAmount(article.prev.value2,article.prev.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur">
                                        {{
                                            article.cur.option2 == '$' ? formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                    <td class="text-center" colspan="1">
                                        <span v-if="article.cur">
                                        {{
                                            article.cur.option2 == '%' ? formatAmount(article.cur.value2,article.cur.option2) : ""
                                        }}
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                    <tbody v-if="index == (tableData.length-1)">
                        <tr>
                            <td colspan="2" style="width:40%">Remarks</td>
                            <td class="text-left" colspan="3" style="width: 30%"><span v-if="json.prev_tta">{{json.prev_tta.remarks}}</span></td>
                            <td class="text-left" colspan="3" style="width: 30%"><span>{{json.remarks}}</span></td>
                        </tr>
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
                        <td class="text-center" colspan="3"><span>{{displayDate(json.effective_date_from,preference.dateFormat)}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Terms (From statement date)</span></td>
                        <td class="text-center" colspan="3"><span>{{json.settlement_term}}</span></td>
                    </tr>
                    
                    <tr>
                        <td><span>Settlement Discount</span></td>
                        <td class="text-center" colspan="3"><span>{{formatAmount(json.settlement_discount,'%')}}</span></td>
                    </tr>
                </table>
                    
                <table v-for="(tab,index) in json.tta_tab" :key="index">
                    <tbody v-if="tab.component_type=='rate_purgrossnet_date' || tab.component_type=='rate_purgrossnet'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="3" style="width:60%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
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

                    <tbody v-else-if="tab.component_type=='rate_cogsinvnet_date' || tab.component_type=='rate_cogsinvnet'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:20%"><span>Calculated based on</span></td>
                            <td class="text-center" style="width:20%"><span>Amount</span></td>
                            <td class="text-center" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center"><span>{{toNormalCase(article.remark1)}}</span></td>
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

                    <tbody v-else-if="tab.component_type=='dollar_rate_remark'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:40%"><span>Store Type</span></td>
                            <td class="text-center" style="width:20%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center"><span>{{toNormalCase(article.remark1)}}</span></td>
                                    <td class="text-center">
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

                    <tbody v-else-if="tab.component_type=='dollar_rate'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:60%"><span>Amount</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center">
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

                    <tbody v-else-if="tab.component_type=='months_rate_percentage' || tab.component_type=='days_rate_percentage' || tab.component_type=='promotion_percentage_amount'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" style="width:20%"><span>Period (in Month)</span></td>
                            <td class="text-center" style="width:20%"><span>Amount</span></td>
                            <td class="text-center" style="width:20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
                                <tr>
                                    <td colspan="2">{{article.name}}</td>
                                    <td class="text-center">
                                        <span>
                                        {{
                                            article.option1 == 'month' ? 
                                            formatAmount(article.value1,article.option1) : article.option2 == 'month' ? 
                                            formatAmount(article.value2,article.option2) : ""
                                        }}
                                        </span>
                                    </td>
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

                    <tbody v-else-if="tab.component_type=='promotion_percentage'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width:20%"><span>Period (in Month)</span></td>
                            <td class="text-center" colspan="2" style="width:40%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
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

                    <tbody v-else-if="tab.component_type=='tir'">
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

                    <tbody v-else-if="tab.component_type == 'target_ratetype_rate_remark'">
                        <tr v-if="tab.tab_article.length>0 && tab.tab_article.map(entry=>entry.visible).includes(1)" class="label_row">
                            <td colspan="2" style="width:40%">{{`${index+1}) ${tab.tab_info.name}`}}</td>
                            <td class="text-center" colspan="1" style="width: 20%"><span>Site Group</span></td>
                            <td class="text-center" colspan="1" style="width: 20%"><span>Amount</span></td>
                            <td class="text-center" colspan="1" style="width: 20%"><span>%</span></td>
                        </tr>
                        <template v-for="(article,index) in tab.tab_article" :key="index">
                            <template v-if="article.visible == 1">
                                <tr>
                                    <td rowspan="2">{{article.name}}</td>
                                    <td>{{article.remark1}}</td>
                                    <td rowspan="2" class="text-center">{{billing_type_list.find(entry=>entry.value == article.billing_type).label}}</td>
                                    <td class="text-center" colspan="1">
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
                                    <td class="text-center" colspan="1">
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
                        </template>
                    </tbody>

                    <tbody v-if="index == (json.tta_tab.length-1)">
                        <tr>
                            <td colspan="2" style="width:40%">Remarks</td>
                            <td class="text-left" colspan="3" style="width: 60%"><span>{{json.remarks}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row q-my-md q-gutter-sm small_text no_break">
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
                        <div class="col-4"><span>{{distributor.code}}</span></div>
                        <div class="col-6"><span>{{distributor.name}}</span></div>
                    </div>
                </div>
            </div>

            <div class="row q-mt-xl q-mb-md small_text no_break" v-if="json.conditionTrade">
                <div v-html="json.conditionTrade.cot_info.cot_value"></div>
            </div>

            <div class="row no_break">
                <table>
                    <tr v-if="json.concept">
                        <td class="text-center" colspan="3"><span>For and on behalf of<br/>{{json.company.join(' & ')}}</span></td>
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
                            <div class="q-gutter-sm" style="height: 30%"><span>Designation:</span><span v-if="json.issued_designation">{{json.issued_designation}}</span></div>
                            <div class="q-gutter-sm" style="height: 30%"><span>Date:</span><span>{{displayDate(json.issued_date,preference.dateFormat)}}</span></div>
                        </td>
                        <td style="height: 100px">
                            <div class="q-gutter-sm" style="height:30%"><span>Name:</span><span>{{json.authorised_by}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Designation:</span><span v-if="json.authorised_designation">{{json.authorised_designation}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Date:</span><span>{{displayDate(json.authorised_date,preference.dateFormat)}}</span></div>
                        </td>
                        <td style="height:100px">
                            <div class="q-gutter-sm" style="height:30%"><span>Name:</span><span>{{json.approve_by}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Designation:</span><span v-if="json.approved_designation">{{json.approved_designation}}</span></div>
                            <div class="q-gutter-sm" style="height:30%"><span>Date:</span><span>{{displayDate(json.approve_date,preference.dateFormat)}}</span></div>
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
            preference: {},
            json: {},
            tableData: [],
            billing_type_list: [{value:'monthly',label:'Monthly'},{value:'quarterly',label:'Quarterly'},{value:'half-year',label:'Half Year'},{value:'yearly',label:'Yearly'},{value:'end_of_tta',label:'End of TTA'}],
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
            'params': {
                'view': 'print_tta',
            }
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
            if(this.proposal)
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
                const data = response.response.data
                this.json.company_address = `${data.address_1} ${data.address_2} ${data.address_3} ${data.address_4} ${data.address_5}`;
                if(!localStorage.getItem("preference_setting"))
                {
                    this.preference = {
                        "dateFormat": data.date_format_setting,
                        "default_date_to": data.date_to_setting,
                        "division_setting": data.division_setting == 1 ? true : false,
                        "banner_setting": data.banner_option_setting,
                        "displayBanner": data.display_banner_setting == 1 ? true : false,
                        "settlement_discount_setting": data.settlement_discount_setting == 1 ? true : false,
                    };
                    localStorage.setItem("preference_setting", JSON.stringify(this.preference));
                }
                else
                {
                    this.preference = JSON.parse(localStorage.getItem("preference_setting"));
                }
            }

            // get supplier
            var guids = [];
            if(this.json.supplier_to)
            {
                guids.push(this.json.supplier_to);
            }

            if(this.$route.query.supplier && this.$route.query.supplier != "")
            {
                guids.push(this.$route.query.supplier);
            }

            if(guids.length>0)
            {
                var payload = {
                    params: {
                        'supplier_guid__in': guids.join(','),
                    }
                }

                var pass_obj = {
                    "dispatch": 'general/trigger_get_supplier_list',
                    "getter": 'general/get_supplier',
                    "app": this,
                    "payload": payload,
                }

                var list = await this.$dispatch(pass_obj);

                if(list.status)
                {
                    if(this.json.supplier_to)
                    {
                        var supplier = list.response.data.results.find(entry=>entry.supplier_guid == this.json.supplier_to)
                        if(supplier)
                        {
                            this.json.supplier = supplier;
                        }
                    }

                    if(this.$route.query.supplier && this.$route.query.supplier != "")
                    {
                        var supplier = list.response.data.results.find(entry=>entry.supplier_guid == this.$route.query.supplier)
                        if(supplier)
                        {
                            this.json.distributor_details = supplier;
                        }
                    }
                }
            }        

            // get distributor value
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                    'limit': 99999,
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
                    'limit': 99999,
                    'ordering': 'division_guid__code,dept_guid__code,subdept_guid__code,category_guid__code',
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
                // this.json.division.sort((a,b) => a.action_description - b.action_description);
            }

            // get concept (banner) value
            this.json.concept = {};
            var payload = {
                params: {
                    'tta_guid': this.$route.query.tta_guid,
                    'limit': 99999,
                    'view': 'banner',
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
                    'ordering': 'number',
                    'limit': 99999,
                }
            }

            var pass_obj = {
                "dispatch": 'tta/trigger_get_tta_tab_list',
                "getter": 'tta/get_tab',
                "app": this,
                "payload": payload,
            }

            var tta_tab = await this.$dispatch(pass_obj);

            this.json.tta_tab = [];
            if(tta_tab.status)
            {
                var ttaTab = tta_tab.response.data.results;
                ttaTab.sort((a,b)=> a.tab_info.number - b.tab_info.number);
                for(const curTab of ttaTab)
                {
                    if(curTab.component_type == "tir")
                    {
                        // get tier
                        var payload = {
                            params: {
                                'tta_guid': this.$route.query.tta_guid,
                                'ordering': 'tier_no',
                            }
                        }

                        var pass_obj = {
                            "dispatch": 'tta/trigger_get_tta_tir_list',
                            "getter": 'tta/get_tir',
                            "app": this,
                            "payload": payload,
                        }

                        var tier = await this.$dispatch(pass_obj);
                        tier.status ? curTab.tab_article = tier.response.data.results : curTab.tab_article = [];
                    }
                    else
                    {
                        // get article for tta tab
                        curTab.tab_article = curTab.articles;
                        curTab.tab_article.sort((a,b)=> a.tab_article_info.number - b.tab_article_info.number);
                        // var payload = {
                        //     params: {
                        //         'tta_tab_guid': curTab.tta_tab_guid,
                        //     }
                        // }

                        // var pass_obj = {
                        //     "dispatch": 'tta/trigger_get_tta_tab_article_list',
                        //     "getter": 'tta/get_article',
                        //     "app": this,
                        //     "payload": payload,
                        // }

                        // var tab_article = await this.$dispatch(pass_obj);
                        
                        // if(tab_article.status)
                        // {
                        //     var tab_article_list = tab_article.response.data.results;
                        //     curTab.tab_article = tab_article_list;
                        // }
                    }
                }
                this.json.tta_tab = ttaTab;
            }

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
            
            // get issued user, authorised user, approved user
            var user_guid = [];
            if(this.json.issued_user)
            {
                user_guid.push(this.json.issued_user);
            }
            
            if(this.json.authorised_user)
            {
                user_guid.push(this.json.authorised_user);
            }

            if(this.json.approved_user)
            {
                user_guid.push(this.json.approved_user);
            }

            var payload = {
                params: {
                    'user_info_guid__in': user_guid.join(','),
                }
            }

            var pass_obj = {
                "dispatch": 'user/trigger_get_user_info_list',
                "getter": 'user/get_user_info',
                "app": this,
                "payload": payload,
            }

            var users = await this.$dispatch(pass_obj);

            if(users.status)
            {
                var user = users.response.data.results.find(entry=>entry.user_info_guid == this.json.issued_user)
                if(user)
                {
                    this.json.issued_designation = user.user_designation.name;
                }
                
                user = users.response.data.results.find(entry=>entry.user_info_guid == this.json.approved_user)
                if(user)
                {
                    this.json.approved_designation = user.user_designation.name;
                }

                user = users.response.data.results.find(entry=>entry.user_info_guid == this.json.authorised_user)
                if(user)
                {
                    this.json.authorised_designation = user.user_designation.name;
                }
            }

            // sync array for prev and current tab and tab article
            if(this.json.prev_tta)
            {
                const unique_tab = [...new Set([...this.json.prev_tta.tta_tab.map(obj => obj.tab_guid), ...this.json.tta_tab.map(obj => obj.tab_guid)])];
                const all_tabs = this.json.prev_tta.tta_tab.concat(this.json.tta_tab);

                const getArticles = (guid, array) => {
                    const obj = array.find(item => {
                        return item.tab_guid === guid;
                    });                    
                    return obj ? obj.tab_article : [];
                };

                var tableData = unique_tab.map(guid => {
                    const header = all_tabs.find(entry=>entry.tab_guid == guid);
                    const cur_article = getArticles(guid, this.json.tta_tab);
                    const prev_article = getArticles(guid, this.json.prev_tta.tta_tab);
                    if(header.component_type == 'tir')
                    {
                        const unique_articles = [...new Set([...cur_article.map(obj => obj.tier_no), ...prev_article.map(obj => obj.tier_no)])];
                        return {
                            header: header,
                            rows: unique_articles.map(article => ({
                                article,
                                cur: cur_article.map(entry=>entry.tier_no).includes(article) ? cur_article.find(entry=>entry.tier_no == article) : false,
                                prev: prev_article.map(entry=>entry.tier_no).includes(article) ? prev_article.find(entry=>entry.tier_no == article) : false,
                            })),
                        };
                    }
                    else
                    {
                        const unique_articles = [...new Set([...cur_article.map(obj => obj.tab_article_guid), ...prev_article.map(obj => obj.tab_article_guid)])];
                        return {
                            header: header,
                            rows: unique_articles.map(article => ({
                                article,
                                cur: cur_article.map(entry=>entry.tab_article_guid).includes(article) ? cur_article.find(entry=>entry.tab_article_guid == article) : false,
                                prev: prev_article.map(entry=>entry.tab_article_guid).includes(article) ? prev_article.find(entry=>entry.tab_article_guid == article) : false,
                                cur_visible: cur_article.map(entry=>entry.tab_article_guid).includes(article) ? cur_article.find(entry=>entry.tab_article_guid == article).visible : 0,
                                prev_visible: prev_article.map(entry=>entry.tab_article_guid).includes(article) ? prev_article.find(entry=>entry.tab_article_guid == article).visible : 0,
                            })),
                        };
                    }
                })
                this.tableData = await Promise.all(tableData);
                this.tableData.sort((a,b)=> a.header.tab_info.number - b.header.tab_info.number);
                this.tableData.map(tab => {
                    if(tab.rows.lenght>0 && tab.rows[0].cur.tab_article_info)
                    {
                        tab.rows.sort((a,b) => {
                            return a.cur.tab_article_info.number - b.cur.tab_article_info.number
                        })
                    }
                    else if(tab.rows.lenght>0 && tab.rows[0].cur.tier_no)
                    {
                        tab.rows.sort((a,b) => {
                            return a.cur.tier_no - b.cur.tier_no
                        })
                    }
                })
                // console.log(this.tableData);
            }
        }
        else
        {
            this.showNotify('negative','Unable to obtain TTA details.');
            this.$router.push({name: 'tta'});
        }
        // console.log(this.json);
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
            if(guid == "" || guid == null || !guid)
            {
                const obj = {
                    tta_tab: [],
                }
                return  obj;
            }

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

            var ttaTab = [];
            if(tta_tab.status)
            {
                ttaTab = tta_tab.response.data.results;
                // ttaTab.sort((a,b)=> a.tab_info.number - b.tab_info.number);
                for(var i in ttaTab)
                {
                    if(ttaTab[i].component_type == "tir")
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
                        else
                        {
                            ttaTab[i].tab_article = [];
                        }
                    }
                    else
                    {
                        // get article for tta tab
                        ttaTab[i].tab_article = ttaTab[i].articles;
                        // var payload = {
                        //     params: {
                        //         'tta_tab_guid': ttaTab[i].tta_tab_guid,
                        //     }
                        // }

                        // var pass_obj = {
                        //     "dispatch": 'tta/trigger_get_tta_tab_article_list',
                        //     "getter": 'tta/get_article',
                        //     "app": this,
                        //     "payload": payload,
                        // }

                        // var tab_article = await this.$dispatch(pass_obj);
                        
                        // if(tab_article.status)
                        // {
                        //     var tab_article_list = tab_article.response.data.results;
                        //     ttaTab[i].tab_article = tab_article_list;
                        // }
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
            // window.onafterprint = () => {
            //     this.$router.go(-1);
            // };
            window.print();
        },
        displayDate(date, format)
        {
            if(!date || date == "") return "";

            var curDate = new Date(date);
            var day = curDate.getDate();
            var month = curDate.getMonth() +1;
            var year = curDate.getFullYear();

            const formatRegex = /dd|mm|yyyy|yy/g;

            const formattedDate = format.toLowerCase().replace(formatRegex, (match) => {
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
        toNormalCase(str) {
            switch (str) {
                case 'consignment':
                    return 'COGS';
                case 'net_sales':
                    return 'Net Sales';
                default:
                    return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
            }
            
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

  table 
  {
    width: 100%;
    border-collapse: collapse; 
  }
  
  tbody
  {
    page-break-inside: avoid;
  }
  
  tr
  {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
</style>