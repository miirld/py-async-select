<script setup lang="ts">
import { questions } from '@/data/questions'
import QuizResultAnswer from '@/components/quiz/QuizResultAnswer.vue'

defineProps<{
  answers: Partial<Record<number, string>>
}>()
</script>

<template>
  <div class="space-y-10">
    <QuizResultAnswer
      v-for="(q, idx) in questions"
      :key="idx"
      :index="idx"
      :question="q"
      :selected-idx="answers[idx]"
    />
  </div>
</template>
