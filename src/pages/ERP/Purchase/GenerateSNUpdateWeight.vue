<template>
  <div class="card_sides">
    <q-card style="max-height: 100%;">
      <q-card-section class="theme_color dialog_header header_top">
          <div class="intermediate"/>
          <div v-if="page_function == 'GenerateSN'" class="text-h6 header_text">Generate SN</div>
          <div v-if="page_function == 'UpdateWeight'" class="text-h6 header_text">Update SN</div>
          <div v-if="page_function == 'InsertSN'" class="text-h6 header_text">Insert SN</div>
      </q-card-section>

      <!-- style="max-height: 80vh;" -->
      <q-card-section class="upload_container content_body_dialog" >
        <q-form ref="save_create_dept_form">
          <div  v-for="(row,index) in json.itemcode" :key="index">
          <div class="row upload_separator_first">
            <!-- <div class="offset-sm-2 offset-md-3 offset-lg-4 col-xs-12 col-sm-8 col-md-6 col-lg-4 col-xl-4"> -->
              <div v-if="$q.screen.width < 895" class="row dialog_content">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle1"><b>Itemcode: </b> {{ row }}</div>

                <div v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">No.</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <LabelTable
                          :text="row.count"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Serial No.</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <LabelTable
                          :text="row.lot_number"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"></div> -->

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left_side">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Weight</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChangeWeight(row.weight, index, i)"
                          v-model="row.weight"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Cost</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <LabelTable
                          :text="row.cost"
                          class="text-right"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left_side">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Length(cm)</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChangeLength(row.length, index, i)"
                          v-model="row.length"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Size</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChangeSize(row.size, index, i)"
                          v-model="row.size"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left_side">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">WS Cost</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChangeWsCost(row.ws_cost, index, i)"
                          v-model="row.ws_cost"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 left_side">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">WS Cost(S)</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChangeWsCostSell(row.ws_cost_sell, index, i)"
                          v-model="row.ws_cost_sell"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <span class="dialog_font">Vendor Article</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <Input
                          :autofocusclick="true"
                          :no_label="true"
                          :readonly="page_function == 'InsertSN'"
                          v-on:change="handleChange"
                          v-model="row.vendor_article"
                          :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-subtitle1"><b>Itemcode: </b> {{ row }}</div>
                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 left_side ">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">No.</span>
                      </div>
                      <div v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <LabelTable
                        :text="row.count"
                        class="text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 left_side ">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Serial No.</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <LabelTable
                        :text="row.lot_number"
                        class="text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 left_side ">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Weight(g)</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChangeWeight(row.weight, index, i)"
                        v-model="row.weight"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 left_side ">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Cost</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <LabelTable
                        :text="row.cost"
                        class="text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-2 col-xl-2 left_side">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">WS Cost</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChangeWsCost(row.ws_cost, index, i)"
                        v-model="row.ws_cost"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-2 col-md-2 col-lg-2 col-xl-2 left_side">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <span class="dialog_font">WS Cost(S)</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChangeWsCostSell(row.ws_cost_sell, index, i)"
                        v-model="row.ws_cost_sell"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 left_side">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Length(cm)</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChangeLength(row.length, index, i)"
                        v-model="row.length"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 left_side">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Size</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChangeSize(row.size, index, i)"
                        v-model="row.size"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text_right : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-1 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        <span class="dialog_font">Vendor Article</span>
                      </div>
                      <div  v-for="(row,i) in json.details[index]" :key="i" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 dialog_separator">
                        <Input
                        :autofocusclick="true"
                        :no_label="true"
                        :readonly="page_function == 'InsertSN'"
                        v-on:change="handleChange"
                        v-model="row.vendor_article"
                        :dbComponentBehavior="dbComponentBehavior ? dbComponentBehavior.text : oridbComponentBehavior.text" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- </div> -->
          </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions class="dialog_action" align="right">
          <Button_icon :flat="true" :font_color="'black'" :color="'white'" :text="'BACK'" :outline="true" size="15px" class="custom_cancel_button" @click="this.$router.go(-1)" />

          <Button_icon :flat="true" :font_color="'white'" :color="'#094161'" :text="'SAVE'" :outline="false" size="15px"
          v-on:receiveClick="handleCreateDepartmentSave"/>
      </q-card-actions>

      <q-inner-loading
        :showing="showAddLoading"
        color="primary"
      />

    </q-card>
  </div>
