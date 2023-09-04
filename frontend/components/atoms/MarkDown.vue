<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="rendered" />
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import 'highlight.js/styles/github.css';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';

      return hljs.highlight(code, { language }).value;
    },
  }),
);

const props = defineProps<{
  src: string;
}>();

const render = async (src: string) => {
  const html = await marked.parse(src, {
    gfm: true,
    breaks: true,
  });

  return DOMPurify.sanitize(html);
};

const rendered = await render(props.src);
</script>
