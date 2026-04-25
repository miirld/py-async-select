<script setup lang="ts">
import { computed } from 'vue'
import { questions } from '@/data/questions'

interface Row {
  criterion: string
  condition: string
  recommendation: string
}

const rows = computed<Row[]>(() =>
  questions.flatMap((q) =>
    q.options
      .filter((opt) => !opt.isNeutral)
      .map((opt, optIdx) => ({
        criterion: optIdx === 0 ? q.criterion : '',
        condition: opt.text,
        recommendation: opt.frameworks.join(' / '),
      })),
  ),
)
</script>

<template>
  <div class="min-h-screen p-8 max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-semibold tracking-tight">Матрица рекомендательной системы</h1>
      <RouterLink to="/" class="underline underline-offset-4">Вернуться к&nbsp;опросу</RouterLink>
    </div>

    <table class="w-full border border-foreground border-collapse">
      <thead>
        <tr class="border-b border-foreground">
          <th class="p-3 text-left border-r border-foreground">Критерий</th>
          <th class="p-3 text-left border-r border-foreground">Условие</th>
          <th class="p-3 text-left">Рекомендация</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx" class="border-b border-foreground">
          <td class="p-3 border-r border-foreground align-top">
            {{ row.criterion }}
          </td>
          <td class="p-3 border-r border-foreground align-top" v-html="row.condition" />
          <td class="p-3 align-top">{{ row.recommendation }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