</template>

<script>
import Input from 'src/components/IMS/Base/Input'
import Button_icon from 'src/components/IMS/Base/Button_icon'
import { Notify } from "quasar";
import LabelTable from 'src/components/IMS/Base/LabelTable'

export default{
  data() {
    return {
      json: {
        itemcode: [],
        details: [],
      },
      showAddLoading: false,
      retailer_guid: sessionStorage.getItem("retailer_guid") != "" && sessionStorage.getItem("retailer_guid") != "null" && sessionStorage.getItem("retailer_guid") != null ? sessionStorage.getItem("retailer_guid") : [],
      outlet_guid: sessionStorage.getItem("outlet_guid") != "" && sessionStorage.getItem("outlet_guid") != "null" && sessionStorage.getItem("outlet_guid") != null ? sessionStorage.getItem("outlet_guid") : [],
      user_name: sessionStorage.getItem("user_name") != "" && sessionStorage.getItem("user_name") != "null" && sessionStorage.getItem("user_name") != null ? sessionStorage.getItem("user_name") : [],
      guid: "",
      page_function: this.$route.name,
    }
  },
  components:{
    Input,
    // Select,
    // Datepicker,
    // Checkbox,
    Button_icon,
    LabelTable,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('ims')
    },
  },
  async created () {
    var details_id = this.$route.query.details_id;

    if(details_id == undefined || details_id == '')
    {
      this.$router.push('GoodsReceiving')
      return;
    }

    this.showAddLoading = true;

    this.guid = (details_id).split(',');
    var ary = [];

    for(var i in this.guid)
    {
      var small_ary = [];
      var obj = {};

      var params = {
        transchild_guid: this.guid[i]
      }

      var payload = {
        params: params
      }

      var child_result = await this.getGrchild(payload);

      this.json.itemcode.push(child_result.item_guid.itemcode);

      var params = {
        trans_child: this.guid[i],
      }

      var payload = {
        params: params
      }

      var results = await this.getSn(payload);

      for(var i in results)
      {
        obj = {
          count: Number(i)+1,
          serial_guid: results[i].serial_guid,
          lot_number: results[i].lot_number,
          weight: this.formatAmount(results[i].weight,'$'),
          cost: this.formatAmount(results[i].cost,'$'),
          ws_cost: this.formatAmount(results[i].ws_cost,'$'),
          ws_cost_sell: this.formatAmount(results[i].ws_cost_sell,'$'),
          length: this.formatAmount(results[i].length,'qty'),
          size: this.formatAmount(results[i].size,'%'),
          vendor_article: results[i].vendor_article,
          child_weight: child_result.weight,
          child_total_price: child_result.total_price,
          child_total_ws_cost: child_result.ws_cost,
        }

        small_ary.push(obj);
      }

      ary.push(small_ary);
    }

    this.json.details = ary;
    this.showAddLoading = false;
  },
  methods: {
      async getGrchild(payload)
      {
        return await this.$store.dispatch('purchase/trigger_ts_grchild', payload).then(async() => {
            var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_grchild']));
            return data.data.results[0];
        });
      },
      async getSn(payload)
      {
        payload.params.outlet_guid = this.outlet_guid;

        return await this.$store.dispatch('purchase/trigger_ts_sn', payload).then(() => {
          var data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_ts_sn']));
          return data.data.results;
        });
      },
      handleChangeWsCost(newVal, index, i)
      {
        console.log(this.json.details[index][i].ws_cost)
        this.json.details[index][i].ws_cost = this.formatAmount(newVal, '$');
      },
      handleChangeWsCostSell(newVal, index, i)
      {
        console.log(this.json.details[index][i].ws_cost_sell)
        this.json.details[index][i].ws_cost_sell = this.formatAmount(newVal, '$');
      },
      handleChangeLength(newVal, index, i)
      {
        this.json.details[index][i].length = this.formatAmount(newVal, 'qty');
      },
      handleChangeSize(newVal, index, i)
      {
        this.json.details[index][i].size = this.formatAmount(newVal, '%');
      },
      handleChangeWeight(newVal, index, i)
      {
        var weight = parseFloat(newVal).toFixed(2);
        var child_weight = parseFloat(this.json.details[index][i].child_weight).toFixed(2);
        var child_total_price = parseFloat(this.json.details[index][i].child_total_price).toFixed(2);
        var child_total_ws_cost = parseFloat(this.json.details[index][i].child_total_ws_cost).toFixed(2);
        var cost = parseFloat((child_total_price * weight)/child_weight).toFixed(2);
        var ws_cost = (child_total_ws_cost * weight)/child_weight;
        ws_cost = Math.round(ws_cost * 100) / 100;
        console.log('cost = (',child_total_price, '*', weight, ')/', child_weight);
        console.log('ws_cost = (',child_total_ws_cost, '*', weight, ')/', child_weight);

        this.json.details[index][i].cost = this.formatAmount(cost,'$');
        this.json.details[index][i].ws_cost = this.formatAmount(ws_cost,'$');
        this.json.details[index][i].ws_cost_sell = this.formatAmount(ws_cost,'$');
        this.json.details[index][i].weight = this.formatAmount(weight,'$');
      },
      unformatAmount(value,type)
      {
        value = value.toString();

        if(type == "$")
        {
            var value = Number(value).toFixed(2);
        }
        else if(type == "%")
        {
            var value = Number(value).toFixed(1);
        }
        else if(type == "qty")
        {
            var value = Number(value).toFixed(0);
        }
        else
        {
            var value = value;
        }

        return value.replaceAll(',','')
      },
      async handleCreateDepartmentSave(){
        this.showAddLoading = true;

        var data = {};
        var serial_ary = [];

        for(var index in this.json.details)
        {
          var ary = this.json.details[index];
          for(var i in ary)
          {
            var serial_guid = ary[i].serial_guid;
            var weight = this.unformatAmount(ary[i].weight);
            var ws_cost = this.unformatAmount(ary[i].ws_cost);
            var ws_cost_sell = this.unformatAmount(ary[i].ws_cost_sell);
            var length = this.unformatAmount(ary[i].length);
            var size = this.unformatAmount(ary[i].size);
            var vendor_article = ary[i].vendor_article;

            var payload = {
              serial_guid: serial_guid,
              weight: weight,
              ws_cost: ws_cost,
              ws_cost_sell: ws_cost_sell,
              length: length,
              size: size,
              vendor_article: vendor_article,
              updated_by: this.user_name
            };

            await this.$store.dispatch('purchase/trigger_update_sn_weight', payload).then(() => {
              data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_update_sn_weight']));
              serial_ary.push(data.response.document);
            });
          }
        }

        if(data.status == "success")
        {
          this.$nextTick(async ()=>{
            var data = {};

            // for(var index in serial_ary)
            // {
            //   var serial_guid = serial_ary[index];

            //   var payload = {
            //     serial_guid: serial_guid,
            //     updated_by: this.user_name
            //   };

            //   await this.$store.dispatch('purchase/trigger_update_sn_cost_unit', payload).then(() => {
            //     data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_update_sn_cost_unit']));
            //   });
            // }

            for(var index in this.guid)
            {
              var transchild_guid = this.guid[index];

              var payload = {
                transchild_guid: transchild_guid,
                updated_by: this.user_name
              };

              await this.$store.dispatch('purchase/trigger_update_sn_cost_all', payload).then(() => {
                data = JSON.parse(JSON.stringify(this.$store.getters['purchase/get_update_sn_cost_all']));
              });
            }

            if(data.status == "success")
            {
                var ary = [];

                for(var i in this.guid)
                {

                  var small_ary = [];
                  var obj = {};

                  var params = {
                    trans_child: this.guid[i],
                  }

                  var payload = {
                    params: params
                  }

                  var results = await this.getSn(payload);

                  for(var i in results)
                  {
                    obj = {
                      count: Number(i)+1,
                      serial_guid: results[i].serial_guid,
                      lot_number: results[i].lot_number,
                      weight: this.formatAmount(results[i].weight,'$'),
                      vendor_article: results[i].vendor_article,
                      cost: this.formatAmount(results[i].cost,'$'),
                      ws_cost: this.formatAmount(results[i].ws_cost,'$'),
                      ws_cost_sell: this.formatAmount(results[i].ws_cost_sell,'$'),
                      length: this.formatAmount(results[i].length,'qty'),
                      size: this.formatAmount(results[i].size,'%'),
                    }

                    small_ary.push(obj);
                  }

                  ary.push(small_ary);
                }

                this.json.details = ary;

                this.showAddLoading = false;

                var payload = {
                  params: {
                    transchild_guid: this.guid[0]
                  }
                }

                var results = await this.getGrchild(payload);
                var transmain_guid = results.transmain_guid.transmain_guid;

                this.$router.push({
                  name: 'EditGoodsReceiving',
                  query: { header_id: transmain_guid }
                })

                this.showNotify("positive", "SN updated successfully");
            }
            else
            {
              this.showNotify("negative",data.response.message);
              this.showAddLoading = false;
            }
          });
        }
        else
        {
          this.showNotify("negative",data.response.message);
          this.showAddLoading = false;
        }

      },
      formatAmount(value, type)
      {
          if(type == "$")
          {
              var value = Number(value).toFixed(2);
          }
          else if(type == "%")
          {
              var value = Number(value).toFixed(1);
          }
          else if(type == "qty")
          {
              var value = Number(value).toFixed(0);
          }
          else
          {
              var value = value;
          }

          var parts = value.toString().split(".");
          const numberPart = parts[0];
          const decimalPart = parts[1];
          const thousands = /\B(?=(\d{3})+(?!\d))/g;
          // return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

          return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
      },
      async validate_form(form_name = "")
      {
          var form_name = form_name;
          var error = 0;
          await this.$refs[form_name].validate().then(valid => {
              if (!valid) {
                  error = 1;
              }
          });

          var error = error == 1 ? false : true;
          //true is no error false is got error

          return new Promise((resolve, reject) => {
          // setTimeout(() => {
              resolve(error);
          // }, 2000);
          });

      },
      showNotify(type, message) {
          Notify.create({
              type: type,
              message: message,
              timeout: 1000,
              position: 'top',
              html: true,
          })
      },
  },
}
</script>

