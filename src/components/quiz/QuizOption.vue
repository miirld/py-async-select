<script setup lang="ts">
import { RadioGroupItem } from '@/components/ui/radio-group'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field'

defineProps<{
  id: string
  value: string
  label: string
  text: string
}>()
</script>

<template>
  <FieldLabel :for="id">
    <Field orientation="horizontal">
      <RadioGroupItem :value="value" :id="id" />
      <FieldContent>
        <FieldTitle>{{ label }}</FieldTitle>
        <FieldDescription v-html="text" class="leading-relaxed" />
      </FieldContent>
    </Field>
  </FieldLabel>
</template>
