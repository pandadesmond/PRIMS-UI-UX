<template>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 multiselect">
                <q-select v-if="!no_label[0]"
                v-model="bind_value_select"
                :readonly="readonly[0] ? true : false"
                class="q-pr-sm q-pt-sm"
                color="black"
                bg-color="#DEE1E6"
                dense
                options-dense
                filled
                emit-value
                map-options
                :value="value"
                :options="options[0]"
                :label="dbComponentBehavior.label"
                @update:model-value="handleChange_select"
                filter
                filter-placeholder="select"
                :for="id"
                :name="name"
                dropdown-icon="arrow_drop_down"
                square
                :rules="dbComponentBehavior.rules"
                @popup-show="handleClick"
                :disable="loading"
                >
                  <template v-slot:selected-item="scope">
                    <div v-if="bind_value_select" class="custom_label" >
                      {{ scope.opt.label }}
                    </div>
                  </template>
                </q-select>

                <q-select v-else
                v-model="bind_value_select"
                :readonly="readonly[0] ? true : false"
                class="q-pr-sm q-pt-sm"
                color="black"
                bg-color="#DEE1E6"
                dense
                options-dense
                filled
                emit-value
                map-options
                :value="value"
                :options="options[0]"
                @update:model-value  ="handleChange_select"
                filter
                filter-placeholder="select"
                :for="id"
                :name="name"
                dropdown-icon="arrow_drop_down"
                square
                :rules="dbComponentBehavior.rules"
                @popup-show="handleClick"
                :disable="loading"
                >
                  <template v-slot:selected-item="scope">
                    <div v-if="bind_value_select" class="custom_label" >
                      {{ scope.opt.label }}
                    </div>
                  </template>
                </q-select>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 multiselect">
              <q-select v-if="!no_label[1]"
                  dense
                  bg-color="white"
                  :readonly="readonly[1] ? true : false"
                  options-dense
                  filled
                  multiple
                  v-model="bind_value_multiselect"
                  :label="dbComponentBehavior.label"
                  option-value="value"
                  option-label="label"
                  :rules="dbComponentBehavior.rules"
                  emit-value
                  map-options
                  use-chips
                  use-input
                  input-debounce="0"
                  @filter="filterFn"
                  @update:model-value  ="handleChange_multiselect"
                  ref="myInput"
                  :options="bind_options"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select v-else
                  dense
                  bg-color="white"
                  :readonly="readonly[1] ? true : false"
                  options-dense
                  filled
                  multiple
                  v-model="bind_value_multiselect"
                  option-value="value"
                  option-label="label"
                  :rules="dbComponentBehavior.rules"
                  emit-value
                  map-options
                  use-chips
                  use-input
                  input-debounce="0"
                  @filter="filterFn"
                  @update:model-value  ="handleChange_multiselect"
                  ref="myInput"
                  :options="bind_options"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="handleChangeRemove" class="cursor-pointer" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import Label from 'src/components/IMS/Base/Label';
import Multiselect from 'src/components/IMS/Base/Multiselect';
import Select from 'src/components/IMS/Base/Select';
import { QSelect } from 'quasar'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name:"SelectMultiSelectHorizontal",
    data() {
        return {
            bind_options: this.options[1],
            bind_value_multiselect: this.pass_value_multiselect,
            bind_value_select: this.pass_value_select
        };
    },
    props: ['pass_value_multiselect','pass_value_select', 'dbComponentBehavior', 'readonly','no_label', 'options'],
    computed:{
        // ...mapGetters("tta"),
        oridbComponentBehavior() {
            return this.$store.getters['dbComponentBehavior/byLanguage']('ims')
        },
    },
    components: {
        // Multiselect,
        // Label,
        // Select,
        QSelect
    },
    methods:{
          filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.bind_options = this.options[1]
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                // var filter = this.bind_options.filter((v)=>{
                //     return v.value.toLowerCase().indexOf(needle) > -1
                // });
                // console.log(filter);
                this.bind_options = this.options[1].filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            })
        },
        handleChange_select: function(newVal){
            // var temp_json = [];
            // this.bind_value = "dadas"
            this.$emit('update:pass_value_select', newVal)
            // temp_json.push({"tab":"supplier_profile","seq":"2","value":this.json_container});
            this.$emit('receiveChange_select',newVal)
        },
        handleChangeRemove: function(newVal){
          this.$emit('receiveChange_remove')
        },
        handleChange_multiselect: function(newVal){

            this.$refs.myInput.hidePopup();

            this.$emit('receiveChange', newVal)

            setTimeout(()=>{
                this.$refs.myInput.updateInputValue('');
                this.$refs.myInput.focus();
                this.$refs.myInput.showPopup();
            },100);


            this.$emit('update:pass_value_multiselect', newVal)
            this.$emit('receiveChange_multiselect',newVal)
        }
    },
    watch: {
        pass_value_multiselect(newVal)
        {
            this.bind_value_multiselect = newVal;
        },
        pass_value_select(newVal)
        {
            this.bind_value_select = newVal;
        }
    }
}
</script>

<style scoped>
.custom_label
{
    font-weight: bold;
}

/* For text input padding removal */
.q-field
{
    height: 100%;/*when overflow label input will also follow height*/
}

* >>> .q-field__control
{
    height: 100%;/*when overflow label input will also follow height*/
    padding-left: 5px;
}


/* make scroll overflow overflow */
.multiselect >>> .q-field__control
{
    max-height: 70px;
    overflow: auto;
    border-radius: 0px;
}

/*make select dropdown bottom line grey color hover*/
* >>> .q-field--filled .q-field__control:before {
    border-bottom: none;
}

/* For dropdown padding removal */
.q-field
{
    padding-top:0px;
    padding-left:0px;
    padding-right:0px;
    padding-bottom:0px;
}

.q-field--error
{
    padding-bottom:20px;
}

/* For text input border colour */
* >>> .q-field__inner
{
    border: 1px solid #d2d6de;
}

/* when hover on text input */
.q-field--filled >>> .q-field__control:before {
    background: white;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    opacity: 0;
    transition: opacity 0.36s cubic-bezier(0.4, 0, 0.2, 1), background 0.36s cubic-bezier(0.4, 0, 0.2, 1); */
}

/* readonly field
.q-field--readonly >>> .q-field__control:before
{
    background: yellow ;
} */

/* readonly field*/
.q-field--filled.q-field--readonly >>> .q-field__control:before {
    opacity: 1;
    background: #ccc;
    border-bottom-style: none;
}


/* hide error message when no error validation*/
.q-field >>> .q-field__bottom
{
    display: none;
}

.q-field--error >>> .q-field__bottom
{
    display: block;
}

* >>> .q-field__bottom {
    padding: 3px 0px 0;
}

</style>