<style scoped>
@media screen and (min-width: 506px) and (max-width: 894px) {
  .dialog_content
  {
    padding-left: 25%;
    padding-right: 25%;
  }
}

.left_side
{
  padding-right: 1%;
}
.right_side
{
  padding-left: 1%;
}

.dialog_action
{
  height: 55px;
  position: sticky;
  padding:0px;
  padding-right: 20px;
  bottom: 0px;
  background-color: white;
}
.header_top
{
  position: sticky;
  top: 50px;
  z-index: 2;
  padding:0px;
}

.intermediate
{
  padding: 0px;
  width: 100%;
  height: 5px;
  background-color:#ededed;
}

.header_text
{
  padding-left: 16px;
  padding-right: 16px;
}
.card_sides
{
  padding-left: 10px;
  padding-right: 10px;
}

.upload_container
{
    padding: 10px;
    padding-top: 0px;
}

* >>> .q-table__container
{
    padding: 0px;
    border-radius: 0px;
    padding: 0px !important;
}

.card_section_two
{
    margin-top: 10px;
}

.card_section_second_content
{
    border: 2px solid #ababab;
    /* min-height: 60vh; */
    overflow-y: scroll;
}

/* width */
.card_section_second_content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
.card_section_second_content::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 10px;
}

/* Handle */
.card_section_second_content::-webkit-scrollbar-thumb {
  /* background: #8070d4; */
  background: #ababab;
  border-radius: 10px;
}

/* Handle on hover */
.card_section_second_content::-webkit-scrollbar-thumb:hover {
  background: #ababab;
}

/* .q-form
{
  width: 100%;
} */

.input_wrapper_right
{
  padding-right: 5px;
}

.input_wrapper_center
{
  padding-right: 5px;
  padding-left: 5px;
}

.input_wrapper_left
{
  padding-left: 5px;
}

.dialog_font
{
  font-weight: bold;
  font-size: 15px;
}

.dialog_separator
{
  padding-top: 5px;
}

.upload_separator_first
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
}

.upload_separator
{
    /* border-bottom: 1px solid #DEE1E6; */
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 30px;
}

.custom_cancel_button
{
    border: 1px solid black;
}

/* * >>> .q-table__top
{
  padding-right: 0px;
} */

/* .content_body_dialog
{
    height: 28vh;
    overflow-y: scroll;
} */

* >>> .q-field--disabled > .q-field__inner > .q-field__control
{
  background-color: #cccccc !important;
}
</style>
