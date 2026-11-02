<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { GUIDE_VERSIONS } from './versions'

const { frontmatter } = useData()

const sources = computed<string[]>(() => frontmatter.value.sources ?? [])
const checkedAt = computed<string>(() => frontmatter.value.checkedAt ?? GUIDE_VERSIONS.checkedAt)
const ide = computed<string>(() => frontmatter.value.ideVersion ?? GUIDE_VERSIONS.ide)
const cli = computed<string>(() => frontmatter.value.cliVersion ?? GUIDE_VERSIONS.cli)
const show = computed(() => frontmatter.value.pageMeta !== false)
</script>

<template>
  <section v-if="show" class="page-meta" aria-label="문서 출처와 기준 버전">
    <dl>
      <div v-if="sources.length">
        <dt>출처 URL</dt>
        <dd>
          <ul>
            <li v-for="url in sources" :key="url">
              <a :href="url" target="_blank" rel="noreferrer">{{ url }}</a>
            </li>
          </ul>
        </dd>
      </div>
      <div>
        <dt>확인 날짜</dt>
        <dd>{{ checkedAt }}</dd>
      </div>
      <div>
        <dt>기준 버전</dt>
        <dd>IDE {{ ide }} / CLI {{ cli }}</dd>
      </div>
    </dl>
    <p class="disclaimer">
      비공식 사용자 가이드이며 Amazon Web Services 및 Kiro 팀과 무관합니다. 최신 정보는
      <a href="https://kiro.dev/docs/" target="_blank" rel="noreferrer">공식 문서</a>를 확인하세요.
    </p>
  </section>
</template>

<style scoped>
.page-meta {
  margin-top: 48px;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.page-meta dl {
  margin: 0;
  display: grid;
  gap: 8px;
}
.page-meta dl > div {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 8px;
}
.page-meta dt {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.page-meta dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}
.page-meta ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
.page-meta li + li {
  margin-top: 2px;
}
.disclaimer {
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
}
@media (max-width: 480px) {
  .page-meta dl > div {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
