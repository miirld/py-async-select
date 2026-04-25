<script setup lang="ts">
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import QuizOption from '@/components/quiz/QuizOption.vue'
import type { Question } from '@/types'

defineProps<{
  question: Question
  currentValue?: string
  isFirst: boolean
  isLast: boolean
  currentIndex: number
  totalCount: number
}>()

defineEmits<{
  next: []
  prev: []
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <Card class="max-w-3xl mx-auto">
    <CardHeader>
      <CardTitle class="text-2xl">{{ question.criterion }}</CardTitle>
      <CardDescription v-html="question.description" class="text-base italic" />
    </CardHeader>

    <CardContent>
      <RadioGroup
        :model-value="currentValue"
        @update:model-value="(value) => $emit('update:modelValue', value as string)"
      >
        <QuizOption
          v-for="(opt, idx) in question.options"
          :key="idx"
          :id="'opt-' + idx"
          :value="idx.toString()"
          :label="opt.label"
          :text="opt.text"
        />
      </RadioGroup>
    </CardContent>

    <CardFooter class="flex justify-between gap-4">
      <Button variant="ghost" :disabled="isFirst" @click="$emit('prev')">Назад</Button>
      <p class="text-sm text-foreground/80">{{ currentIndex }}/{{ totalCount }}</p>
      <Button :disabled="currentValue === undefined" @click="$emit('next')">
        {{ isLast ? 'Завершить' : 'Далее' }}
      </Button>
    </CardFooter>
  </Card>
</template>
