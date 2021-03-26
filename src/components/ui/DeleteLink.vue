<template>
  <a class="cursor-pointer">
    <span>
      <svg
        class="fill-current text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M512 1024q-104 0-199-40.5t-163.5-109T40.5 711T0 512t40.5-199t109-163.5T313 40.5T512 0t199 40.5t163.5 109t109 163.5t40.5 199t-40.5 199t-109 163.5t-163.5 109t-199 40.5zm236-655q20-19 20-47t-19.5-47.5T701 255t-47 20L511 417L369 275q-19-20-47-20t-47.5 19.5T255 322t20 47l142 143l-142 142q-20 19-20 47t19.5 47.5T322 768t47-20l142-142l143 142q19 20 47 20t47.5-19.5T768 701t-20-47L606 512z"
        />
        <rect x="0" y="0" width="1024" height="1024" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </span>
  </a>
</template>

<script>
export default {};
</script>

<style>
svg {
  z-index: -1;
}
</style>
