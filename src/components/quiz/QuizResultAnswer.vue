<script setup lang="ts">
import { computed } from 'vue'
import { Circle, CheckCircle2 } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { Question } from '@/types'

const props = defineProps<{
  index: number
  question: Question
  selectedIdx?: string
}>()

const selectedIndex = computed(() =>
  props.selectedIdx !== undefined ? Number(props.selectedIdx) : null,
)

const isSelected = (idx: number) => selectedIndex.value === idx
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">{{ index + 1 }}. {{ question.criterion }}</CardTitle>
      <CardDescription v-html="question.description" />
    </CardHeader>

    <CardContent class="space-y-3">
      <Card
        v-for="(opt, oIdx) in question.options"
        :key="oIdx"
        :class="[
          isSelected(oIdx)
            ? 'border-primary bg-primary/5 shadow-none'
            : 'border-border bg-transparent shadow-none',
        ]"
      >
        <CardContent class="flex gap-2 opacity-70">
          <component :is="isSelected(oIdx) ? CheckCircle2 : Circle" class="w-5 h-5 shrink-0" />
          <p v-html="opt.text" class="text-sm" />
        </CardContent>
      </Card>
    </CardContent>
  </Card>
</template>
