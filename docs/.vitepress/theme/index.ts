import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PageMeta from './PageMeta.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // 모든 문서 페이지 하단에 출처·확인 날짜·기준 버전·면책 문구 표시
      'doc-after': () => h(PageMeta)
    })
} satisfies Theme
