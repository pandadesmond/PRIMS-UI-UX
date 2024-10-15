<template>
<div class="row" style="margin:2px;flex-wrap: unset!important; ">
    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <Label :text="json_container.label1" />
    </div>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 label_data">
        <Basiclabel style="word-break: break-word;" :text="json_container.label2 != '' ? json_container.label2 : '-'" />
    </div>
</div>
</template>

<script>
import Label from 'src/components/RIMS/Base/Label';
import Basiclabel from 'src/components/Base/Label';
// import Input from 'src/components/RIMS/Base/Input';

export default {
    name: "Label_input",
    data() {
        return {
            json_container: this.json,
        };
    },
    props: ['json'],
    computed: {},
    components: {
        Label,
        Basiclabel
    },
    methods: {

    },
    watch: {

    }
}
</script>

<style scoped>
.label_title {
    min-width:105px;
}

.label_data {
    margin-left:5px;
}
</style>
