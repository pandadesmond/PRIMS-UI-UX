<template>
    <q-form ref="submit_form">
        <div class="row row_section" style="padding: 0px; margin-bottom: 10px;  margin-left: 12px;">
            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <Chip text="Setup" icon="tune"/> / <Chip text="Company Profile" icon="business"/>
            </div>

            <Title :text="'Company Profile'" :noFilter="true" :filter_status="filter_status" v-on:receiveFilter="handleReceiveFilter" />
        </div>

        <div class="row row_section">
        <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="component_div">
            <q-card>
                <q-card-section style="padding-bottom: 30px;">
                    <div class="row row_section">
                        <div class="card_section offset-md-1 col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
                        <!-- <div class="row row_section">
                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <Label text="Company Profile" class="text-h6" style="background-color: transparent"/>
                            </div>
                        </div> -->

                        <div class="row row_section">
                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <LabelInputHorizontal
                                :readonly="true"
                                :no_label="true"
                                :text="'Company Code'"
                                v-model:pass_value="json_new.code"
                                :dbComponentBehavior="dbComponentBehavior.text_required" />
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <LabelInputHorizontal
                                :readonly="true"
                                :no_label="true"
                                :text="'Company Name'"
                                v-model:pass_value="json_new.description"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <LabelInputHorizontal
                                :readonly="true"
                                :no_label="true"
                                :text="'Address'"
                                v-model:pass_value="json_new.address1"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <Input
                                :readonly="true"
                                :no_label="true"
                                :text="'Address2'"
                                v-model="json_new.address2"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <Input
                                :readonly="true"
                                :no_label="true"
                                :text="'Address3'"
                                v-model="json_new.address3"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="component_div">
                                <Input
                                :readonly="true"
                                :no_label="true"
                                :text="'Address4'"
                                v-model="json_new.address4"
                                :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="component_div">
                                <LabelInputHorizontal
                                style="margin-left: 0px;"
                                :readonly="true"
                                :no_label="true"
                                :text="'Tel No'"
                                v-model:pass_value="json_new.tel_no"
                                :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="component_div">
                                <LabelInputHorizontal
                                style="margin-left: 0px;"
                                :readonly="true"
                                :no_label="true"
                                :text="'Email'"
                                v-model:pass_value="json_new.email"
                                :dbComponentBehavior="dbComponentBehavior.text"/>
                            </div>
                            </div>

                            <div class="card_section col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div class="component_div">
                                <LabelInputHorizontal
                                style="margin-left: 0px;"
                                :readonly="true"
                                :no_label="true"
                                :text="'Reg No.'"
                                v-model:pass_value="json_new.register_no"
                                :dbComponentBehavior="dbComponentBehavior.text_required"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        </div>
        </div>
    </q-form>
  </template>


<script>
import Input from 'src/components/ERP/Base/Input';
import Label from 'src/components/ERP/Base/Label';
import LabelInputVertical from'src/components/ERP/General/LabelInputVertical' ;
import LabelInputHorizontal from'src/components/ERP/General/LabelInputHorizontal' ;
import Chip from 'src/components/ERP/Base/Chip';
import Title from 'src/components/ERP/General/Title'

import { Notify } from "quasar"
import { Loading, QSpinnerTail } from 'quasar'

export default {
  data() {
    return {
      showAction: false,
      json_new: {},
      company_guid: sessionStorage.getItem("company_guid") != "" && sessionStorage.getItem("company_guid") != "null" && sessionStorage.getItem("company_guid") != null ? sessionStorage.getItem("company_guid") : '',
    };
  },
  components: {
    Input,
    // Label,
    LabelInputHorizontal,
    Chip,
    Title,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters['dbComponentBehavior/byLanguage']('erp')
    },
  },
  methods: {
    showNotify(type, message) {
      Notify.create({
        type: type,
        message: message,
        timeout: 1000,
        position: 'top',
      });
    },
    showLoading() {
      Loading.show({
        spinner: QSpinnerTail,
      });
    },
    hideLoading() {
      setTimeout(function () {
        Loading.hide();
      }, 300);
    },
  },
  async created()
  {
    this.showLoading();

    var payload =
    {
        params: {
            company_guid: this.company_guid
        }
    }

    await this.$store.dispatch('setup/trigger_get_ml_company', payload).then(() => {
        var data = JSON.parse(JSON.stringify(this.$store.getters['setup/get_ml_company']));
        var result = data.data.results[0];
        this.json_new = result;
        this.hideLoading();
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

.row_section_dialog
{
    padding: 10px;
    right: 10px;
}
.table_wrapper
{
    padding-left: 0px;
    padding-right: 5px;
}
</style>
