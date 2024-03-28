<script setup>
const error = useError();
const route = useRoute()
// console.log('route', route);
clearError({
    redirect: `/questions/${route.params.slug}`,
});
</script>
<template>
    <AppLayout>
        ERR
    </AppLayout>
</template>
  