<script lang="ts" setup>
import InputLabelComponent from '@/components/forms/InputLabelComponent.vue'
import FeedbackComponent from '@/components/forms/FeedbackComponent.vue'

const {values, label, errors} = defineProps<{
    values: Object,
    label: String,
    errors: Array<any>,
}>()

</script>
<template>
    <div class="mb-2">
        <InputLabelComponent :input-id="$attrs.id" :label="label"/>
        <input v-model="values[$attrs.name]" v-bind="$attrs" :class="{'is-invalid': errors.length}" class="form-control">
        <template v-if="errors.length">
            <FeedbackComponent v-for="(error, id) in errors" :key="id" :feedback="error" class="invalid-feedback"/>
        </template>
    </div>
</template>