<template>
    <div class="max-w-2xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg">
      <main class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
        <ContentRendererMarkdown :value="pageContent" />
      </main>
    </div>
  </template>
  
<script setup>
    const route = useRoute();
    const slug = route.params.slug;
    // console.log('route', route);
    const page = await useQAQuery({query: `${slug}`});
    console.log('page', page);
    console.log('page.value', page.value);

    // useHead({
    //   title: page.value?.title,
    // });

    import markdownParser from "@nuxt/content/transformers/markdown"

    // const props = defineProps({
    //     markdownString: {
    //         type: String,
    //         required: true,
    //     }
    // });

    const json = JSON.parse(page.value);

    console.log(json)

    const pageContent = ref("");

    // watchEffect(async () => {
    await markdownParser.parse('response.md',
`# Question

${json.question}

# Answer

${json.response}`
).then((md) => {
      pageContent.value = md;
    });

</script>