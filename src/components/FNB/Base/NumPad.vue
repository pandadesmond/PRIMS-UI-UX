<template>
    <div id="numPad">
        <span class="selection_font">{{title}}</span>
        <br>
        <span class="selection_font">{{bind_display}}</span>

        <input :style="show_border ? 'border:1px solid red;' : ''" :id="pass_id" class="numDisplay" type="text" :disabled="make_disabled" v-model="bind_value">

        <!-- <input style="border:1px solid red;" id="numDisplay" type="password" disabled="" v-model="password" v-if="current_password"> -->

        <div class="alphaGrid" v-if="alphabet">
            <div @click="numpadClick('A')" class="button_num button_alpha">A</div>
            <div @click="numpadClick('B')" class="button_num button_alpha">B</div>
            <div @click="numpadClick('C')" class="button_num button_alpha">C</div>
            <div @click="numpadClick('D')" class="button_num button_alpha">D</div>
        </div>

        <div id="numBWrap" class="noDec">
            
            
            <div @click="numpadClick('1')" class="button_num">1</div>
            <div @click="numpadClick('2')" class="button_num">2</div>
            <div @click="numpadClick('3')" class="button_num">3</div>
            <div @click="numpadClick('4')" class="button_num">4</div>
            <div @click="numpadClick('5')" class="button_num">5</div>
            <div @click="numpadClick('6')" class="button_num">6</div>
            <div @click="numpadClick('7')" class="button_num">7</div>
            <div @click="numpadClick('8')" class="button_num">8</div>
            <div @click="numpadClick('9')" class="button_num">9</div>
            <div @click="numpadClickCancel('✖')" class="button_num cancel_button">✖</div>
            <div @click="numpadClick('0')" class="button_num">0</div>
            <div @click="numpadClickConfirm('✔')" class="button_num confirm_button">
            <span v-if="!bind_loading">✔</span>
            <q-spinner-facebook v-if="bind_loading" />
            </div>
            <div @click="numpadClickClear()" class="button_num clear_button">Clear</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NumPad",
    data(){
        return{
            bind_value:this.pass_value,
            bind_loading: this.loading,
            bind_display: this.show_display,
        }
    },
    props:['title','make_disabled','pass_value','alphabet','loading','pass_id','show_display','show_border'],
    methods:{
        numpadClick(newVal)
        {
            this.$emit('numpadClick',newVal);
            // if(this.current_password)
            // {
            //     this.password = this.password+newVal;
            // }
            // else
            // {
            //     this.username = this.username+newVal;
            // }
        },
        numpadClickCancel()
        {
            this.$emit('numpadClickCancel');
            // this.password = "";
            // this.username = "";
            // this.show_username = this.username;
            // this.current_password = false;
        },
        numpadClickConfirm()
        {
            this.$emit('numpadClickConfirm');
            // if(this.current_password)
            // {
            //     if(this.password == "")
            //     {
            //         this.showNotify("negative","Please enter password.");
            //         return;
            //     }
            //     else
            //     {

            //         this.loading = true;
            //         setTimeout(()=>{
            //         this.handleLogin();
            //         },500);
            //     }
            // }
            // else
            // {
            //     if(this.username == "")
            //     {
            //         this.showNotify("negative","Please enter userid.");
            //         return;
            //     }
            // }

            // this.show_username=this.username;
            // this.current_password = true;
        },
        numpadClickClear()
        {
            this.$emit('numpadClickClear');
            // if(this.current_password)
            // {
            // this.password = "";
            // }
            // else
            // {
            // this.username = "";
            // }
        }
    },
    watch:{
        pass_value(newVal)
        {
            this.bind_value = newVal;
        },
        loading(newVal)
        {
            this.bind_loading = newVal;
        },
        show_display(newVal)
        {
            this.bind_display = newVal;
        }
    }
}
</script>

<style scoped>
.cancel_button
{
  background-color: #de0815 !important;
}

.confirm_button
{
  background-color: #2b7b3b !important;
}

.clear_button
{
    grid-column: span 3;
    background-color:#ffca40 !important;
}

.button_alpha
{
    background-color:#ffca40 !important;
}

.button_num
{
  font-size: 20px;
  background-color: white;
  padding: 15px 0px;
  cursor: pointer;
  font-weight: bold;
}

.button_num:active
{
  background-color: rgba(255, 255, 255, 0.7);
}

.selection_font
{
    
    font-weight: bold;
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

/* (B) NUMPAD */
#numPad {
  max-width: 350px;
  background: #eaeaea;
  padding: 10px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

/* (C) DISPLAY */
.numDisplay {
  box-sizing: border-box;
  width: 100%;
  border: 0;
  padding: 5px;
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #c1c1c1;
  color: #000;
  font-size: 30px;
  text-align: center;
}


/* (D) BUTTONS WRAPPER */
#numBWrap {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
}

.alphaGrid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 5px;
  padding-bottom: 5px;
}
</style>