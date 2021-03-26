<template>
  <section>
    <teleport to="#pageheader">
      <div class="space-x-2">
        <svg
          class="text-red-600 fill-current inline-block z-0"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          width="1.5em"
          height="1.5em"
          style="
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          "
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
          <path
            d="M21.707 7.293l-5-5A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z"
          />
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <p class="inline-block text-red-600 italic align-text-bottom">
          Page not found
        </p>
      </div>
    </teleport>
    <div class="flex justify-center items-center">
      <svg
        class="text-red-600 fill-current z-0 opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="30em"
        height="30em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2h2z"
        />
        <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
